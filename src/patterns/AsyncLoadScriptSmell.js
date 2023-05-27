// Checks whether the JSX element has async load script[script tag, script import]
import Smell from './smell.js'

function isWithinAwaitExpression(path) {
  let parent = path.parentPath;
  while (parent) {
    if (parent.isAwaitExpression()) {
      return true;
    }
    parent = parent.parentPath;
  }
  return false;
}

const AsyncLoadScriptSmell = (
  smelllist,
  filename = '',
  filepath = '',
  log = true,
  refactor = false,
  suggest = true
) => {
  return {
    name: 'AsyncLoadScriptSmell',
    description: 'Finds the elements without async load script tag or import statement',
    visitor: {
      JSXElement(path) {
        if (path.node.openingElement.name.name === 'script') {
          for (const attr of path.node.openingElement.attributes) {
            if (attr.name.name === 'async') {
              return
            }
          }

          const smell = new Smell()
          smell.setLocations(path.node.loc.start, path.node.loc.end)
          smell.setFile(filename, filepath)
          smell.setDetail('jsx_async_load_script_script_tag', 'Async Load Script Smell')
          smelllist.push(smell)

          if (log) console.log('Async Load Script <tag> Smell Found!')
        }
      }
    }
  }
}

export default AsyncLoadScriptSmell
