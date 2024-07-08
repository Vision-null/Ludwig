const { getLineNumber } = require('../../getLineNumber');

// <area> elements of image maps have alternate text
function areaAltTextCheck(nodes) {
// input: nodesArray
// output: array of recs, where each rec is [lineNumber, node.outerHTML]

  const recs = [];

  nodes.forEach((node) => {

    const altText = node.getAttribute('alt');

    if (!altText | altText === '') {

      let lineNumber = getLineNumber(node);

      recs.push([lineNumber, node.outerHTML]);
    }
  });

  return recs;
}

module.exports = {
  areaAltTextCheck
};