// @flow

async function getMinimumInMap(
  valueMap /*: Map<string, number>*/,
  quantity /*: number*/ = 1
) {
  let minimumValues = new Array(quantity);
  let sortedArray = [];

  for (var [key, value] of valueMap.entries()) {
    console.log({ key, value });
    if (sortedArray.length === 0) {
      sortedArray.push({
        key,
        value
      });
    } else {
      const sortedArrayLength = sortedArray.length;
      for (let i = 0; i < sortedArrayLength; i++) {
        const arrayItemValue = sortedArray[i].value;
        if (arrayItemValue > value) {
          sortedArray.splice(i, 0, { key, value });
          break;
        } else if (i === sortedArrayLength - 1) {
          sortedArray.push({
            key,
            value
          });
          break;
        }
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
