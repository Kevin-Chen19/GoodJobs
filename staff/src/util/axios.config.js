//设置axios拦截器
import router from '@/router';
import axios from 'axios'
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
  let url = "/staffapi/refreshToken"
  console.log("refreshToken",localStorage.getItem("refeshToken"))
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
      console.log("刷新token")
      console.log(res.data.code)
      if(res.data.code === 200){
        //重新请求
        response = await axios.request(response.config);
      }
    }
  // 对响应数据做些什么
    /*const {authorization} = response.headers;
    authorization && localStorage.setItem("token",authorization);*/
  return response;
}, 
   (error)=> {
    if (error.response) {
      const { status } = error.response;
      if (status === 402 || status === 401) {
        router.push("/"); // 跳转到登录页
        return Promise.resolve(); // 返回一个 resolved 的 Promise，阻止错误继续冒泡
      }
    } else {
      console.log("Error:", error.message); // 打印其他错误信息
      return Promise.resolve();
    }
    return Promise.reject(error);
  });
export default axios;