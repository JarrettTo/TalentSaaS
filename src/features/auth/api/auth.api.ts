import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

const authApi = () =>  {

  const instance = axios.create({
    baseURL: BASE_URL,
    //withCredentials: true,
  })

  instance.interceptors.request.use(config => {
    let userInLocalStorage = localStorage.getItem('user')
    if (userInLocalStorage != null) {
      const accessToken = JSON.parse(userInLocalStorage).accessToken
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  })

  instance.interceptors.response.use(response => response.data)

  instance.interceptors.response.use((config) => {
    return config
   }, async (error) => {
     const originalRequest = error.config;
     console.log(error)
     if (error.response && error.response.status === 401 && !error.config._isRetry) {
      console.log('try refresh token on 401')
       originalRequest._isRetry = true;
       try {
        let userInLocalStorage = localStorage.getItem('user')
        if (userInLocalStorage != null || userInLocalStorage != undefined) {
          const refreshToken = JSON.parse(userInLocalStorage).refreshToken
          if (!refreshToken) return
  
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refreshToken: refreshToken,
          });
  
          console.log('Set user in local storage after 401', response.data.data)
          localStorage.setItem('user', JSON.stringify(response.data.data))
          return instance.request(originalRequest);
  
        }
       } catch (e) {
          localStorage.removeItem('user')
          console.log('Not authorized'); 
          window.location.href = '/login'  
        }
     }
  
     throw error
   })

   return instance
}

export default authApi()