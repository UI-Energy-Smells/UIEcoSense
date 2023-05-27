// Description: File system utilities
import dirTree from 'directory-tree'
import fs from 'fs'

// Get files from a directory
function getFiles(path, ext, attributes) {
  let extReg = new RegExp(`$`)
  if (ext) extReg = new RegExp(`\.(${ext.join('|')})$`)

  const tree = dirTree(path, { extensions: extReg, attributes: attributes })
  return tree
}

// Recursively get all files from a directory
function recurseDir(tree) {
  if (!tree) return []

  const non_dir = [],
    dir = []
  if (tree.type === 'directory') {
    tree.children.forEach((child) => {
      non_dir.push(...recurseDir(child))
    })
  } else {
    dir.push(tree)
  }

  return [...non_dir, ...dir]
}

// Get all files from a directory with a given extension and attributes
function getFileList(path, ext, attributes = []) {
  const essential_attributes = ['type', 'extension']
  attributes = [...new Set(attributes.concat(essential_attributes))]

  const tree = getFiles(path, ext, attributes)
  return recurseDir(tree)
}

// Read file
function readFile(path) {
  const code = fs.readFileSync(path, 'utf8')
  return code
}

// Write file
function writeFile(path, data) {
  fs.writeFileSync(path, data)
}
function appendFile(path, data) {
  fs.appendFileSync(path, data)
}

export { getFileList, getFiles, readFile, writeFile, appendFile }
