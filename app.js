const fs = require('fs')
const convertMarkdown = require('./convertMarkdown.js')

const args = process.argv.slice(2)

const params = {
  writeTo: null,
  readFrom: null,
  format: 'html'
}

for (let i = 0; i < args.length; i++) {
  const arg = args[i]

  if (arg === '--out') {
    params.writeTo = args[i + 1]
    i++
  } else if (arg.includes('--format=')) {
    switch (arg.split('=')[1]) {
      case 'html':
      case 'codes':
        params.format = arg.split('=')[1]
        break
      default:
        throw new Error('Unknown format.')
    }
  } else {
    if (params.readFrom !== null) throw new Error('Incorrect command structure.')
    params.readFrom = args[i]
  }
}

if (params.readFrom === null) throw new Error('No file to read.')

const markdown = fs.readFileSync(params.readFrom, 'utf8')
const result = convertMarkdown(markdown, params.format === 'html')

if (params.writeTo === null) {
  console.log(result)
} else {
  fs.writeFileSync(params.writeTo, result, 'utf8')
}
