// @flow

async function getMinimumInMap(valueMap /*: Map<string, number>*/) {
  let sortedArray = [];
  for (var [key, value] of valueMap.entries()) {
    if (sortedArray.length === 0) {
      sortedArray.push({
        key,
        value
      });
      continue;
    }

    for (let i = 0; i < sortedArray.length; i++) {
      const arrayItemValue = sortedArray[i].value;
      if (arrayItemValue > value) {
        sortedArray.splice(i, 0, { key, value });
        break;
      } else if (i === sortedArray.length - 1) {
        sortedArray.push({
          key,
          value
        });
        break;
      }
    }
  }
  return sortedArray;
}

async function toValidNode(leftNode, rightNode) {
  return {
    key: leftNode.key + rightNode.key,
    left: leftNode,
    right: rightNode,
    type: "INTERNAL_NODE",
    weight: leftNode.value + rightNode.value,
    value: leftNode.value + rightNode.value
  };
}

module.exports = {
  getMinimumInMap,
  toValidNode
};
