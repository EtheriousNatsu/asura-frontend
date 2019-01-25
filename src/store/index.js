import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const initialState = () => ({
  userInfo: null, // 用户信息
  token: null, // 是否登录
  emailForResetPassword: null, // 重置密码的邮箱地址
  isResetPassword: false, // 是否重置了密码
  services: [], // services列表
  environments: [], // environments列表
  tests: [], // testcases列表
  steps: null, // testcase选中的setup/teardown
  setups: [], // setups列表
  teardowns: [], // teardowns列表
  assertions: [], // assertion列表
  env: 'All', //默认执行环境
  results: [], // case result列表
  runs: [], // suite result列表
})

const state = initialState;
const vuexLocalStorage = createPersistedState({
  reducer: state => {
    const stateFilter = Object.assign({}, state);
    const blackList = ['env', 'services', 'environments', 'tests', 'steps', 'setups', 'teardowns', 'assertions', 'results', 'runs'];
    blackList.forEach((item) => {
      delete stateFilter[item]
    })
    return stateFilter;
  }
});

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  plugins: [vuexLocalStorage]
})
