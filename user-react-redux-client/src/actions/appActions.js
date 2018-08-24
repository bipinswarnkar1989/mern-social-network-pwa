export const showSearchBar = () => {
    return {
        type:'SHOW_SEARCHBAR'
    }
}

export const showAppBar = () => {
    return {
        type:'SHOW_APPBAR'
    }
}

export const updateAppTitle = (title) => {
    return {
        type:'UPDATE_APP_TITLE',
        title
    }
}