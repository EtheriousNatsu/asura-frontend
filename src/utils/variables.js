/**
 * 判断变量否被数组中的其他变量覆盖
 * 
 * @param {Array} variables 
 * @param {Object} variable2 
 * @param {String} key1 
 * @param {String} key2
 */
export const isOverwrite = (variables, variable2, key1 = "key", key2 = "key") => {
  return variables.find(variable1 => variable1[key1] === variable2[key2]) ? true : false;
};
