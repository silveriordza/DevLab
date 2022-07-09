import { convert } from './node_modules/image-file-resize/index.js'

var iBack = new Image(),
  iMark = 'Pixan Copyright',
  canvas = document.getElementById('demo'),
  ctx = canvas.getContext('2d')

export const reduceImageSize = async () => {
  document.getElementById('fileButton').onchange = reduceTheSize
}
function reduceTheSize(e) {
  convert({
    file: this.files[0],
    width: 300,
    height: 200,
    type: 'jpeg',
    watermarkText: iMark,
  })
    .then((resp) => {
      // (D) GO - PROCEED ONLY WHEN IMAGES ARE LOADED
      console.log(1)
      //iBack.src = URL.createObjectURL(resp)
      //console.log(2)
      var image = document.getElementById('outputImage')
      //image.onload = () => {
      //   ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
      //   ctx.fillText('COPYRIGHT', 10, 30)
      // }
      image.src = URL.createObjectURL(resp)
    })
    .catch((error) => {
      // Error
      alert('Error')
    })
}

// (C) WATERMARK
// function cmark() {
//   // (C1) ADD BACKGROUND IMAGE
//   canvas.width = iBack.naturalWidth
//   canvas.height = iBack.naturalHeight
//   ctx.drawImage(iBack, 0, 0, iBack.naturalWidth, iBack.naturalHeight)

//   // (C2) ADD WATERMARK
//   ctx.font = 'bold 10px Arial'
//   ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
//   ctx.fillText(iMark, 10, 30)
//   ctx.fillText(iMark, 50, 30)

//   /* (C3) DOWNLOAD (IF YOU WANT)*/
//   let anchor = document.createElement('a')
//   anchor.href = canvas.toDataURL('image/png')
//   anchor.download = 'marked.png'
//   anchor.click()
//   anchor.remove()
// }

// iBack.onload = cmark

//document.getElementById('mainBody').onload = reduceImageSize

/**
 * This function convert2 does not use the FileReader, it uses the  URL.createObjectURL(file) instead which ha the same effect but it is much simpler. This is the one that worked into ReactJS application, since using the FileReader didn't work.
 *
 */
export const convert2 = ({ file, width, height, type, watermarkText }) => {
  console.log(3)
  return new Promise((resolve, reject) => {
    let imageType = type ? type : 'jpeg'
    const imgWidth = width ? width : 500
    const imgHeight = height ? height : 300
    const fileName = file.name

    const img = new Image()
    img.onload = () => {
      const elem = document.createElement('canvas')
      elem.width = imgWidth
      elem.height = imgHeight
      const ctx = elem.getContext('2d')
      ctx.drawImage(img, 0, 0, imgWidth, imgHeight)
      console.log(5)
      ctx.font = 'bold 10px Arial'
      ctx.fillStyle = 'rgba(255, 0, 0, 0.5)'
      ctx.fillText(watermarkText, imgWidth * 0.05, imgHeight * 0.05)
      ctx.fillText(watermarkText, imgWidth * 0.6, imgHeight * 0.05)
      ctx.fillText(watermarkText, imgWidth * 0.3, imgHeight * 0.5)
      ctx.fillText(watermarkText, imgWidth * 0.05, imgHeight * 0.9)
      ctx.fillText(watermarkText, imgWidth * 0.6, imgHeight * 0.9)
      ctx.canvas.toBlob(
        (blob) => {
          const newFile = new File([blob], fileName, {
            type: `image/${imageType.toLowerCase()}`,
            lastModified: Date.now(),
          })
          resolve(newFile)
        },
        'image/jpeg',
        1
      )
    }
    img.src = URL.createObjectURL(file)
  })
}
