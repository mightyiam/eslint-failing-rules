const traverse = require('traverse')

const resultToFailed = (result) => {
  return traverse(result)
    .reduce(function (failed, node) {
      if (
        this.isLeaf &&
        this.key === 'ruleId' &&
        this.parent.parent.key === 'messages' &&
        !failed.includes(node)
      ) {
        failed.push(node)
      }
      return failed
    }, [])
}

module.exports = resultToFailed
