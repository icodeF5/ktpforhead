import axios from "axios";

const BASE_URL = "http://localhost:8080";

export function getRequest(url, params){
    let options = {
        method:'GET',
        url:BASE_URL+url,
        params:params,
    }
    return axios(options).then(
        response=>{
            return response
        },
        error=>{
            return error
        }
    )
}

export function postRequest(url,params,data){
    let options = {
        method:"POST",
        url:BASE_URL+url,
        params:params,
        data:data,
        heads:{
            'Content-Type': 'application/json'
        }
    }
    return axios(options).then(
        response=>{
            return response
        },
        error=>{
            return error
        }
    )
}