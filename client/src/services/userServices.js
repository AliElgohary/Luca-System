import api from "../Api/axios"

export const apiLogin =async (username , password) => {
    return api.post("/users/login" , {username , password})
}