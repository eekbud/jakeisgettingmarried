# Jake's Bachelor Golf Trip - Digital Invitation

A digital invitation application for Jake Flick's bachelor golf trip, featuring an interactive RSVP form with a real-time counter to track confirmed attendees.

## Features

- Interactive RSVP form with validation
- Detailed 4-day golf trip schedule
- Real-time RSVP counter (limited to 16 spots)
- Responsive design for all devices
- Serverless backend using AWS

## Project Structure

```text
jakeisgettingmarried/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Source code
│       ├── api/            # API integration
│       ├── components/     # React components
│       ├── App.js          # Main application
│       └── ...
└── backend/                # AWS serverless backend
    ├── functions/          # Lambda functions
    │   └── submitRsvp.js   # RSVP handler
    ├── template.yaml       # CloudFormation template
    └── deploy.sh           # Deployment script
```

## Technology Stack

- **Frontend**: React, React Bootstrap
- **Backend**: AWS Lambda, API Gateway, DynamoDB
- **Infrastructure**: AWS CloudFormation, S3, CloudFront

## Development

### Frontend Development

```bash
# Navigate to the client directory
cd client

# Install dependencies
npm install

# Start the development server
npm start
```

### Backend Development

For local testing of Lambda functions, you can use AWS SAM CLI:

```bash
# Navigate to the backend directory
cd backend

# Install dependencies for Lambda functions
npm install

# Local testing with SAM
sam local invoke SubmitRsvpFunction -e events/event.json
```

## Deployment

### First-time Setup

1. Clone the repository:
   ```bash
git clone https://github.com/yourusername/jakeisgettingmarried.git
cd jakeisgettingmarried
```
2. Install dependencies for the client:
   ```bash
cd client
npm install
```
3. Install dependencies for the backend:
   ```bash
cd ../backend
npm install
```

### Deployment Steps

1. Deploy the backend to AWS:
   ```bash
cd backend
./deploy.sh
```
2. After deployment, update the API endpoint in `client/src/aws-config.js` with the actual endpoint URL from the CloudFormation output.
3. Deploy the frontend to S3:
   ```bash
cd client
npm run build
aws s3 sync build/ s3://your-bucket-name
```

## Notes

- The RSVP counter is limited to 16 attendees maximum
- The application includes golf-specific form fields like handicap and club rental options
- The schedule includes rounds at Pebble Beach, Spyglass Hill, and other premium courses
