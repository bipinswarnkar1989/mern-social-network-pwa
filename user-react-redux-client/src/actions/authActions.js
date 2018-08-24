export const login = (payload,history) => {
    return {
        type:'REQUEST_LOGIN',
        history,
        payload
    }
}

export const authenticate = (token,history) => {
    return {
        type:'REQUEST_AUTHENTICATION',
        token,
        history
    }
}

export const logout = () => {
    return {
        type:'REQUEST_LOGOUT'
    }
}

export const updateUser = (payload,history) => {
    return {
        type:'REQUEST_UPDATE_USER',
        history,
        payload
    }
}

export const registerUser = (payload,history) => {
    return {
        type:'REQUEST_USER_REGISTER',
        history,
        payload
    }
}