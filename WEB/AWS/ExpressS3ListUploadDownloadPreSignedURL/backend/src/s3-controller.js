const formidable = require('formidable')
const {
  uploadFileToS3,
  getBucketListFromS3,
  getPresignedURL,
} = require('./s3-service')

const awsConfigs = require('./awsConfigs.js')

async function s3Upload(req, res) {
  //console.log('s3Upload request: ', req)
  const formData = await readFormData(req)
  //console.log('s3Upload formData: ', formData)
  try {
    await uploadFileToS3(formData.file)
    res.status(200).send('Uploaded')
  } catch (ex) {
    //console.log(ex)
    res.status(404).send('ERROR!!!!')
  }
}

async function readFormData(req) {
  return new Promise((resolve) => {
    const dataObj = {}
    var form = new formidable.IncomingForm()

    form.parse(req)

    form.on('file', (name, file) => {
      dataObj.name = name
      dataObj.file = file
    })

    form.on('end', () => {
      resolve(dataObj)
    })
  })
}

async function s3Get(req, res) {
  try {
    const bucketData = await getBucketListFromS3()
    const { Contents = [] } = bucketData
    //console.log('Contents: ', Contents)
    res.send(
      Contents.map((content) => {
        return {
          key: content.Key,
          size: (content.Size / 1024).toFixed(1) + ' KB',
          url: `https://${awsConfigs.s3.kuarsisBucketName}.amazonaws.com/${content.key}`,
          lastModified: content.LastModified,
        }
      })
    )
  } catch (ex) {
    //console.log(ex)
    res.send([])
  }
}

async function getSignedUrl(req, res) {
  try {
    const { key } = req.params
    //console.log(key)
    const url = await getPresignedURL(key)
    res.send(url)
  } catch (ex) {
    req.send('')
  }
}

module.exports = {
  s3Upload,
  s3Get,
  getSignedUrl,
}
