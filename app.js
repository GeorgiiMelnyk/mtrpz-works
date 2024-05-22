const fs = require('fs');
const convertMarkdown = require('./convertMarkdown.js');

const args = process.argv.slice(2);

const params = {
    writeTo: null,
    readFrom: null,
}

for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
        case '--out':
            params.writeTo = args[i + 1];
            i++;
            break;
        default:
            if (params.readFrom !== null) throw new Error('Incorrect command structure.');
            params.readFrom = args[i];
    }
}

if (params.readFrom === null) throw new Error('Ni file to read.');

const markdown = fs.readFileSync(params.readFrom, 'utf8');
const result = convertMarkdown(markdown);

if (params.writeTo === null) {
    console.log(result);
} else {
    fs.writeFileSync(params.writeTo, result, 'utf8');
}