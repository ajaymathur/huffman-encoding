//@flow
const fs = require("fs");
const { promisify } = require("util");

const stat = promisify(fs.stat);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function ensureFileExits(filePath /*: string*/) {
  try {
    await stat(filePath);
    return true;
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }
  return false;
}

module.exports = {
  ensureFileExits,
  readFile,
  writeFile
};
