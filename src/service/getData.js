import fetch from '../config/fetch'


/**
 * 注册
 * 
 * @param {String} email 邮箱地址
 * @param {String} password 密码
 */
export const register = (email, password) => fetch('/signup', {
  email,
  password
}, 'post');


/**
 * 登录
 * 
 * @param {String} email 邮箱地址
 * @param {String} password 密码
 */
export const login = (email, password) => fetch('/login', {
  email,
  password
}, 'post');

/**
 * 发送重置密码邮件
 * 
 * @param {String} email 
 */
export const sendResetPasswordEmail = (email) => fetch('/reset', {
  email
}, 'post');

/**
 * 重置密码
 * 
 * @param {String} password1 
 * @param {String} password2 
 */
export const resetPassword = (password1, password2, {
  token,
  uidb64
}) => fetch(`/reset/${token}/${uidb64}`, {
  password1,
  password2
}, 'post');

/**
 * 导入 service
 * 
 * @param {Number} account
 * @param {String} type
 * @param {String} url 
 */
export const newService = (account, type, url) => fetch('imports', {
  account,
  type,
  url
}, 'post');

/**
 * 获取用户所有服务
 */
export const getServices = () => fetch('/services');


/**
 * 删除服务
 * 
 * @param {Number} serviceId 
 */
export const deleteService = (serviceId) => fetch(`/services/${serviceId}`, undefined, 'delete');


/**
 * 更新服务
 * 
 * @param {Object} service 
 */
export const updateService = (service) => fetch(`/services/${service.id}`, service, 'put');


/**
 * 获取用户每一个服务下的所有环境
 */
export const getEnvironments = () => fetch('/environments');

/**
 * 更新指定环境
 * 
 * @param {Object} env 
 */
export const updateEnvironment = (env) => fetch(`/environments/${env.id}`, env, 'put');


/**
 * 删除环境
 * 
 * @param {Number} envId 
 */
export const deleteEnvironment = (envId) => fetch(`/environments/${envId}`, undefined, 'delete');


/**
 * 新增环境
 * 
 * @param {Object} environment 
 */
export const addEnvironment = (environment) => fetch('/environments', environment, 'post');


/**
 * 获取用户每一个服务下的所有用例
 */
export const getTests = () => fetch('/tests');


/**
 * 创建用例
 * 
 * @param {Object} test 
 */
export const createTest = (test) => fetch('/tests', test, 'post');

/**
 * 删除用例
 * 
 * @param {Number} testId 
 */
export const deleteTest = (testId) => fetch(`/tests/${testId}`, undefined, 'delete');

/**
 * 更新用例
 * 
 * @param {Object} test
 */
export const updateTest = (test) => fetch(`/tests/${test.id}`, test, 'put');


/**
 * 运行多个用例
 * 
 * @param {Number} testId
 * @param {Object} data
 */
export const runSingleTest = (testId, data) => fetch(`tests/${testId}/run`, data, 'post');

/**
 * 
 * @param {Number} serviceId 
 * @param {Object} data 
 */
export const runMultipleTests = (serviceId, data) => fetch(`services/${serviceId}/run`, data, 'post');

/**
 * 获取前置动作和后置动作的排序
 * 
 * @param {Number} testId 
 */
export const getSteps = (testId) => fetch(`tests/${testId}/steps`);

/**
 * 更新steps
 * 
 * @param {Object} steps 
 */
export const updateSteps = (steps) => fetch(`tests/${steps.test}/steps`, steps, 'put');


/**
 * 获取用户每一个服务下的前置动作
 */
export const getSetups = () => fetch('/setups');

/**
 * 新增前置动作
 * 
 * @param {Object} setup 
 */
export const createSetup = (setup) => fetch('/setups', setup, 'post');

/**
 * 删除前置动作
 * 
 * @param {Number} setupId 
 */
export const deleteSetup = (setupId) => fetch(`/setups/${setupId}`, undefined, 'delete');

/**
 * 更新前置动作
 * 
 * @param {Object} setup 
 */
export const updateSetup = (setup) => fetch(`/setups/${setup.id}`, setup, 'put');

/**
 * 创建用例和前置动作的关联关系
 * 
 * @param {Number} setupId 
 * @param {Number} testId 
 */
export const createAssociationBetweenTestAndSetup = (setupId, testId) => fetch(`/setups/${setupId}/tests/${testId}`, undefined, 'post');

/**
 * 删除用例和前置动作的关联关系
 * 
 * @param {Number} setupId 
 * @param {Number} testId 
 */
export const deleteAssociationBetweenTestAndSetup = (setupId, testId) => fetch(`/setups/${setupId}/tests/${testId}`, undefined, 'delete');

/**
 * 获取用户每一个服务下的后置动作
 * 
 */
export const getTeardowns = () => fetch('/teardowns');


/**
 * 新增后置动作
 * 
 * @param {Object} teardown 
 */
export const createTeardown = (teardown) => fetch('/teardowns', teardown, 'post');

/**
 * 删除后置动作
 * 
 * @param {Number} teardownId 
 */
export const deleteTeardown = (teardownId) => fetch(`/teardowns/${teardownId}`, undefined, 'delete');


/**
 * 更新后置动作
 * 
 * @param {Object} teardown 
 */
export const updateTeardown = (teardown) => fetch(`/teardowns/${teardown.id}`, teardown, 'put');


/**
 * 创建用例和后置动作关联关系
 * 
 * @param {Number} teardownId 
 * @param {Number} testId 
 */
export const createAssociationBetweenTestAndTeardown = (teardownId, testId) => fetch(`/teardowns/${teardownId}/tests/${testId}`, undefined, 'post');

/**
 * 删除用例和后置动作的关联关系
 * 
 * @param {Number} teardownId 
 * @param {Number} testId 
 */
export const deleteAssociationBetweenTestAndTeardown = (teardownId, testId) => fetch(`/teardowns/${teardownId}/tests/${testId}`, undefined, 'delete');


/**
 * 创建断言
 * 
 * @param {Object} assertion 
 */
export const createAssertion = (assertion) => fetch('/assertions', assertion, 'post');


/**
 * 删除断言
 * 
 * @param {Number} assertionId 
 */
export const deleteAssertion = (assertionId) => fetch(`/assertions/${assertionId}`, undefined, 'delete');


/**
 * 更新断言
 * 
 * @param {Object} assertion 
 */
export const updateAssertion = (assertion) => fetch(`/assertions/${assertion.id}`, assertion, 'put');

/**
 * 获取所有断言
 * 
 * @param {Number} testId 
 */
export const getAssertions = (testId) => fetch('/assertions');

/**
 * 获取所有结果
 */
export const getResults = () => fetch('/results');

/**
 * 获取所有套件
 */
export const getRuns = () => fetch('testsuites');

/**
 * 获取所有定时任务
 */
export const getSchedules = () => fetch('/schedules');

/**
 * 创建定时任务
 * 
 * @param {Object} schedule 
 */
export const createSchedule = (schedule) => fetch('/schedules', schedule, 'post');

/**
 * 删除定时任务
 * 
 * @param {Number} scheduleId 
 */
export const deleteSchedule = (scheduleId) => fetch(`/schedules/${scheduleId}`, undefined, 'delete');


/**
 * 创建用例和定时任务的关系
 * 
 * @param {Number} scheduleId 
 * @param {Number} testId 
 */
export const createAssociationBetweenTestAndSchedule = (scheduleId, testId) => fetch(`/schedules/${scheduleId}/tests/${testId}`, undefined, 'post');


/**
 * 删除用例和定时任务的关系
 * 
 * @param {Number} scheduleId 
 * @param {Number} testId 
 */
export const deleteAssociationBetweenTestAndSchedule = (scheduleId, testId) => fetch(`/schedules/${scheduleId}/tests/${testId}`, undefined, 'delete');


/**
 * 更新定时任务
 * 
 * @param {Object} schedule 
 */
export const updateSchedule = (schedule) => fetch(`/schedules/${schedule.id}`, schedule, 'put');


/**
 * 获取所有hook
 */
export const getHooks = () => fetch('/hooks');

/**
 * 创建一个hook
 * 
 * @param {Object} hook 
 */
export const createHook = (hook) => fetch('/hooks', hook, 'post');


/**
 * 删除hook
 * 
 * @param {Number} hookId 
 */
export const deleteHook = (hookId) => fetch(`/hooks/${hookId}`, undefined, 'delete');


/**
 * 更新hook
 * 
 * @param {Object} hook 
 */
export const updateHook = (hook) => fetch(`/hooks/${hook.id}`, hook, 'put');


/**
 * 创建用例和hook的关系
 * 
 * @param {Number} hookId 
 * @param {Number} testId 
 */
export const createAssociationBetweenTestAndHook = (hookId, testId) => fetch(`/hooks/${hookId}/tests/${testId}`, undefined, 'post');


/**
 * 删除用例和hook关系
 * 
 * @param {Number} hookId 
 * @param {Number} testId 
 */
export const deleteAssociationBetweenTestAndHook = (hookId, testId) => fetch(`/hooks/${hookId}/tests/${testId}`, undefined, 'delete');
