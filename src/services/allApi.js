import axiosConfig from "./axiosConfig";

export const placeDetails=async(reqBody)=>{
    return await axiosConfig("post","http://localhost:3000/places",reqBody)
}

export const getPlaceDetails=async()=>{
    return await axiosConfig("get","http://localhost:3000/places","")
}

export const deleteDetails=async(id)=>{
    return await axiosConfig("delete",`http://localhost:3000/places/${id}`,{})
}

export const editDetails=async(id,reqBody)=>{
    return await axiosConfig("put",`http://localhost:3000/places/${id}`,reqBody)
}