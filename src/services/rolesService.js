import axios from "axios";

const API_URL = "http://localhost:8080/api/roles"

export const getRoles = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.log(error);
        const backendError = error.response.data;

        throw {
            message: backendError.error.message || "Error desconocido",
        }
    }
}

export const createRoleService = async (data) => {
    try {
        const response = await axios.post(API_URL, data);
        console.log("response", response.data);
        return response.data;
    }catch(error) {
        console.log("e", error);
        const backendError = error.response.data;

        if (error.status === 400) {
            throw {
                message: backendError.error.message || "Error desconocido",
                status: error.status,
            }
        }
        throw {
            message: backendError.error.message || "Error desconocido",
        }
    }
}

export const updateRoleService = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        const backendError = error.response.data;
        console.log("ERROR", error)
        if (error.status === 400) {
            throw {
                message: backendError.error.message || "Error desconocido",
                status: error.status,
            }
        }
        throw {
            message: backendError.error.message || "Error desconocido",
        }
    }
}

export const deleteRoleService = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        const backendError = error.response.data;
        throw {
            message: backendError.error.message || "Error desconocido",
        }
    }
}

export const setRolePermissionsService = async (roleId, data) => {
    return await axios.put(`/roles/${roleId}/permissions`, data);
};