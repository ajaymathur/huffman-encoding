#!/usr/bin/env node
// @flow
const path = require("path");
const { encode, decode } = require("./lib/operation");
const { ensureFileExits, readFile, writeFile } = require("./lib/utils/fs");

async function cli(argv) {
  const cwd = process.cwd();
  let [command, fileName, targetFileName] = argv;
  const pathToFile = path.join(process.cwd(), fileName);
  const FILE_EXISTS = await ensureFileExits(pathToFile);
  if (!FILE_EXISTS) {
    console.log(`ERROR: ${pathToFile} does not exits on disk`);
    process.exit(1);
  }

  targetFileName = targetFileName || fileName;

  if (command === "encode") {
    await encode(pathToFile, targetFileName, cwd);
  } else if (command === "decode") {
    await decode(pathToFile, targetFileName, cwd);
  } else {
    console.log(`ERROR: ${command} is not a supported operation`);
    process.exit(1);
  }
}

cli(process.argv.slice(2)).then(() => {});
