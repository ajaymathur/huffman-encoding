#!/usr/bin/env node
// @flow
const path = require("path");
const { ensureFileExits, readFile } = require("./utils/fs");

/*::
  type Node = {
    id: number,
    left: number,
    right: number,
    type: 'INTERNAL_NODE' | 'LEAF_NODE',
    weight: number,
    value: ?string,
  }
*/

async function cli(args /*: Array<string> */) {
  const fileToCompress = args.pop();
  const pathToFile = path.join(process.cwd(), fileToCompress);

  const FILE_EXISTS = await ensureFileExits(pathToFile);

  if (!FILE_EXISTS) {
    console.log(`ERROR: ${pathToFile} does not exits on disk`);
    process.exit(1);
  }

  const FILE_CONTENT = await readFile(pathToFile, "utf8");

  let ocurrancesTable = new Map();

  for (let i = 0; i < FILE_CONTENT.length; i++) {
    let currentOccurence = ocurrancesTable.get(FILE_CONTENT[i]) || 0;
    ocurrancesTable.set(FILE_CONTENT[i], ++currentOccurence);
  }
  console.log({ ocurrancesTable });
}

cli(process.argv.slice(2)).then(() => {
  console.log("done");
});
