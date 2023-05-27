import Smell from './smell.js'
import { getFileList } from '../utils/files.js'

function checkOptimizedImages(filedir) {
  // svg, webp, gif are optimized images
  const unoptimizedImages = ['png', 'jpg', 'jpeg']
  const files = getFileList(filedir, unoptimizedImages)

  const smelllist = []
  files.forEach((file) => {
    const filename = file.name
    const filepath = file.path

    const smell = new Smell()
    smell.setFile(filename, filepath)
    smell.setDetail('unoptimized_images', 'Unoptimized Images')
    smell.setRefactorable(false)

    smelllist.push(smell)
  })

  return smelllist
}

export default checkOptimizedImages
