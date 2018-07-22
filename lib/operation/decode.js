// @flow
const path = require("path");
const leftPad = require("left-pad");
const { readFile, writeFile } = require("../utils/fs");

async function decode(
  pathToFile /*: string*/,
  targetFileName /*: string*/,
  cwd /*: string*/
) {
  const FILE_CONTENT = await readFile(pathToFile, "utf8");

  let decodedText = [];
  let buffer = "";

  const keycode = await readFile(path.join(cwd, ".keycode"), "utf8");
  const KEY_CODES = JSON.parse(keycode);

  let binaryCode = "";

  for (let i = 0; i < FILE_CONTENT.length; i++) {
    binaryCode += leftPad(FILE_CONTENT[i].charCodeAt().toString(2), 8, 0);
  }

  for (let i = 0; i < binaryCode.length; i++) {
    buffer += binaryCode[i];
    if (KEY_CODES[buffer]) {
      decodedText.push(KEY_CODES[buffer]);
      buffer = "";
    }
  }

  await writeFile(
    path.join(cwd, `${targetFileName}.txt`),
    decodedText.join(""),
    "utf8"
  );
}

module.exports = decode;
