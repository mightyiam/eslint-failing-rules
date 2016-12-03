const { test } = require('ava')

const subject = require('./result-to-failed')

const ruleIds = {
  a: Symbol('a'),
  b: Symbol('b'),
  c: Symbol('c')
}

const expectedIOs = [
  {
    i: [],
    o: [],
    name: 'no file no message'
  },
  {
    i: [{ messages: [] }],
    o: [],
    name: 'single file no message'
  },
  {
    i: [{ messages: [{ ruleId: ruleIds.a }] }],
    o: [ruleIds.a],
    name: 'single file single message'
  },
  {
    i: [{ messages: [{ ruleId: ruleIds.a }, { ruleId: ruleIds.b }] }],
    o: [ruleIds.a, ruleIds.b],
    name: 'single file two messages'
  },
  {
    i: [{ messages: [{ ruleId: ruleIds.a }, { ruleId: ruleIds.b }, { ruleId: ruleIds.c }] }],
    o: [ruleIds.a, ruleIds.b, ruleIds.c],
    name: 'single file three messages'
  },
  {
    i: [{ messages: [] }, { messages: [] }],
    o: [],
    name: 'two files no messages'
  },
  {
    i: [{ messages: [{ ruleId: ruleIds.a }] }, { messages: [] }],
    o: [ruleIds.a],
    name: 'two files single message'
  },
  {
    i: [{ messages: [{ ruleId: ruleIds.a }] }, { messages: [{ ruleId: ruleIds.b }] }],
    o: [ruleIds.a, ruleIds.b],
    name: 'two files single message each'
  },
  {
    i: [123, {}, {foo: 'bar'}],
    o: [],
    name: 'no file no message, some other values'
  },
  {
    i: [{ foo: 'basdfs', messages: ['asdf', { baasaf: 51, ruleId: ruleIds.a }] }],
    o: [ruleIds.a],
    name: 'single file single message, some other values'
  },
  {
    i: [{ messages: [{ ruleId: ruleIds.a }, { ruleId: ruleIds.a }] }],
    o: [ruleIds.a],
    name: 'acts like a set'
  }
]

expectedIOs.forEach(({name, i, o}) => {
  test(name, t => {
    t.deepEqual(subject(i), o)
  })
})
