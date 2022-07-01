
export const BASE_API_URL = 
    process.env.NODE_ENV === 'production' 
        ? 'https://pet-social-club.herokuapp.com/api' : 'http://localhost:5005/api'

export const AUTH_API_URL = 
process.env.NODE_ENV === 'production' 
    ? 'https://pet-social-club.herokuapp.com/auth' : 'http://localhost:5005/auth'