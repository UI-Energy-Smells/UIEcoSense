// Checks whether the JSX element has anonymous event handlers
import Smell from './smell.js'

const AnonymousEventHandler = (
  smelllist,
  filename = '',
  filepath = '',
  log = true,
  refactor = false,
  suggest = true
) => {
  return {
    name: 'AnonymousEventHandler',
    description: 'Finds the elements with anonymous event handlers',
    visitor: {
      JSXAttribute(path) {
        // if event handler is anonymous function, it is not a good practice
        if (path.node.name.name.startsWith('on') && path.node.value.expression.type === 'ArrowFunctionExpression') {
          const smell = new Smell()
          smell.setLocations(path.node.loc.start, path.node.loc.end)
          smell.setFile(filename, filepath)
          smell.setDetail('jsx_anonymous_event_handler', 'Anonymous Event Handler Smell')
          smelllist.push(smell)

          if (log) console.log('Anonymous Event Handler Smell Found!')
        }
      },
    },
  }
}

export default AnonymousEventHandler
