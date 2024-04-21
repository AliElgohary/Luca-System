import { AUTH_ENDS, AUTH_STARTS, SET_ACCESS_TOKEN } from "../constants/actionTypes"

export const setAccessTokenAction = (token) => ({
    type: SET_ACCESS_TOKEN,
    payload: token
})

export const startAuthAction = () => ({
    type : AUTH_STARTS
})


export const endAuthAction = () => ({
    type : AUTH_ENDS
})