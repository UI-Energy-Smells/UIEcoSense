// Checks whether client side logging is used
import Smell from './smell.js'

const ClientSideLoggingSmell = (
  smelllist,
  filename = '',
  filepath = '',
  log = true,
  refactor = false,
  suggest = true
) => {
  return {
    name: 'ClientSideLoggingSmell',
    description: 'Finds the client side logging statements',
    visitor: {
      CallExpression(path) {
        if (path.node.callee.type === 'MemberExpression' &&
          path.node.callee.object.name === 'console') {
          const smell = new Smell()
          smell.setLocations(path.node.loc.start, path.node.loc.end)
          smell.setFile(filename, filepath)
          smell.setDetail('client_side_logging', 'Client Side Logging Smell')
          smelllist.push(smell)

          if (log) console.log('Client Side Logging Smell Found!')
        }
      },
    },
  }
}

export default ClientSideLoggingSmell
