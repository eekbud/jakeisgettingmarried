/**
 * Lambda function to handle RSVP form submissions for Jake's Bachelor Golf Trip
 * Stores RSVP data in DynamoDB and maintains a count of confirmed attendees
 */
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.RSVP_TABLE_NAME;
const COUNTER_TABLE_NAME = process.env.COUNTER_TABLE_NAME;
const MAX_ATTENDEES = 16;

exports.handler = async (event) => {
  try {
    // Parse the incoming request body
    const requestBody = JSON.parse(event.body);
    
    // Generate a unique ID for the RSVP
    const rsvpId = `rsvp_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
    
    // Add timestamp and ID to the RSVP data
    const rsvpData = {
      id: rsvpId,
      timestamp: new Date().toISOString(),
      ...requestBody
    };
    
    // Store the RSVP data in DynamoDB
    await dynamoDB.put({
      TableName: TABLE_NAME,
      Item: rsvpData
    }).promise();
    
    // If the person is attending, update the counter
    let counterResponse = null;
    if (requestBody.attending === 'yes') {
      // First get the current count
      const counterData = await dynamoDB.get({
        TableName: COUNTER_TABLE_NAME,
        Key: { id: 'rsvp_counter' }
      }).promise();
      
      // Calculate the new count
      const currentCount = counterData.Item ? counterData.Item.count : 0;
      
      // Check if we've reached the maximum
      if (currentCount >= MAX_ATTENDEES) {
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
      
      // Update the counter
      counterResponse = await dynamoDB.update({
        TableName: COUNTER_TABLE_NAME,
        Key: { id: 'rsvp_counter' },
        UpdateExpression: 'SET #count = if_not_exists(#count, :zero) + :one',
        ExpressionAttributeNames: {
          '#count': 'count'
        },
        ExpressionAttributeValues: {
          ':zero': 0,
          ':one': 1
        },
        ReturnValues: 'UPDATED_NEW'
      }).promise();
    }
    
    // Return success response
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: 'RSVP submitted successfully',
        rsvpId: rsvpId,
        confirmedCount: counterResponse ? counterResponse.Attributes.count : null,
        success: true
      })
    };
  } catch (error) {
    console.error('Error processing RSVP:', error);
    
    // Return error response
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
exports.getRsvpCount = async () => {
  try {
    const counterData = await dynamoDB.get({
      TableName: COUNTER_TABLE_NAME,
      Key: { id: 'rsvp_counter' }
    }).promise();
    
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        confirmedCount: counterData.Item ? counterData.Item.count : 0,
        maxCount: MAX_ATTENDEES,
        success: true
      })
    };
  } catch (error) {
    console.error('Error getting RSVP count:', error);
    
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
