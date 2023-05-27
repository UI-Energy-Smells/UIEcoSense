// Checks whether the JSX element has inline style attribute
import Smell from './smell.js'

const InlineStyleSmell = (
  smelllist,
  filename = '',
  filepath = '',
  log = true,
  refactor = false,
  suggest = true
) => {
  return {
    name: 'InlineStyleSmell',
    description: 'Finds the elements with JSX inline style attribute',
    visitor: {
      JSXAttribute(path) {
        if (path.node.name.name === 'style') {
          const smell = new Smell()
          smell.setLocations(path.node.loc.start, path.node.loc.end)
          smell.setFile(filename, filepath)
          smell.setDetail('jsx_inline_style', 'Inline Style Smell')
          smelllist.push(smell)

          if (log) console.log('Inline Style Smell Found!')
        }
      },
    },
  }
}

export default InlineStyleSmell
