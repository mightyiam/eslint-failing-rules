const resultToFailed = require('./result-to-failed')

const eslintFailingRules = (eslint, files) => {
  const cliEngine = new eslint.CLIEngine()
  const failed = resultToFailed(cliEngine.executeOnFiles(files))
  return failed
}

module.exports = eslintFailingRules
