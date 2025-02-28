import axios from 'axios'
function upload(path,ruleForm) {
  const params = new FormData()
      for (let i in ruleForm) {
        params.append(i, ruleForm[i])
      }
      console.log(params)
      return axios.post(path,params,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(res => res.data)
}

export default upload;