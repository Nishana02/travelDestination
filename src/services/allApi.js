import axiosConfig from "./axiosConfig";
import { BaseUrl } from "./baseURL";


export const placeDetails=async(reqBody)=>{
    return await axiosConfig("post",`${BaseUrl}/places`,reqBody)
}

export const getPlaceDetails=async()=>{
    return await axiosConfig("get",`${BaseUrl}/places`,"")
}

export const deleteDetails=async(id)=>{
    return await axiosConfig("delete",`${BaseUrl}/places/${id}`,{})
}

export const editDetails=async(id,reqBody)=>{
    return await axiosConfig("put",`${BaseUrl}/places/${id}`,reqBody)
}