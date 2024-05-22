const convert = require('./convertMarkdown.js')

const assert = (description, condition) => {
  if (!condition) {
    console.error(`❌ ${description}`)
    process.exit(1)
  } else {
    console.log(`✅ ${description}`)
  }
}

const expectToThrow = (func, ...args) => {
  try {
    func(...args)
    return false
  } catch (error) {
    return true
  }
}

assert('convertMarkdown to HTML', convert('Hello **world**', true) === '<p>Hello <b>world</b></p>')
assert('convertMarkdown to codes', convert('Hello **world**', false) === 'Hello \x1b[1mworld\x1b[0m')
assert('throw error on unclosed tag', expectToThrow(convert, 'Hello **world', true))
assert('throw error on nested', expectToThrow(convert, '_Hello **world** !_', false))

