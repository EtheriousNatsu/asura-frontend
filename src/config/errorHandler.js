import toast from '../toast/toast'

export default (error) => {
  const errorStatus = error.response.status;
  const errorData = error.response.data;

  if (is4XX(errorStatus)) {
    // 客户端错误处理
    const errorMsg = errorData.msg;
    throw errorMsg;
  } else if (is5XX(errorStatus)) {
    // 服务端错误处理
    toast.error(response.statusText);
    throw error;
  }
}



export const is4XX = (statuCode) => {
  return String(statuCode).substring(0, 1) === '4';
};

export const is5XX = (statusCode) => {
  return String(statuCode).substring(0, 1) === '5';
};
