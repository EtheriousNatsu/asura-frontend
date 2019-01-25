import {
  RANDOMGENERATOROPTIONS,
  TEARDOWNGENOPTIONS,
  SETUPGENERATOROPTIONS
} from "@/constant/steps";


/**
 * 返回生成器变量描述
 * 
 * @param {String} genType 
 * @param {Object} variable 
 */
export const getGenVariableDesc = (genType, variable) => {
  const fnString = 'get' + getGeneratorOption(genType).type + 'VariableDesc'
  const fn = window[fnString];

  if (typeof fn === 'function') {
    return fn.apply(null, [variable]);
  }
};


/**
 * 返回随机生成器变量描述
 * 
 * @param {Object} variable
 * @returns {String}
 */
export const getRandomGeneratorVariableDesc = (variable) => {
  const text = RANDOMGENERATOROPTIONS.find(option => option.type === variable.type).text;

  return 'Random ' + text;
};

/**
 * 返回http生成器变量描述
 * 
 * @param {Object} variable 
 * @returns {String}
 */
export const getHttpReqGeneratorVariableDesc = (variable) => {
  let desc = 'Select ';

  if (variable.selectorType === 'PlainTextSelector') {
    desc += 'response text';
  } else {
    desc += variable.selector;
  }
  desc += ' from ';
  desc += variable.from;

  return desc;
};

/**
 * 根据生成器的类型，返回生成器的option对象
 * 
 * @param {String} genType 生成器类型
 * @returns {Object}
 */
export const getGeneratorOption = (genType) => {
  const options = [].concat(SETUPGENERATOROPTIONS, TEARDOWNGENOPTIONS);

  return options.find(option => option.value === genType);
};


// 注册到window
window.getRandomGeneratorVariableDesc = getRandomGeneratorVariableDesc;
window.getHttpReqGeneratorVariableDesc = getHttpReqGeneratorVariableDesc;
