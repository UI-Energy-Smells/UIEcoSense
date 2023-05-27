import { visitors } from '@babel/traverse'

// Import all the smells
import InlineStyleSmell from './InlineStyleSmell.js'
import LazyLoadingSmell from './LazyLoadingSmell.js'
import AnonymousEventHandlerSmell from './AnonymousEventHandlerSmell.js'
import AsyncLoadScriptSmell from './AsyncLoadScriptSmell.js'
import ClientSideLoggingSmell from './ClientSideLoggingSmell.js'

// Add all the smells to the checklist
const checklist = [
  InlineStyleSmell,
  LazyLoadingSmell,
  AnonymousEventHandlerSmell,
  AsyncLoadScriptSmell,
  ClientSideLoggingSmell,
]

// Merge all the visitors from the smells
const visitor = (filename, filepath, smelllist) =>
  visitors.merge(
    checklist.map((pattern) => pattern(smelllist, filename, filepath).visitor)
  )

export { visitor }
