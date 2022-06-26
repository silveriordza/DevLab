This is the initial repo for my Dev Lab
This repo is for testing/experimenting with different technologies, it will contain several subfolders for each of the sub projects that are being tested.
This will also contain branches in GIT one for each type of project, experiment or test. The branch will be documented in the readme file at the root directory describing what the branch is about, what technologies were tested and the lessons learned on each.

Author: Silverio Rodriguez Alcorta
Company: Kuarsis (www.kuarsis.com)
Date: 6/24/22

BRANCHES:

UploadTS3DownloadWPreSignedURL
This branch is a simple index.html server from a Node.JS Express server on the localhost:8080 path, it has a button to upload a file into S3 bucket. It can also download a file using a PreSignedURL link from S3, show it in the browser and also download it as a file (as attachment). It needs a bucket to be created in AWS Console and also a IAM user with Admin privileges.
