Author: Silverio Rodriguez Alcorta
Date: 6/26/22

This is an example of how to upload a file to S3 using a Presigned URL with a PutObject command embedded.

Pre-Requisites:
AWS Account and secret key must already exist in AWS.
The S3 bucket name must also already exist and the AWS Account must have proper permissions to do PutObject and GetObject from that bucket, remember to review
the user policies and the bucket policies. The bucket does not have to be public, as long as it has a policy allowing for the PutObject and GetObject to the AWS Account being used.

To run this application just click over the index.html file and run it in the Live Server, then Upload a file using the upload button, that file will be uploaded to the specified S3 bucket.

Remember also to update the S3 bucket name, the AWS Region and the AWS Account accessid and secret keys in the handler.js file.

This is a standalone vanilla html and javascript application, no need of Express server or Node.JS or anything else, just plain html with javascript.

Lessons Learned:
In order to be able to download files from S3 Bucket, both the getSignedURL method from S3 and the AXIOS PUT call using that URL to upload a file to SE, have to set the Content-Type to 'application/octet-stream', otherwise the file is not downloaded as a file and it is shown inline in the browser instead because AWS S3 stores the file with image/jpeg Content-Type by default.

You can also find an example of how to update the href of an <a> tag from a javascript function using document.getElementById('ID').href = URL

This project also uses a file named awsMySecrets.js which contains all the AWS Account Keys,

Last Modification:
6/26/22 Silverio Rodriguez: added initial code and added comments on the tricky parts of the code.
