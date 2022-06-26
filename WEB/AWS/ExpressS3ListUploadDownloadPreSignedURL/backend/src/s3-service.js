const AWS = require('aws-sdk')
const { PresignedPost } = require('aws-sdk/clients/s3')
const fs = require('fs')
const awsConfigs = require('./awsConfigs')

function createS3Instance() {
  const s3 = new AWS.S3({
    credentials: {
      accessKeyId: awsConfigs.s3.kuarsisProductsS3AccessKey,
      secretAccessKey: awsConfigs.s3.kuarsisProductsS3SecretyKey,
    },
    region: awsConfigs.Globals.awsMainRegion,
  })
  return s3
}

async function uploadFileToS3(fileObj) {
  const s3 = createS3Instance()
  const fileStream = fs.createReadStream(fileObj.filepath)
  const params = {
    Body: fileStream,
    Bucket: awsConfigs.s3.kuarsisBucketName,
    Key: fileObj.originalFilename,
  }
  const uploadData = await s3.upload(params).promise()
  return uploadData
}

async function getBucketListFromS3() {
  const s3 = createS3Instance()
  const params = {
    Bucket: awsConfigs.s3.kuarsisBucketName,
    MaxKeys: 10,
  }
  const bucketData = s3.listObjects(params).promise()
  return bucketData || {}
}

/*
In order to download a file from an S3 bucket, you have to get a Presigned URL otherwise 
the bucket access will be blocked. 
*/
async function getPresignedURL(key) {
  const s3 = createS3Instance()
  const params = {
    Bucket: awsConfigs.s3.kuarsisBucketName,
    Key: key,
    Expires: 60, //The presigned URL will expire in 60 seconds
  }
  //Note that a getObject is specified to get the signed URL
  const preSignedURL = await s3.getSignedUrl('getObject', params)
  return preSignedURL
}

module.exports = {
  uploadFileToS3,
  getBucketListFromS3,
  getPresignedURL,
}
