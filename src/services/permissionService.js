import axios from "axios";

const API_URL = "http://localhost:8080/api/permissions"

export const getPermissionsService = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const createPermissionService = async (data) => {
    try {
        const response = await axios.post(API_URL, data)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const deletePermissionService = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data
    } catch (e) {
        console.log(e)
    }
}

export const editPermissionService = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data)
        return response.data
    } catch (e) {
        console.log(e)
    }
}