import VueJwtDecode from "vue-jwt-decode";


export function getAuthToken() {
    return localStorage.getItem("user")    
}

export function isLoggedIn() {
    let authToken = getAuthToken()
    return !!authToken
}

export function getUserInfo() {
    if (isLoggedIn()) {
        return VueJwtDecode.decode(getAuthToken())
    }
}

/*function getTokenExpirationDate(encodedToken) {
    let token = VueJwtDecode.decode(encodedToken)
    if (!token.exp) {
        return null
    }
  
    let date = new Date(0)
    date.setUTCSeconds(token.exp)
  
    return date
}*/
  
/*function isTokenExpired(token) {
    let expirationDate = getTokenExpirationDate(token)
    return expirationDate < new Date()
}*/