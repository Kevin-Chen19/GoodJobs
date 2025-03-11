//设置axios拦截器
import router from '@/router';
import axios from 'axios'

// 创建一个 CancelToken 源，用于取消请求
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

//请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = localStorage.getItem("token");
  config.headers.Authorization = `${token}`;
  return config;
}, function (error) {
  return Promise.reject(error);
});
function getNewToken(){
  let url = "/companyapi/refreshToken"
  let token = null
  if(localStorage.getItem("refeshToken")!==null){
    token = localStorage.getItem("refeshToken")
  }
  return axios.get(url,{params:{refreshToken:token}})
}
// 响应拦截器
axios.interceptors.response.use(
  async (response) => {
    if(response.data.code === 401){
      //自动刷新token
      const res =  await getNewToken();
      if(res.data.code === 200){
        //更新token
        localStorage.setItem("token",res.data.token)
        //重新请求
        response = await axios.request(response.config);
      }else if(res.data.code === 402){
        // 取消所有未完成的请求
        source.cancel('Token expired, redirecting to login page.');
        localStorage.removeItem("token");
        localStorage.removeItem("refeshToken");
        router.push("/"); // 跳转到登录页
        return Promise.resolve(); // 返回一个 resolved 的 Promise，阻止错误继续冒泡
      }
    }
  return response;
}, 
   (error)=> {
    if (axios.isCancel(error)) {
      return Promise.resolve();
    }
    return Promise.reject(error);
  });
export default axios;