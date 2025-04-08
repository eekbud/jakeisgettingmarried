/**
 * Lambda function to handle RSVP form submissions for Jake's Bachelor Golf Trip
 * Stores RSVP data in DynamoDB and maintains a count of confirmed attendees
 */
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.RSVP_TABLE_NAME;
const COUNTER_TABLE_NAME = process.env.COUNTER_TABLE_NAME;
const MAX_ATTENDEES = 16;

// Helper function to get RSVP data by guest code
const getRsvpByGuestCode = async (event) => {
  try {
    // Extract the guest code from the path parameter
    const guestCode = event.pathParameters ? event.pathParameters.guestCode : null;
    
    if (!guestCode) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Guest code is required',
          success: false
        })
      };
    }
    
    // Query for records with this guest code
    const scanParams = {
      TableName: TABLE_NAME,
      FilterExpression: "guestCode = :guestCode",
      ExpressionAttributeValues: {
        ":guestCode": guestCode
      }
    };
    
    const result = await dynamoDB.scan(scanParams).promise();
    const rsvpData = result.Items && result.Items.length > 0 ? result.Items[0] : null;
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        data: rsvpData
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Error getting RSVP data',
        error: error.message,
        success: false
      })
    };
  }
};

// Handle RSVP form submissions
const handleRsvpSubmission = async (event) => {
  try {
    // Parse the incoming request body
    const requestBody = JSON.parse(event.body);
    
    // Check if a guestCode is provided
    if (!requestBody.guestCode) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Guest code is required',
          success: false
        })
      };
    }
    
    // First, check if a record with this guest code already exists
    const queryParams = {
      TableName: TABLE_NAME,
      IndexName: 'guestCodeIndex', // Assuming you have a GSI on guestCode
      KeyConditionExpression: 'guestCode = :guestCode',
      ExpressionAttributeValues: {
        ':guestCode': requestBody.guestCode
      }
    };
    
    let existingRecord;
    try {
      const queryResult = await dynamoDB.query(queryParams).promise();
      existingRecord = queryResult.Items && queryResult.Items.length > 0 ? queryResult.Items[0] : null;
    } catch (error) {
      // If there's an error with the GSI query, try a scan as fallback
      const scanParams = {
        TableName: TABLE_NAME,
        FilterExpression: 'guestCode = :guestCode',
        ExpressionAttributeValues: {
          ':guestCode': requestBody.guestCode
        }
      };
      
      const scanResult = await dynamoDB.scan(scanParams).promise();
      existingRecord = scanResult.Items && scanResult.Items.length > 0 ? scanResult.Items[0] : null;
    }
    
    let rsvpId;
    let timestamp;
    
    if (existingRecord) {
      // Update existing record
      rsvpId = existingRecord.id;
      timestamp = existingRecord.timestamp;
      
      // Prepare update expression
      const updateExpressions = [];
      const expressionAttributeNames = {};
      const expressionAttributeValues = {};
      
      // Add each field from the request body to the update expression
      Object.keys(requestBody).forEach(key => {
        if (key !== 'guestCode' && key !== 'id') { // Skip guestCode and id as they are keys
          // Handle nested objects
          if (typeof requestBody[key] === 'object' && requestBody[key] !== null) {
            Object.keys(requestBody[key]).forEach(nestedKey => {
              const attributePath = `#${key}.#${nestedKey}`;
              const attributeValue = `:${key}_${nestedKey}`;
              
              updateExpressions.push(`${attributePath} = ${attributeValue}`);
              expressionAttributeNames[`#${key}`] = key;
              expressionAttributeNames[`#${nestedKey}`] = nestedKey;
              expressionAttributeValues[attributeValue] = requestBody[key][nestedKey];
            });
          } else {
            updateExpressions.push(`#${key} = :${key}`);
            expressionAttributeNames[`#${key}`] = key;
            expressionAttributeValues[`:${key}`] = requestBody[key];
          }
        }
      });
      
      // Explicitly ensure attending is included in the update
      if (requestBody.hasOwnProperty('attending')) {
        if (!expressionAttributeNames['#attending']) {
          updateExpressions.push('#attending = :attending');
          expressionAttributeNames['#attending'] = 'attending';
          expressionAttributeValues[':attending'] = requestBody.attending;
        }
      }
      
      // Update the record
      await dynamoDB.update({
        TableName: TABLE_NAME,
        Key: { id: rsvpId },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues
      }).promise();
    } else {
      // Create a new record
      rsvpId = `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
      timestamp = new Date().toISOString();
      
      // Add timestamp and ID to the RSVP data
      const rsvpData = {
        id: rsvpId,
        timestamp: timestamp,
        ...requestBody
      };
      
      // Store the RSVP data in DynamoDB
      await dynamoDB.put({
        TableName: TABLE_NAME,
        Item: rsvpData
      }).promise();
    }
    
    // Get the current attendance count by scanning the table for attending: true
    const scanParams = {
      TableName: TABLE_NAME,
      FilterExpression: "attending = :attending",
      ExpressionAttributeValues: {
        ":attending": true
      }
    };
    
    const attendingData = await dynamoDB.scan(scanParams).promise();
    const confirmedCount = attendingData.Items.length;
    
    // Check if we've reached the maximum
    if (confirmedCount > MAX_ATTENDEES) {
      return {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: 'Sorry, all spots have been filled',
          success: false
        })
      };
    }
    
    // Update the counter in the counter table
    await dynamoDB.put({
      TableName: COUNTER_TABLE_NAME,
      Item: {
        id: 'rsvp_counter',
        count: confirmedCount
      }
    }).promise();
    
    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: existingRecord ? 'RSVP updated successfully' : 'RSVP submitted successfully',
        rsvpId: rsvpId,
        confirmedCount: confirmedCount,
        success: true
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Error processing RSVP',
        error: error.message,
        success: false
      })
    };
  }
};

// Helper function to get current RSVP count
const getRsvpCount = async (event) => {
  try {
    // Get the current attendance count by scanning the table for attending: true
    const scanParams = {
      TableName: TABLE_NAME,
      FilterExpression: "attending = :attending",
      ExpressionAttributeValues: {
        ":attending": true
      }
    };
    
    const attendingData = await dynamoDB.scan(scanParams).promise();
    const confirmedCount = attendingData.Items.length;
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        confirmedCount: confirmedCount,
        maxCount: MAX_ATTENDEES,
        success: true
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Error getting RSVP count',
        error: error.message,
        success: false
      })
    };
  }
};

// Main handler function for all RSVP-related operations
exports.handler = async (event) => {
  // Route based on HTTP method and path
  if (event.httpMethod === 'POST' && event.path.endsWith('/rsvp')) {
    return handleRsvpSubmission(event);
  } else if (event.httpMethod === 'GET' && event.path.endsWith('/rsvp/count')) {
    return getRsvpCount(event);
  } else if (event.httpMethod === 'GET' && event.path.match(/\/rsvp\/guest\/[^\/]+$/)) {
    return getRsvpByGuestCode(event);
  } else {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'Method not allowed',
        success: false
      })
    };
  }
};
