'use strict'

const paragraphInput = /(\r?\n){2,}/
const preformatted = /(?<=^|\r?\n)```(?=\r?\n|$)/

const mdTags = {
  bold: [/(?<=^|\s)\*\*(?=\S)/, /(?<=\S)\*\*(?=\s|$)/],
  italic: [/(?<=^|\s)_(?=\S)/, /(?<=\S)_(?=\s|$)/],
  monospaced: [/(?<=^|\s)`(?=\S)/, /(?<=\S)`(?=\s|$)/]
}

const htmlTags = {
  preformatted: ['<pre>', '</pre>'],
  paragraph: ['<p>', '</p>'],
  bold: ['<b>', '</b>'],
  italic: ['<i>', '</i>'],
  monospaced: ['<code>', '</code>']
}

const codesTags = {
  preformatted: ['\x1b[7m', '\x1b[0m'],
  bold: ['\x1b[1m', '\x1b[0m'],
  italic: ['\x1b[3m', '\x1b[0m'],
  monospaced: ['\x1b[7m', '\x1b[0m']
}

const convertMarkdown = (markdown, htmlFormat) => {
  const tags = htmlFormat ? htmlTags : codesTags
  const splitted = splitPreformatted(markdown)
  if (splitted.length % 2 !== 1) throw new Error('Expected formatted ending.')

  for (let i = 0; i < splitted.length - 1; i += 2) {
    splitted[i] = replace(splitted[i], tags)
    if (htmlFormat) splitted[i] = splitParagraphs(splitted[i], tags)
  }
  splitted[splitted.length - 1] = replace(splitted[splitted.length - 1], tags)
  if (htmlFormat) splitted[splitted.length - 1] = splitParagraphs(splitted[splitted.length - 1], tags)

  if (htmlFormat) markdown = htmlTags.paragraph[0] + joinPreformatted(splitted, tags) + htmlTags.paragraph[1]
  else markdown = joinPreformatted(splitted, tags)
  return markdown
}

const splitPreformatted = (markdown) => markdown.split(preformatted)
const joinPreformatted = (markdown, tags) => {
  let isClosing = false

  return markdown.reduce((result, line) => {
    result += isClosing ? tags.preformatted[1] : tags.preformatted[0]
    isClosing = !isClosing
    return result + line
  })
}

const splitParagraphs = (markdown, tags) => markdown.replace(paragraphInput, tags.paragraph[1] + '\n' + tags.paragraph[0])

const replace = (markdown, tags) => {
  const foundTags = []

  for (const baseTagKey in mdTags) {
    const baseTag = mdTags[baseTagKey]
    for (const tagIndex in mdTags[baseTagKey]) {
      const tag = baseTag[tagIndex]
      while (true) {
        const index = markdown.search(tag)
        if (index === -1) break
        markdown = markdown.replace(tag, tags[baseTagKey][tagIndex])
        foundTags.push([baseTagKey, tagIndex, index])
      }
    }
  }

  if (foundTags.length === 0) return markdown
  if (foundTags.length % 2 === 1) throw new Error(`Expected closing tag for "${foundTags[foundTags.length - 1][0]}"`)
  foundTags.sort((a, b) => a[2] - b[2])

  for (let i = 0; i < foundTags.length; i += 2) {
    const [firstKey, firstTagIndex] = foundTags[i]
    const [secondKey, secondTagIndex] = foundTags[i + 1]
    if (firstTagIndex === 1) throw new Error(`Unexpected closing tag "${firstKey}"`)
    if (secondTagIndex === 0) throw new Error(`Nested tags are not allowed "${firstKey}", "${secondKey}"`)
    if (firstKey !== secondKey) throw new Error(`Tags "${firstKey}" and "${secondKey}" are not paired`)
  }

  return markdown
}

module.exports = convertMarkdown
