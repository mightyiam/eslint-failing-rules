const { test } = require('ava')
const eslint = require('eslint')

const subject = require('..')

test(t => {
  const actual = subject(eslint, ['test/_fixture.js'])
  const expected = ['quotes', 'semi']
  t.deepEqual(actual, expected)
})
