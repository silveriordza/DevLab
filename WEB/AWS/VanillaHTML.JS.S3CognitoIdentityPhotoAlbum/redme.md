Author Silverio Rodriguez Alcorta
Source:
I followed this tutorial from AWS:
https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/s3-example-photos-view-full.html

Date: 6/28/22

Description:
Sample of S3 bucket using Amazon Cognito for aunthentication of an unauthorized user.
This is Vanilla HTML and JavaScript no modules, no express server, just plain HTML and Javascript.

HOW TO RUN IT:
First update the AWS region, bucket name and identity pool id in the PhotoViewer.js file constants on top of the file.
Then just run the index.html file thru the Live Server on Visual Studio Code.

PRE-REQUISITES:
Create a bucket following instructions from the tutorial link above.
Create a Cognito Pool Id and add permissions to read the bucket, following instructions from tutorial link above.
The bucket name I used for this test is kuarsis-photo-album.

LESSONS LEARNED:
I tried to convert the PhotoViewer.js from text javascript to type MODULE so I could import the awsMySecrets file for the Cognito Pool ID to be accessed from the PhotoViewer using an import, but when I changed index.html to type module to load PhotoViewer.js the viewAlbum function cannot be used in the dynamically created Album buttons that the listAlbums function adds to the html.  
I also learned that each SCRIPT section in HTML of type module, the scope is only within that script and functions cannot be referenced outside of that script unless it is imported with "import {functionName} from './PhotoViewer.js'" but even thou the function it is imported, it cannot be used or referenced from the html input of type button on the onclick attribute, because the HTML is outside of the scope of the SCRIPT module, and the only way to add an event handler to the onclick of the button is by using the AddEventHandler funciton of the document DOM structure, but in this case, since the albumName is also dinamic it adds complexity about how to add the EventHandler for each different Album having different album names each, hence I went back to the text/javascript and removed the module type, to make it work.
