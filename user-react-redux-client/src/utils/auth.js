class Auth {
   setToken = async (token) => {
    localStorage.setItem('userToken', token);
   }

   getToken =  () => {
       let token = localStorage.getItem('userToken');
       return token;
   }

   removeToken = async () => {
       localStorage.removeItem('userToken');
   }
}

export default Auth;