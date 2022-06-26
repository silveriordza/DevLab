DESCRIPTION:
This is an example of:
-Listing files from a bucket.
-Getting a Presigned URL to download a file from a bucket.
-Showing the downloaded file in the browser by using the Presigned URL link.

This is a project to test integration of AWS services to React and Express application servers.

This comes from youtube videos
How to upload a file to S3 using Express and HTML
https://www.youtube.com/watch?v=Za6jWDigqL4

How to download a file to S3 using Express and HTML
https://www.youtube.com/watch?v=4cWMJFu82Ew

git from the guy: https://github.com/voidVic/AWS-S3-NodeJS

Before running this program, first run: "npm install package.json" to install all the required dependencies which are:
nodemon, aws-sdk, express, formidable, and dotenv.

Remember to configure all this parameters in the a .env file at the root folder of the program:
PORT=8080
KUARSIS_AWS_PRODUCTS_S3_ACCESS_KEY = [THE S3 USER ACCESS KEY GOES HERE, AND IN THIS EXAMPLE ADMIN PRIVILEGES IS REQUIRED]
KUARSIS_AWS_PRODUCTS_S3_SECRET_KEY = [THE S3 SECRET KEY CORRESPONDING TO THE ACCESS KEY GOES HERE]
KUARSIS_AWS_KUARSIS_MAIN_REGION = [THE S3 REGION GOES HERE]
KUARSIS_PUBLIC_BUCKET_NAME = [THE BUCKET NAME GOES HERE]

PRE-REQUISITES:
*Create a user named admin in the AWS IAM Console
Remember to add AdministratorAccess as permission to the user.
*Create a bucket named kuarsis-labs-bucket with default privileges.

HOW TO RUN IT:
In the terminal go to the root of the program and type

npm run start

That will start the server, then go to the Chrome brownser and type:
localhost:8080

That will show up the index.html file.

HOW TO USE IT:
Click the Upload button and pick a JPEG image click save, it will upload the file to the S3 bucket.
You can check the file uploaded in the S3 Console.
The application will also show a CARD LIKE list of all photos in the bucket.

Click on the card, and it will download the photo to your computer.
