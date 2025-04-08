#!/bin/bash
# Deployment script for Jake's Bachelor Party RSVP application
set -e  # Exit on error

# Set variables
STACK_NAME="jake-bachelor-party"
REGION="us-west-2"  # Change to your preferred AWS region
STAGE="prod"
S3_DEPLOYMENT_BUCKET="$STACK_NAME-deployment-$(date +%s)"
CERTIFICATE_ARN="arn:aws:acm:us-east-1:982534391557:certificate/d46dc949-fcd4-41d2-811e-571df835ebcc"
CERTIFICATE_REGION="us-east-1"  # Certificate region for CloudFront

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
  --parameter-overrides StageName=$STAGE CertificateArn=$CERTIFICATE_ARN CertificateRegion=$CERTIFICATE_REGION \
  --capabilities CAPABILITY_IAM \
  --region $REGION

# Get outputs from CloudFormation stack
echo "Getting deployment outputs..."
API_ENDPOINT=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query "Stacks[0].Outputs[?OutputKey=='ApiEndpoint'].OutputValue" --output text)
WEBSITE_BUCKET=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query "Stacks[0].Outputs[?OutputKey=='WebsiteURL'].OutputValue" --output text | sed 's|http://||' | sed 's|https://||' | sed 's|\.s3.*||')
CLOUDFRONT_URL=$(aws cloudformation describe-stacks --stack-name $STACK_NAME --region $REGION --query "Stacks[0].Outputs[?OutputKey=='CloudFrontURL'].OutputValue" --output text)

echo "CloudFormation deployment completed!"
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
if [ -n "$WEBSITE_BUCKET" ]; then
  echo "Uploading React build to S3..."
  aws s3 sync build/ s3://$WEBSITE_BUCKET --delete --region $REGION

  if [ -n "$CLOUDFRONT_URL" ]; then
    echo "Invalidating CloudFront cache..."
    DISTRIBUTION_ID=$(aws cloudfront list-distributions --query "DistributionList.Items[?DomainName=='$(echo $CLOUDFRONT_URL | sed 's/https:\/\///')'].Id" --output text --region $REGION)
    
    if [ -n "$DISTRIBUTION_ID" ]; then
      aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*" --region $REGION
    else
      echo "Warning: Could not find CloudFront distribution ID"
    fi
  else
    echo "Warning: CloudFront URL not available"
  fi
else
  echo "Warning: Website bucket not available, skipping upload"
fi

echo "Deployment complete! Your application is now available at:"
echo $CLOUDFRONT_URL
