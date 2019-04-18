import {
  RECORD_USERINFO,
  RESET_STORE,
  SEND_RESET_PASSWORD_EMAIL,
  RESET_PASSWORD,
  RECORD_SERVICES,
  UPDATE_SERVICE,
  RECORD_ENVIRONMENTS,
  RECORD_ENVIRONMENT,
  DELETE_ENVIRONMENT,
  UPDATE_ENVIRONMENT,
  ADD_ENVIRONMENT,
  RECORD_TESTS,
  CREATE_TEST,
  DELETE_TEST,
  UPDATA_TEST,
  CREATE_SETUP_STEP,
  RECORD_STEPS,
  UPDATE_STEPS,
  DELETE_SETUP_STEP,
  RECORD_SETUPS,
  CREATE_SETUP,
  DELETE_SETUP,
  UPDATE_SETUP,
  RECORD_TEARDOWNS,
  CREATE_TEARDOWN,
  DELETE_TEARDOWN,
  UPDATE_TEARDOWN,
  CREATE_TEARDOWN_STEP,
  DELETE_TEARDOWN_STEP,
  CREATE_ASSERTION,
  DELETE_ASSERTION,
  UPDATE_ASSERTION,
  RECORD_ASSERTIONS,
  CREATE_RESULT,
  RECORD_RESULTS,
  CREATE_SUITE,
  RECORD_SUITES,
  RECORD_NEW_SERVICE,
  RECORD_SCHEDULES,
  CREATE_SCHEDULE,
  DELETE_SCHEDULE,
  UPDATE_SCHEDULE,
  ADD_TEST_TO_SCHEDULE,
  DELETE_TEST_FROM_SCHEDULE,
  RECORD_HOOKS,
  CREATE_HOOK,
  DELETE_HOOK,
  UPDATE_HOOK,
  ADD_TEST_TO_HOOK,
  DELETE_TEST_FROM_HOOK,
} from './mutation-types'

import {
  initialState
} from './index'

export default {
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.token = info.token;
  },

  [RESET_STORE](state) {
    const initial = initialState();
    Object.keys(initial).forEach(key => {
      state[key] = initial[key]
    });
  },

  [SEND_RESET_PASSWORD_EMAIL](state, email) {
    state.emailForResetPassword = email;
  },

  [RESET_PASSWORD](state, value) {
    state.isResetPassword = value;
  },

  [RECORD_SERVICES](state, services) {
    state.services = services;
  },

  [UPDATE_SERVICE](state, newService) {
    const oldService = state.services.find(service => {
      return service.id == newService.id;
    });
    if (oldService) {
      Object.keys(oldService).forEach(key => {
        oldService[key] = newService[key];
      });
    }

    // 更新 production environment
    state.environments.forEach(env => {
      if (env.name == 'production') {
        env.url = newService.host;
      }
    })
  },

  [RECORD_ENVIRONMENTS](state, environments) {
    state.environments = environments;
  },

  [RECORD_ENVIRONMENT](state, env) {
    state.env = env;
  },

  [ADD_ENVIRONMENT](state, env) {
    state.environments.push(env);
  },

  [DELETE_ENVIRONMENT](state, envId) {
    const index = state.environments.findIndex(env => {
      return env.id == envId;
    });
    state.environments.splice(index, 1);

    // schedules
    state.schedules.forEach((schedule, index) => {
      if (schedule.environment == envId) {
        state.schedules.splice(index, 1);
      }
    })
  },

  [UPDATE_ENVIRONMENT](state, updatedEnv) {
    state.environments.forEach(env => {
      if (env.id == updatedEnv.id) {
        Object.keys(updatedEnv).forEach(key => {
          env[key] = updatedEnv[key];
        });
      }
    });
  },

  [RECORD_TESTS](state, tests) {
    state.tests = tests;
  },

  [CREATE_TEST](state, test) {
    state.tests.push(test);
  },

  [DELETE_TEST](state, testId) {
    // delete tests
    const index = state.tests.findIndex(test => test.id == testId);
    if (index != -1) {
      state.tests.splice(index, 1);
    }
    // delete setups
    state.setups.forEach(setup => {
      const index = setup.tests.findIndex(test => test.id == testId);
      if (index != -1) {
        setup.tests.splice(index, 1);
      }
    });
    // delete teardowns
    state.teardowns.forEach(teardown => {
      const index = teardown.tests.findIndex(test => test.id == testId);
      if (index != -1) {
        teardown.tests.splice(index, 1);
      }
    });
    // delete steps
    if (state.steps && state.steps.test == testId) {
      state.steps = null;
    }
    // delete assertions
    state.assertions = state.assertions.filter(assertion => assertion.test != testId);

    // delete results
    state.results = state.results.filter(result => result.test != testId);

    // delete schedule
    state.schedules.forEach(schedule => {
      const index = schedule.tests.filter(test => test.id == testId);

      if (index != -1) {
        schedule.tests.splice(index, 1);
      }
    });

    // delete hook
    state.hooks.forEach(hook => {
      const index = hook.tests.filter(test => test.id == testId);
      if (index != -1) {
        hook.tests.splice(index, 1);
      }
    });

    // delete runs
    // const runsIdForDelete = [];

    // state.runs.forEach(run => {
    //   if (state.results.filter(result => result.testRun == run.id).length === 0) {
    //     runsIdForDelete.push(run.id);
    //   }
    // });

    // runsIdForDelete.forEach(runId => {
    //   let index = state.runs.findIndex(run => run.id == runId);
    //   state.runs.splice(index, 1);
    // });
  },

  [UPDATA_TEST](state, updatedTest) {
    // update tests
    state.tests.forEach(test => {
      if (test.id == updatedTest.id) {
        Object.keys(updatedTest).forEach(key => {
          test[key] = updatedTest[key];
        });
      }
    });
    // update setups
    state.setups.forEach(setup => {
      setup.tests.forEach(test => {
        if (test.id == updatedTest.id) {
          Object.keys(updatedTest).forEach(key => {
            test[key] = updatedTest[key];
          });
        }
      });
    });
    // update teardowns
    state.teardowns.forEach(teardown => {
      teardown.tests.forEach(test => {
        if (test.id == updatedTest.id) {
          Object.keys(updatedTest).forEach(key => {
            test[key] = updatedTest[key];
          });
        }
      });
    });
    // update schedules
    state.schedules.forEach(schedule => {
      schedule.tests.forEach(test => {
        if (test.id == updatedTest.id) {
          Object.keys(updatedTest).forEach(key => {
            test[key] = updatedTest[key];
          });
        }
      })
    })
    // update hooks
    state.hooks.forEach(hook => {
      hook.tests.forEach(test => {
        if (test.id == updatedTest.id) {
          Object.keys(updatedTest).forEach(key => {
            test[key] = updatedTest[key];
          });
        }
      })
    })

  },

  [RECORD_STEPS](state, steps) {
    state.steps = steps;
  },

  [UPDATE_STEPS](state, steps) {
    state.steps = steps;
  },

  [DELETE_SETUP_STEP](state, {
    setupId,
    testId
  }) {
    // 更新steps
    const index1 = state.steps.setups.findIndex(setup => setup.id === setupId);
    if (index1 != -1) {
      state.steps.setups.splice(index1, 1);
    }
    // 更新setups
    const setup = state.setups.find(setup => setup.id === setupId);
    const index2 = setup.tests.findIndex(test => test.id === testId);
    if (index2 != -1) {
      setup.tests.splice(index2, 1);
    }
  },

  [CREATE_SETUP_STEP](state, {
    step,
    testId
  }) {
    // 更新steps
    state.steps.setups.push(step);
    // 更新setups
    state.setups.forEach(setup => {
      if (setup.id === step.id) {
        const test = state.tests.find(test => test.id === testId);
        setup.tests.push(test);
      }
    });
  },

  [RECORD_SETUPS](state, setups) {
    state.setups = setups;
  },

  [CREATE_SETUP](state, setup) {
    state.setups.push(setup);
  },

  [DELETE_SETUP](state, setupId) {
    // 更新setups
    const index1 = state.setups.findIndex(setup => setup.id === setupId);
    if (index1 != -1) {
      state.setups.splice(index1, 1);
    }

    // 更新setps
    const index2 = state.steps.setups.findIndex(setup => setup.id === setupId);
    if (index2 != -1) {
      state.steps.setups.splice(index2, 1);
    }
  },
  [UPDATE_SETUP](state, updatedSetup) {
    // 更新setups
    state.setups.forEach(setup => {
      if (setup.id === updatedSetup.id) {
        Object.keys(updatedSetup).forEach(key => {
          setup[key] = updatedSetup[key];
        });
      }
    });
  },
  [RECORD_TEARDOWNS](state, teardowns) {
    state.teardowns = teardowns;
  },

  [CREATE_TEARDOWN](state, teardown) {
    state.teardowns.push(teardown);
  },

  [DELETE_TEARDOWN](state, teardownId) {
    // 更新teardowns
    const index1 = state.teardowns.findIndex(teardown => teardown.id === teardownId);
    if (index1 != -1) {
      state.teardowns.splice(index1, 1);
    }

    // 更新steps
    const index2 = state.steps.teardowns.findIndex(teardown => teardown.id === teardownId);
    if (index2 != -1) {
      state.steps.teardowns.splice(index2, 1);
    }
  },

  [UPDATE_TEARDOWN](state, updatedTeardown) {
    state.teardowns.forEach(teardown => {
      if (teardown.id === updatedTeardown.id) {
        Object.keys(updatedTeardown).forEach(key => {
          teardown[key] = updatedTeardown[key];
        });
      }
    });
  },

  [CREATE_TEARDOWN_STEP](state, {
    step,
    testId
  }) {
    state.steps.teardowns.push(step);
    state.teardowns.forEach(teardown => {
      if (teardown.id === step.id) {
        const test = state.tests.find(test => test.id === testId);
        teardown.tests.push(test);
      }
    });
  },

  [DELETE_TEARDOWN_STEP](state, {
    teardownId,
    testId
  }) {
    // 更新steps
    const index1 = state.steps.teardowns.findIndex(teardown => teardown.id === teardownId);
    if (index1 != -1) {
      state.steps.teardowns.splice(index1, 1);
    }
    // 更新teardowns
    const teardown = state.teardowns.find(teardown => teardown.id === teardownId);
    const index2 = teardown.tests.findIndex(test => test.id === testId);
    if (index2 != -1) {
      teardown.tests.splice(index2, 1);
    }
  },

  [CREATE_ASSERTION](state, assertion) {
    state.assertions.push(assertion);
  },

  [DELETE_ASSERTION](state, assertionId) {
    const index = state.assertions.findIndex(assertion => assertion.id == assertionId);
    state.assertions.splice(index, 1);
  },

  [UPDATE_ASSERTION](state, updatedAssertion) {
    state.assertions.forEach(assertion => {
      if (assertion.id === updatedAssertion.id) {
        Object.keys(updatedAssertion).forEach(key => {
          assertion[key] = updatedAssertion[key];
        });
      }
    });
  },

  [RECORD_ASSERTIONS](state, assertions) {
    state.assertions = assertions;
  },

  [RECORD_RESULTS](state, results) {
    state.results = results;
  },

  [CREATE_RESULT](state, result) {
    const index = state.results.findIndex(element => {
      return result.id == element.id;
    });

    if (index != -1) {
      state.results.splice(index, 1);
    }

    state.results.push(result);
  },

  [RECORD_SUITES](state, suites) {
    state.runs = suites;
  },

  [CREATE_SUITE](state, suite) {
    const index = state.runs.findIndex(element => {
      return suite.id == element.id;
    });

    if (index != -1) {
      state.runs.splice(index, 1);
    }

    state.runs.push(suite);
  },
  [RECORD_NEW_SERVICE](state, data) {
    // services
    const services = data.services;
    const assertions = data.assertions;
    const environments = data.environments;
    const tests = data.tests;

    state.services = state.services.concat(services);
    state.assertions = state.assertions.concat(assertions);
    state.environments = state.environments.concat(environments);
    state.tests = state.tests.concat(tests);
  },
  [RECORD_SCHEDULES](state, schedules) {
    state.schedules = schedules;
  },
  [CREATE_SCHEDULE](state, schedule) {
    state.schedules.push(schedule);
  },
  [DELETE_SCHEDULE](state, scheduleId) {
    const index = state.schedules.findIndex(element => element.id == scheduleId);

    if (index != -1) {
      state.schedules.splice(index, 1);
    }
  },
  [UPDATE_SCHEDULE](state, updatedSchedule) {
    state.schedules.forEach(schedule => {
      if (schedule.id === updatedSchedule.id) {
        Object.keys(updatedSchedule).forEach(key => {
          schedule[key] = updatedSchedule[key];
        });
      }
    });
  },
  [ADD_TEST_TO_SCHEDULE](state, {
    scheduleId,
    testId
  }) {
    const schedule = state.schedules.find(schedule => schedule.id == scheduleId);
    if (schedule.tests.findIndex(test => test.id == testId) == -1) {
      const test = state.tests.find(test => test.id == testId);
      schedule.tests.push(test);
    }
  },
  [DELETE_TEST_FROM_SCHEDULE](state, {
    scheduleId,
    testId
  }) {
    const schedule = state.schedules.find(schedule => schedule.id == scheduleId);
    const index = schedule.tests.findIndex(test => test.id == testId);

    if (index != -1) {
      schedule.tests.splice(index, 1);
    }
  },

  [RECORD_HOOKS](state, hooks) {
    state.hooks = hooks;
  },
  [CREATE_HOOK](state, hook) {
    state.hooks.push(hook);
  },
  [DELETE_HOOK](state, hookId) {
    const index = state.hooks.findIndex(hook => hook.id == hookId);
    if (index != -1) {
      state.hooks.splice(index, 1);
    }
  },
  [ADD_TEST_TO_HOOK](state, {
    hookId,
    testId
  }) {
    const hook = state.hooks.find(hook => hook.id == hookId);
    if (hook.tests.findIndex(test => test.id == testId) == -1) {
      const test = state.tests.find(test => test.id == testId);
      hook.tests.push(test);
    }
  },

  [DELETE_TEST_FROM_HOOK](state, {
    hookId,
    testId
  }) {
    const hook = state.hooks.find(hook => hook.id == hookId);
    const index = hook.tests.findIndex(test => test.id == testId);

    if (index != -1) {
      hook.tests.splice(index, 1);
    }
  },

  [UPDATE_HOOK](state, updatedHook) {
    state.hooks.forEach(hook => {
      if (hook.id === updatedHook.id) {
        Object.keys(updatedHook).forEach(key => {
          hook[key] = updatedHook[key];
        });
      }
    });
  }
}
