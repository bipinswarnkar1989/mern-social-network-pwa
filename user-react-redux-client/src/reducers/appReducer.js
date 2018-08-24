const initialState = {
    isLoading:false,
    showAppBar:true,
    showSearchBar:false,
    appBarTitle:'TokenAuthPWA'
}

const appReducer = (currentSate = initialState, action) => {
    switch (action.type) {
        case 'SHOW_APPBAR':
             return {
                 ...currentSate,
                 isLoading:false,
                 showAppBar:true,
                 showSearchBar:false
             }
            
        case 'SHOW_SEARCHBAR':
             return {
                ...currentSate,
                isLoading:false,
                showAppBar:false,
                showSearchBar:true
             }
        
        case 'UPDATE_APP_TITLE':
             return {
                 ...currentSate,
                 appBarTitle:action.title
             }

        default:
            return currentSate;
    }
}

export default appReducer;