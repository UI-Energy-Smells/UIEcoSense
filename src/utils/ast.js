// Description: This file contains the functions to generate and traverse the AST
import * as parser from '@babel/parser'
import traverse from '@babel/traverse'

// Generate AST from code
function generateAST(code) {
  return parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'javascript', 'tsx', 'typescript'],
  })
}

// Traverse AST
function traverseAST(ast, visitor) {
  traverse.default(ast, visitor)
}

export { generateAST, traverseAST }
