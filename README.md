# Ultimate markdown replacer
## What is it?
This is simple js program which replaces markdown with html tag using power of regex!

However it only interacts with bold, italic, monospaced and preformatted. Also there is no support for nested tags

But not only conversion! This application has solid error logging and ability to write to file (why if you have `command > file.html`?).

## How to set up and run?
Follow this simple instructions:

- clone [repo](https://github.com/GeorgiiMelnyk/mtrpz-works.git): `git clone https://github.com/GeorgiiMelnyk/mtrpz-works.git`
- cd to it: `cd mtrpz-works`
- run project: `node app.js [input file] --out [output file]`
    + you can pass arguments in any order
    + all flags are optional. you only need `node app.js [input file]`

## Links
- revert commit: in progress