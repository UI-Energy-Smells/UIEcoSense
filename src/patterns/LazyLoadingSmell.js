// Check whether the component[img, file] is lazy loaded or not
import Smell from './smell.js'

const LazyLoadingSmell = (
  smelllist,
  filename = '',
  filepath = '',
  log = true,
  refactor = false,
  suggest = true
) => {
  return {
    name: 'LazyLoadingSmell',
    description:
      'Find the import statements of components that are not lazy loaded.',
    visitor: {
      JSXElement(path) {
        if (path.node.openingElement.name.name === 'img') {
          for (const attr of path.node.openingElement.attributes) {
            if (attr.name.name === 'loading') {
              if (attr.value.value === 'lazy') {
                return
              }
            }
          }

          const smell = new Smell()
          smell.setLocations(path.node.loc.start, path.node.loc.end)
          smell.setFile(filename, filepath)
          smell.setDetail('lazy_loading', 'Lazy Loading Smell')
          smelllist.push(smell)

          if (log) console.log('Lazy Loading <img> Smell Found!')
        }
      },
      ImportDeclaration(path) {
        // components import statements
        if (path.node.source.value.startsWith('./')) {
          const smell = new Smell()
          smell.setLocations(path.node.loc.start, path.node.loc.end)
          smell.setFile(filename, filepath)
          smell.setDetail('lazy_loading', 'Lazy Loading Smell')
          smelllist.push(smell)

          if (log) console.log('Lazy Loading <import> Smell Found!')
        }
      }
    },
  }
}

export default LazyLoadingSmell
