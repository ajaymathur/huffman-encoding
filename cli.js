#!/usr/bin/env node
// @flow

async function cli(args /*: Array<string> */) {
    const fileToCompress = args.pop();
}

cli(process.argv.slice(2)).then(() => {
    console.log('done')
})
