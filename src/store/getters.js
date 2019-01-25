export default {
  getService: (state) => (serviceId) => {
    return state.services.find(service => service.id == serviceId);
  },

  getServices: (state) => () => {
    return state.services;
  },

  getEnvironments: (state) => (serviceId) => {
    return state.environments.filter(environment => environment.service == serviceId);
  },

  getEnvironment: (state) => (envName, serviceId) => {
    let env = envName;

    if (env === 'All') {
      env = 'production';
    }
    return state.environments.find(environment => {
      return environment.name == env && environment.service == serviceId;
    });
  },

  getTestsCount: (state) => (serviceId) => {
    const filterTests = state.tests.filter(test => test.service == serviceId);
    return filterTests.length;
  },

  getTests: (state) => (serviceId) => {
    const filterTests = state.tests.filter(test => test.service == serviceId);
    const obj = new Object();

    filterTests.forEach(element => {
      if (!obj.hasOwnProperty(element.endpoint)) {
        obj[element.endpoint] = new Array(element);
      } else {
        obj[element.endpoint].push(element);
      }
    });

    return obj;
  },

  getTest: (state) => (testId) => {
    return state.tests.find(test => test.id == testId);
  },

  getSetups: (state) => (serviceId) => {
    return state.setups.filter(setup => {
      return setup.service == serviceId;
    });
  },

  getTeardowns: (state) => (serviceId) => {
    return state.teardowns.filter(teardown => {
      return teardown.service == serviceId;
    });
  },

  getAssertions: (state) => (testId) => {
    return state.assertions.filter(assertion => {
      return assertion.test == testId;
    });
  },

  getResults: (state) => (testId, envName) => {
    // 根据 testId 获取该 test 的所有结果
    let results = state.results.filter(result => {
      return result.test == testId;
    });

    // 再根据环境过滤
    if (envName != 'All') {
      results = results.filter(result => {
        return result.executionEnvironment.name == envName;
      });
    }

    // 降序排列
    return results.sort((result1, result2) => {
      return result2.id - result1.id;
    })
  },

  getRuns: (state) => (serviceId, envName) => {
    let runs = state.runs.filter(run => {
      return run.service == serviceId;
    });

    // 再根据环境过滤
    if (envName != 'All') {
      runs = runs.filter(run => {
        return run.executionEnvironment.name == envName;
      });
    }

    // 过滤掉空的run
    runs = runs.filter(run => {
      return state.results.filter(result => result.testRun == run.id).length;
    });

    // 降序排列
    return runs.sort((run1, run2) => {
      return run2.id - run1.id;
    });
  },

  getRunTestsResults: (state) => (runId) => {
    return state.results.filter(result => {
      return result.testRun == runId;
    });
  }

}
