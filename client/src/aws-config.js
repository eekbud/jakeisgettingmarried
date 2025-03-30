/**
 * AWS Amplify configuration for Jake's Bachelor Party RSVP app
 * This file should be updated with your actual AWS resource details after deployment
 */

const awsConfig = {
  // Replace these values with the actual values from your AWS deployment
  API: {
    endpoints: [
      {
        name: 'rsvpApi',
        endpoint: 'YOUR_API_GATEWAY_ENDPOINT', // e.g., https://abc123def.execute-api.us-east-1.amazonaws.com/prod
      },
    ],
  },
};

export default awsConfig;
