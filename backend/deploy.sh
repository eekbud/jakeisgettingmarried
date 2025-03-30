#!/bin/bash
# Deployment script for Jake's Bachelor Party RSVP application

# Set variables
STACK_NAME="jake-bachelor-party"
REGION="us-east-1"  # Change to your preferred AWS region
STAGE="prod"
S3_DEPLOYMENT_BUCKET="$STACK_NAME-deployment-$(date +%s)"

echo "Starting deployment process..."

# Create S3 bucket for CloudFormation deployment if it doesn't exist
echo "Creating S3 deployment bucket..."
aws s3 mb s3://$S3_DEPLOYMENT_BUCKET --region $REGION

# Package CloudFormation template
echo "Packaging CloudFormation template..."
aws cloudformation package \
  --template-file template.yaml \
  --s3-bucket $S3_DEPLOYMENT_BUCKET \
  --output-template-file packaged.yaml \
  --region $REGION

# Deploy CloudFormation stack
echo "Deploying CloudFormation stack..."
aws cloudformation deploy \
  --template-file packaged.yaml \
  --stack-name $STACK_NAME \
  --parameter-overrides StageName=$STAGE \
  --capabilities CAPABILITY_IAM \
  --region $REGION

# Get outputs from CloudFormation stack
echo "Getting deployment outputs..."
API_ENDPOINT=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" --output text)
WEBSITE_BUCKET=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" --output text | sed 's/http:\/\///' | sed 's/\/.*//')
CLOUDFRONT_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" --output text)

echo "Deployment completed successfully!"
echo "API Endpoint: $API_ENDPOINT"
echo "S3 Website Bucket: $WEBSITE_BUCKET"
echo "CloudFront URL: $CLOUDFRONT_URL"

# Build React application
echo "Building React application..."
cd ../client
npm run build

# Update the API endpoint in the built files if needed
# This is a simple approach - for production, consider using environment variables
# sed -i '' "s|API_ENDPOINT_PLACEHOLDER|$API_ENDPOINT|g" build/static/js/main.*.js

# Upload React build to S3
echo "Uploading React build to S3..."
aws s3 sync build/ s3://$WEBSITE_BUCKET --delete --region $REGION

echo "Invalidating CloudFront cache..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?DomainName=='$(echo $CLOUDFRONT_URL | sed 's/https:\/\///')'].Id" --output text --region $REGION)
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --region $REGION

echo "Deployment complete! Your application is now available at:"
echo $CLOUDFRONT_URL
