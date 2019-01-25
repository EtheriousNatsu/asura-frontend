import {
  login,
  register,
  sendResetPasswordEmail,
  resetPassword,
  getServices,
  updateService,
  getEnvironments,
  deleteEnvironment,
  addEnvironment,
  updateEnvironment,
  getTests,
  deleteTest,
  createTest,
  updateTest,
  getSteps,
  updateSteps,
  deleteAssociationBetweenTestAndSetup,
  createAssociationBetweenTestAndSetup,
  getSetups,
  createSetup,
  deleteSetup,
  updateSetup,
  getTeardowns,
  createTeardown,
  deleteTeardown,
  updateTeardown,
  createAssociationBetweenTestAndTeardown,
  deleteAssociationBetweenTestAndTeardown,
  createAssertion,
  deleteAssertion,
  updateAssertion,
  getAssertions,
  runSingleTest,
  runMultipleTests,
  getResults,
  getRuns
} from '../service/getData'
import {
  RECORD_USERINFO,
  SEND_RESET_PASSWORD_EMAIL,
  RESET_PASSWORD,
  RECORD_SERVICES,
  UPDATE_SERVICE,
  RECORD_ENVIRONMENTS,
  DELETE_ENVIRONMENT,
  ADD_ENVIRONMENT,
  UPDATE_ENVIRONMENT,
  RECORD_TESTS,
  UPDATA_TEST,
  DELETE_TEST,
  CREATE_TEST,
  RECORD_STEPS,
  UPDATE_STEPS,
  DELETE_SETUP_STEP,
  CREATE_SETUP_STEP,
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
  RECORD_RESULTS,
  RECORD_SUITES
} from './mutation-types'



export default {

  /**
   * 登录，并把用户信息记录到vuex
   * 
   * @param {String} email
   * @param {String} password 
   */
  async emailLogin({
    commit
  }, {
    email,
    password
  }) {
    const response = await login(email, password);
    commit(RECORD_USERINFO, response.data);
  },

  /**
   * 注册，并把用户信息存到vuex
   * 
   * @param {String} email
   * @param {String} password
   */
  async registerAccount({
    commit
  }, {
    email,
    password
  }) {
    const response = await register(email, password);
    commit(RECORD_USERINFO, response.data);
  },


  /**
   * 发送重置密码邮件，并记录到vuex
   * 
   * @param {String} email 
   */
  async sendEmailToResetPassword({
    commit
  }, email) {
    await sendResetPasswordEmail(email);
    commit(SEND_RESET_PASSWORD_EMAIL, email);
  },


  /**
   * 重置密码，并记录到vuex
   * 
   * @param {String} password1
   * @param {String} password2
   * @param {Object} params
   */
  async changePassword({
    commit
  }, {
    password1,
    password2,
    params
  }) {
    await resetPassword(password1, password2, params);
    commit(RESET_PASSWORD, true);
  },

  /**
   * 获取已登录用户的所有服务，并记录到vuex
   * 
   */
  async getAllServices({
    commit
  }) {
    const services = await getServices();
    commit(RECORD_SERVICES, services);
  },

  /**
   * 更新一个已经存在的服务，并更新vuex
   * 
   * @param {Object} service 服务
   */
  async updateThisService({
    commit
  }, service) {
    await updateService(service);
    commit(UPDATE_SERVICE, service);
  },

  /**
   * 获取用户每一个服务下的所有环境，并记录到vuex
   * 
   */
  async getAllEnvironments({
    commit
  }) {
    const environments = await getEnvironments();
    commit(RECORD_ENVIRONMENTS, environments);
  },

  /**
   * 新增环境，并更新vuex
   * 
   * @param {Object} env 环境对象
   */
  async addThisEnvironment({
    commit
  }, env) {
    const response = await addEnvironment(env);
    commit(ADD_ENVIRONMENT, response);
  },

  /**
   * 删除指定环境，并更新vuex
   * 
   * @param {Number} envId  环境id
   */
  async deleteThisEnvironment({
    commit
  }, envId) {
    await deleteEnvironment(envId);
    commit(DELETE_ENVIRONMENT, envId);
  },

  /**
   * 更新指定环境，并更新vuex
   * 
   * @param {Object} env 
   */
  async updateThisEnvironment({
    commit
  }, env) {
    const response = await updateEnvironment(env);
    commit(UPDATE_ENVIRONMENT, response);
  },

  /**
   * 获取用户每一个服务下的所有用例，并记录到vuex
   * 
   */
  async getAllTests({
    commit
  }) {
    const tests = await getTests();
    commit(RECORD_TESTS, tests);
  },

  /**
   * 更新用例，并更新vuex
   * 
   * @param {Object} test 用例对象
   */
  async updateThisTest({
    commit
  }, test) {
    await updateTest(test);
    commit(UPDATA_TEST, test);
  },

  /**
   * 创建用例，并更新vuex
   * 
   * @param {Object} test 
   */
  async createBasicTest({
    commit
  }, test) {
    const newTest = await createTest(test);
    commit(CREATE_TEST, newTest);
    return newTest;
  },

  /**
   * 删除用例
   * 
   * @param {Number} testId 用例id
   */
  async deleteThisTest({
    commit
  }, testId) {
    await deleteTest(testId);
  },

  /**
   * 批量删除用例，并更新vuex
   * 
   * @param {Array} tests 
   */
  async deleteBatchTests({
    commit
  }, tests) {
    await Promise.all(tests.map(async (testId) => {
      await deleteTest(testId);
      commit(DELETE_TEST, testId);
    }));
  },

  /**
   * 获取前置动作和后置动作的排序
   *  
   * @param {Number} testId 用例id
   */
  async getAllSteps({
    commit
  }, testId) {
    const steps = await getSteps(testId);
    commit(RECORD_STEPS, steps);
  },


  /**
   * 
   * 更新steps,并记录到vuex
   * 
   * @param {Object} steps 
   */
  async updateThisSteps({
    commit
  }, steps) {
    const newSteps = await updateSteps(steps);
    commit(UPDATE_STEPS, newSteps);
  },

  /**
   * 删除用例与前置动作的关系， 并更新vuex
   * 
   * @param {Number} setupId
   * @param {Number} testId
   */
  async deleteSetupStep({
    commit
  }, {
    setupId,
    testId
  }) {
    await deleteAssociationBetweenTestAndSetup(setupId, testId);
    commit(DELETE_SETUP_STEP, {
      setupId,
      testId
    });
  },

  /**
   * 获取用户每一个服务下的前置动作,并记录到vuex
   * 
   */
  async getAllSetups({
    commit
  }) {
    const setups = await getSetups();
    commit(RECORD_SETUPS, setups);
  },

  /**
   * 创建用例与前置动作的关联关系，并更新vuex，
   * 
   * @param {Number} setupId 
   * @param {Number} testId 
   */
  async createNewSetupStep({
    commit
  }, {
    setupId,
    testId
  }) {

    const step = await createAssociationBetweenTestAndSetup(setupId, testId);
    commit(CREATE_SETUP_STEP, {
      step: step,
      testId: testId
    });
  },

  /**
   * 新增前置动作，并记录到vuex
   * 
   * @param {Object} setup 
   */
  async createNewSetup({
    commit
  }, setup) {
    const newSetup = await createSetup(setup);
    commit(CREATE_SETUP, newSetup);
    return newSetup;
  },

  /**
   * 删除前置动作，并更新vuex
   * 
   * @param {Number} setupId 
   */
  async deleteThisSetup({
    commit
  }, setupId) {
    await deleteSetup(setupId);
    commit(DELETE_SETUP, setupId);
  },

  /**
   * 更新前置动作，并更新vuex
   * 
   * @param {Object} setup 
   */
  async updateThisSetup({
    commit
  }, setup) {
    const newSetup = await updateSetup(setup);
    commit(UPDATE_SETUP, newSetup);
  },

  /**
   * 获取用户每一个服务下的后置动作,并记录到vuex
   * 
   */
  async getAllTeardowns({
    commit
  }) {
    const teardowns = await getTeardowns();
    commit(RECORD_TEARDOWNS, teardowns);
  },


  /**
   * 创建后置动作，并记录到vuex
   * 
   * @param {Object} teardown 
   */
  async createNewTeardown({
    commit
  }, teardown) {
    const newTeardown = await createTeardown(teardown);
    commit(CREATE_TEARDOWN, newTeardown);
    return newTeardown;
  },

  /**
   * 删除后置动作，并更新vuex
   * 
   * @param {Number} teardownId 
   */
  async deleteThisTeardown({
    commit
  }, teardownId) {
    await deleteTeardown(teardownId);
    commit(DELETE_TEARDOWN, teardownId);
  },

  async updateThisTeardown({
    commit
  }, teardown) {
    const newTeardown = await updateTeardown(teardown);
    commit(UPDATE_TEARDOWN, newTeardown);
  },

  /**
   * 创建用例和后置动作关联关系，并更新vuex
   * 
   */
  async createNewTeardownStep({
    commit
  }, {
    teardownId,
    testId
  }) {
    const step = await createAssociationBetweenTestAndTeardown(teardownId, testId);
    commit(CREATE_TEARDOWN_STEP, {
      step: step,
      testId: testId
    });
  },

  /**
   * 删除用例和后置动作的关联关系，并更新vuex
   * 
   */
  async deleteTeardownStep({
    commit
  }, {
    teardownId,
    testId
  }) {
    await deleteAssociationBetweenTestAndTeardown(teardownId, testId);
    commit(DELETE_TEARDOWN_STEP, {
      teardownId,
      testId
    })
  },

  /**
   * 创建断言，并更新vuex
   * 
   * @param {Object} assertion 
   */
  async createThisAssertion({
    commit
  }, assertion) {
    const newAssertion = await createAssertion(assertion);
    commit(CREATE_ASSERTION, newAssertion);
    return newAssertion;
  },

  /**
   * 删除断言，并更新vuex
   * 
   * @param {Number} assertionId 
   */
  async deleteThisAssertion({
    commit
  }, assertionId) {
    await deleteAssertion(assertionId);
    commit(DELETE_ASSERTION, assertionId);
  },

  /**
   * 更新断言，并更新vuex
   * 
   * @param {Object} assertion 
   */
  async updateThisAssertion({
    commit
  }, assertion) {
    const newAssertion = await updateAssertion(assertion);
    commit(UPDATE_ASSERTION, newAssertion);
  },

  /**
   * 获取所有断言
   * 
   */
  async getAllAssertions({
    commit
  }) {
    const assertions = await getAssertions();
    commit(RECORD_ASSERTIONS, assertions);
  },

  /**
   * 运行单个用例
   * 
   * @param {Number} testId
   * @param {Object} data
   */
  async runTest({
    commit
  }, {
    testId,
    data
  }) {
    await runSingleTest(testId, data);
  },

  /**
   * 运行多个用例
   * 
   * @param {Number} serviceId
   * @param {Object} data
   */
  async runTests({
    commit
  }, {
    serviceId,
    data
  }) {
    await runMultipleTests(serviceId, data);
  },

  /**
   * 获取用户所有用例结果，并记录到vuex
   * 
   */
  async getAllResults({
    commit
  }) {
    const results = await getResults();
    commit(RECORD_RESULTS, results);
  },

  /**
   * 获取用户所有套件，并记录到vuex
   * 
   */
  async getAllRuns({
    commit
  }) {
    const runs = await getRuns();
    commit(RECORD_SUITES, runs);
  }
}
