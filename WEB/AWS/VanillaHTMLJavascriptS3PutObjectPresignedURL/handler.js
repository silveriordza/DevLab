/*
If you don't use the {} then the name looks for the default name exported on that js. If there is no default export then a compoiler error will be thrown at the browser console.
Also in order to import another javascript into here, the handler.js (actual js file) has to be set as a module in the index.html when it is imported, use the <script type='module' src='path to js'>
*/

import { awsMyConfigs } from './awsMyConfigs.js'

const s3 = new AWS.S3({
  region: 'us-east-1',
  credentials: {
    accessKeyId: awsMySecrets.S3.awsAccesskey,
    secretAccessKey: awsMySecrets.S3.awsSecretKey,
  },
})

const getUploadUrl = async (event) => {
  try {
    console.log('getUploadURL e: ', event.files[0])
    file = event.files[0]
    let filename = Date.now() // random file name
    var s3Params = {
      Bucket: awsMySecrets.S3.awsBucketName,
      Key: `${filename}.jpg`,
      ContentType: 'application/octet-stream',
      //ContentType: file.type,
      Expires: 600, // 10 minutes
    }

    const url = s3.getSignedUrl('putObject', s3Params)
    console.log('getSignedURL url: ', url)
    return {
      statusCode: 200,
      body: {
        preSignedUrl: url,
        fileName: `https://${wsMySecrets.S3.awsBucketName}.s3.amazonaws.com/${filename}.jpg`,
      },
    }
  } catch (ex) {
    console.log('getUploadURL Error: ', ex)
  }
}

async function handleFileChange(e) {
  try {
    //const URL = document.getElementById('url').value
    const { statusCode, body } = await getUploadUrl(e)
    myPreSignedURL = body.preSignedUrl
    fileURL = body.fileName
    // take the first file from FilesList
    const file = e.files[0]

    // Extract Content-Type & filename
    const { type, name } = file
    console.log(
      `Before PUT statusCode=${statusCode}, preSignedURL=${myPreSignedURL}, fileURL=${fileURL}, fileType: ${type}, fileName: ${name}`
    )

    // // Get upload URL
    // let resp = await axios.post(resBody.preSignedUrl, {
    //   contentType: type,
    //   ext: name.split('.').pop(), // take only file extension
    //   isPublic: true, // let's make it public so we can preview here
    // })

    await axios.put(myPreSignedURL, file, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      onUploadProgress: (e2) => {
        //  Show progress
        var percentCompleted = Math.round((e2.loaded * 100) / e2.total)
        document.getElementById('uploadPercent').innerHTML = percentCompleted
      },
    })

    console.log('After PutObject...')
    // suuccessfully uploaded
    /*
    The variable downloadFileURL is a global variable declared into the index.html file into a script section
    you can set values of global variables that are in the index.html from within javascript modules like here below.
    */
    downloadFileURL = fileURL
    document.getElementById('uploadPercent').innerHTML = 'Completed'
    document.getElementById('imgPreview').setAttribute('src', fileURL)

    /*
    Note that the myDownloadLink is an <a> tag in the index.html file, note that for this type of tag the attribute href cannot be set
    as setAttribute('href', 'https://something.com') like the other attribute for an <img> tag above because it won't work, rather it has to be like below:
    */
    document.getElementById('myDownloadLink').href = fileURL
  } catch (ex) {
    // Log errors
    console.log('handleFileChange Error: ', ex)
  }
}

//export { getUploadUrl, handleFileChange }
