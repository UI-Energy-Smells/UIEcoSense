import Smell from './smell.js'
import { getFileList } from '../utils/files.js'

function checkUnsafeFonts(filedir) {
  // ttf, otf are unsafe fonts
  const unsafeFonts = ['ttf', 'otf']
  const files = getFileList(filedir, unsafeFonts)

  const smelllist = []
  files.forEach((file) => {
    const filename = file.name
    const filepath = file.path

    const smell = new Smell()
    smell.setFile(filename, filepath)
    smell.setDetail('unsafe_fonts', 'Web Unsafe fonts')
    smell.setRefactorable(false)

    smelllist.push(smell)
  })

  return smelllist
}

export default checkUnsafeFonts
