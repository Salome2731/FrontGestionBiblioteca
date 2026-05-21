import axios from "axios";

const API_URL = "http://localhost:8080/api/users"

export const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
}

export const createUser = async (data) => {
    try {
        const response = await axios.post(API_URL, data);

        if (response.status === 201) {
            return response.data.data;
        }

    } catch (error) {
        console.log("Error en el servicio", error);
        const backendError = error.response?.data;

        throw {
            message: backendError?.error?.message || "Error desconocido",
            code: backendError?.error?.code,
            details: backendError?.error?.details
        };
    }
}

export const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error en el servicio", error);
        const backendError = error.response?.data;

        throw {
            message: backendError?.error?.message || "Error al eliminar usuario",
            code: backendError?.error?.code,
            details: backendError?.error?.details
        };
    }
}

export const updateUser = async (id, data) => {
    try {
        // 1. actualizar usuario
        await axios.put(`${API_URL}/${id}`, data)
    } catch (error) {
        console.log(error);
        const backendError = error.response?.data;
        throw {
            message: backendError?.error?.message || "Error desconocido",
            code: backendError?.error?.code,
            details: backendError?.error?.details
        }
    }
}