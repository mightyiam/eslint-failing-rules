const { test } = require('ava')
const mock = require('mock-require')
const { spy } = require('simple-spy')

const CLIEngineSpy = spy(() => {})

const executeOnFilesStubReturn = Symbol('executeOnFilesStubReturn')
const executeOnFilesStub = files => executeOnFilesStubReturn
CLIEngineSpy.prototype = { executeOnFiles: spy(executeOnFilesStub) }
const eslintStub = { CLIEngine: CLIEngineSpy }

const resultToFailedStubReturn = Symbol('resultToFailedStubReturn')
const resultToFailedStub = result => resultToFailedStubReturn
const resultToFailedSpy = spy(resultToFailedStub)
mock('./result-to-failed', resultToFailedSpy)

test.beforeEach(() => {
  CLIEngineSpy.reset()
  CLIEngineSpy.reset()
  resultToFailedSpy.reset()
})

const subject = require('.')

test('exports a function of arity 2', t => {
  t.is(typeof subject, 'function')
  t.is(subject.length, 2)
})

test('calls `eslint.CLIEngine` once with no args', t => {
  subject(eslintStub, [])
  t.deepEqual(CLIEngineSpy.args, [[]])
})

test('calls `resultToFailed` once with output of `executeOnFiles`', t => {
  subject(eslintStub)
  t.deepEqual(resultToFailedSpy.args, [[executeOnFilesStubReturn]])
})

test('returns output of `resultToFailed`', t => {
  t.is(subject(eslintStub), resultToFailedStubReturn)
})
