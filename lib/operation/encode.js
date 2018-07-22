// @flow
const path = require("path");
const { readFile, writeFile } = require("../utils/fs");
const { getMinimumInMap, toValidNode } = require("../utils/extras");

/*::
type Node = {
  key: number,
  left: number,
  right: number,
  type: 'INTERNAL_NODE' | 'LEAF_NODE',
  weight: number,
  value: ?string,
}
*/

async function encode(pathToFile /*: string */, targetFileName, cwd) {
  const FILE_CONTENT = await readFile(pathToFile, "utf8");

  let ocurrancesTable = new Map();

  for (let i = 0; i < FILE_CONTENT.length; i++) {
    let currentOccurence = ocurrancesTable.get(FILE_CONTENT[i]) || 0;
    ocurrancesTable.set(FILE_CONTENT[i], ++currentOccurence);
  }
  console.log({ ocurrancesTable });

  let sortedocurrancesTable = await getMinimumInMap(ocurrancesTable);

  let Tree;
  //console.log({ sortedocurrancesTable });
  let sortedocurrancesTableCopy = [];

  while (sortedocurrancesTable.length) {
    let firstNode = sortedocurrancesTable.shift();
    let secondNode = sortedocurrancesTable.shift();
    console.log(sortedocurrancesTable);
    let newNode = await toValidNode(firstNode, secondNode);
    for (let i = 0; i < sortedocurrancesTable.length; i++) {
      if (sortedocurrancesTable[i].value > newNode.value) {
        sortedocurrancesTable.splice(i, 0, newNode);
        break;
      } else if (i === sortedocurrancesTable.length - 1) {
        sortedocurrancesTable.push(newNode);
        break;
      }
    }
    Tree = newNode;
  }

  let keyCodes = {};

  function createKeyCodes(tree) {
    let children = ["left", "right"];
    let nodeToVisit = [tree];
    keyCodes[tree.key] = "";
    while (nodeToVisit.length) {
      let visitingNode = nodeToVisit.shift();
      let leftNode = visitingNode[children[0]];
      if (leftNode) {
        keyCodes[leftNode.key] = keyCodes[visitingNode.key] + "0";
        nodeToVisit.unshift(leftNode);
      }
      let rightNode = visitingNode[children[1]];
      if (rightNode) {
        keyCodes[rightNode.key] = keyCodes[visitingNode.key] + "1";
        nodeToVisit.unshift(rightNode);
      }
    }
  }
  createKeyCodes(Tree);

  let KEY_CODES = {};
  let KEY_CODE_TEMP = {};

  Object.keys(keyCodes).forEach((value, index) => {
    if (value.length === 1) {
      KEY_CODES[keyCodes[value]] = value;
      KEY_CODE_TEMP[value] = keyCodes[value];
    }
  });

  console.log({ KEY_CODES, keyCodes, KEY_CODE_TEMP });

  await writeFile(path.join(cwd, ".keycode"), JSON.stringify(KEY_CODES));

  let file = [];

  for (let i = 0; i < FILE_CONTENT.length; i++) {
    file.push(KEY_CODE_TEMP[FILE_CONTENT[i]]);
  }

  const _8BitChars = file.join("").match(/.{1,8}/g);

  let compressedData = "";

  _8BitChars.forEach(char => {
    compressedData += String.fromCharCode(parseInt(char, 2));
  });

  writeFile(path.join(cwd, `${targetFileName}.zip`), compressedData);
}

module.exports = encode;
