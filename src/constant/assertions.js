export const ASSERTIONSOPTIONS = [{
    source: 'AssertStatusCode',
    component: 'StatusCodeAssertion',
    label: 'Status code',
    type: 'user'
  },
  {
    source: 'AssertJsonData',
    component: 'JsonDataAssertion',
    label: 'JSON path data',
    type: 'user'
  },
  {
    source: 'AssertVariableCapture',
    label: 'Variable capture',
    type: 'built'
  },
  {
    source: 'AssertHttpRequestSuccess',
    label: 'HTTP request success',
    type: 'built'
  },
  {
    source: 'AssertSetupStep',
    label: 'Setup step',
    type: 'built'
  },
  {
    source: 'AssertTeardownStep',
    label: 'Teardown step',
    type: 'built'
  }
];


export const STATUSCODECOMPARISONOPTIONS = [{
    text: "Equal",
    value: "AssertEquals"
  },
  {
    text: "Does not equal",
    value: "AssertNotEquals"
  }
]


export const JSONDATACOMPARISONOPTIONS = [{
    text: 'Less than',
    value: 'AssertLessThan'
  },
  {
    text: 'Greater than',
    value: 'AssertGreaterThan'
  },
  {
    text: 'Contains',
    value: 'AssertContains'
  },
  {
    text: 'Does not contain',
    value: 'AssertNotContains'
  }
].concat(STATUSCODECOMPARISONOPTIONS);
