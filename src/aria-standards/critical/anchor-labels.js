const { getLineNumber } = require('../../getLineNumber');

// logic for if anchors have a label
function anchorLabelCheck(nodes) {
// input: nodesArray
// output: array of recs, where each rec is [lineNumber, node.outerHTML]


  const recs = [];

  nodes.forEach((node) => {

    const ariaLabel = node.getAttribute('aria-label');

    if (!ariaLabel) {

      const lineNumber = getLineNumber(node);

      recs.push([lineNumber, node.outerHTML]);
    }
  });

  return recs;
}


module.exports = {
  anchorLabelCheck
};