import { spawn, exec } from 'child_process'
import process from 'process'

import { getFileList, readFile, writeFile, appendFile } from './utils/files.js'
import { generateAST, traverseAST } from './utils/ast.js'
import { visitor } from './patterns/smells.js'

import checkUnsafeFonts from './patterns/UnSafeFonts.js'
import checkUnoptimizedImages from './patterns/UnOptimizedImages.js'

// Run analysis on all files in a directory
const workspaceDirPath = './test'

export function get_workspacsDirPath() {
  return workspaceDirPath
}

export function set_workspaceDirPath(path) {
  workspaceDirPath = path
}

export function get_smellsToAnalyse() {
  return smellsToAnalyse
}
export function set_smellsToAnalyse(smell, value) {
  smellsToAnalyse[smell] = value
}

// Analysis the file for smells
function analysis(filename, filepath) {
  const smelllist = []
  const code = readFile(filepath)
  const ast = generateAST(code)

  writeFile(`./test_json/${filename}.ast.json`, JSON.stringify(ast, null, 2))
  traverseAST(ast, visitor(filename, filepath, smelllist))

  return smelllist
}

function run_analysis() {

  const files = getFileList(workspaceDirPath, ['jsx', 'js'])
  const globalSmellList = []

  // Run analysis on each file
  files.forEach((file) => {
    const filename = file.name
    const filepath = file.path
    const smelllist = analysis(filename, filepath)

    globalSmellList.push(...smelllist)
    const output = JSON.stringify(smelllist, null, 2)
    console.log('Writing to file: ' + filename + '.json')
    writeFile(`./test_json/${filename}.json`, output)
  })

  // Run non-code analysis
  const unsafeFonts = checkUnsafeFonts(workspaceDirPath)
  const unoptimizedimages = checkUnoptimizedImages(workspaceDirPath)
  globalSmellList.push(...unsafeFonts)
  globalSmellList.push(...unoptimizedimages)

  // Write to global json file
  const output = JSON.stringify(globalSmellList, null, 2)
  console.log('Writing to file: global.json')
  writeFile(`./test_json/global.json`, output)
}

// main() method
function main() {
  run_analysis()
}

main()
