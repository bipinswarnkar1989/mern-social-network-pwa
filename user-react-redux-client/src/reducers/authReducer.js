const INITIAL_STATE = {
    isLoggedIn:false,
    user:null,
    isLoading:false,
    error:null,
    loaded:false,
    successMsg:null
}

const authReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REQUEST_LOGIN':
            return {
              ...currentState,
              isLoading:true,
              successMsg:null
            }

        case 'LOGIN_FAILED':
            return {
                ...currentState,
                isLoading:false,
                error:action.resp.message,
                isLoggedIn:false,
                user:null,
                successMsg:null
            }

        case 'LOGIN_SUCCESS':
            return {
                ...currentState,
                isLoading:false,
                isLoggedIn:true,
                error:null,
                user:action.resp.user,
                successMsg:action.resp.message
            }
        
       case 'REQUEST_AUTHENTICATION':
           return {
               ...currentState,
               isLoading:true,
               isLoggedIn:false,
               error:null,
               user:null,
               loaded:false,
               successMsg:null
           }

       case 'AUTH_SUCCESS':
          return {
            ...currentState,
            isLoading:false,
            isLoggedIn:true,
            error:null,
            user:action.resp.user,
            loaded:true,
            successMsg:action.resp.message
          }

      case 'AUTH_FAILED':
          return {
            ...currentState,
            isLoading:false,
            isLoggedIn:false,
            error:action.resp.message,
            user:null,
            loaded:true,
            successMsg:null
          }
    
      case 'FLUSH_MESSAGES':
         return {
            ...currentState,
            error:null,
            successMsg:null
        }

     case 'REQUEST_LOGOUT':
         return {
           ...currentState,
           isLoading:false,
           isLoggedIn:false,
           error:null,
           user:null,
           loaded:true,
           successMsg:null
         }

     case 'REQUEST_USER_REGISTER':
         return {
            ...currentState,
            isLoading:true,
            isLoggedIn:false,
            user:null,
            error:null,
            loaded:false,
            successMsg:null
         }
    
    case 'REGISTER_USER_FAILED':
        return {
        ...currentState,
        isLoading:false,
        isLoggedIn:false,
        user:null,
        error:action.resp.message,
        loaded:true,
        }

    case 'REGISTER_USER_SUCCESS':
        return {
        ...currentState,
        isLoading:false,
        isLoggedIn:true,
        user:action.resp.user,
        error:null,
        loaded:true,
        successMsg:action.resp.message
        }
    
        default:
            return currentState;
    }
}


export default authReducer;
