// setup 
export const RANDOMSETUPGEN = {
  value: "RandomSetupGenerator",
  text: "Random data generator",
  name: "Random variables",
  type: 'RandomGenerator'
};

export const HTTPREQSETUPGEN = {
  value: "HttpReqSetupGenerator",
  text: "HTTP request setup",
  name: "Fetch variable",
  type: 'HttpReqGenerator'
};

export const SETUPGENERATOROPTIONS = [
  RANDOMSETUPGEN,
  HTTPREQSETUPGEN
];

// teardown
export const HTTPREQTEARDOWNGEN = {
  value: 'HttpReqTeardownGenerator',
  text: 'HTTP request teardown',
  name: 'Teardown step',
  type: 'HttpReqGenerator'
};

export const TEARDOWNGENOPTIONS = [
  HTTPREQTEARDOWNGEN,
];

// random gen options
export const RANDOMGENERATOROPTIONS = [{
    type: "TextVar",
    text: "Text",
  },
  {
    type: "IntVar",
    text: "Number",
  },
  {
    type: "UuidVar",
    text: "UUID",
  },
  {
    type: "TimestampVar",
    text: "Timestamp(UTC)",
  }
];
