# Ultimate markdown replacer
## What is it?
This is simple js program which replaces markdown with html tags or escape codes using power of regex!

However it only interacts with bold, italic, monospaced and preformatted. Also there is no support for nested tags

But not only conversion! This application has solid error logging and ability to write to file (why if you have `command > file.html`?).

## How to set up and run?
Follow this simple instructions:

- clone [repo](https://github.com/GeorgiiMelnyk/mtrpz-works.git): `git clone https://github.com/GeorgiiMelnyk/mtrpz-works.git`
- cd to it: `cd mtrpz-works`
- move to latest branch: `git checkout second`
- run project: `node app.js [input file] --out [output file] --format=[html or codes]`
    + you can pass arguments in any order
    + all flags are optional. you only need `node app.js [input file]`

### Required
- git
- node

## Links
- [revert commit](https://github.com/GeorgiiMelnyk/mtrpz-works/commit/be9e609aa73c35c752b7d88bd569ab392d28d664)
### Tests
- [successful](https://github.com/GeorgiiMelnyk/mtrpz-works/commit/eba8b7c58d50db28f1ad82ca9b6975a3a3929c78)
- [failed](https://github.com/GeorgiiMelnyk/mtrpz-works/commit/5f89298c5058dd7a13d6b9143dc28b1ff0f03499)
- [pul request](https://github.com/GeorgiiMelnyk/mtrpz-works/pull/1)