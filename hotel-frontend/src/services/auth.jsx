import axios from "axios";

const URL = "http://localhost:3000/auth";

const login = async (email, password) => {
    const result = await axios.post(`${URL}/login`,
        { email, password },
        { withCredentials: true });

    return result

}

const logout = async () => {
    const result = await axios.post(`${URL}/logout`, {}, { withCredentials: true });
    return result;
}

const register_service = async (name, lastname, email, password) => {

    const result = await axios.post(`${URL}/register`,
        { name, lastname, email, password },
        { withCredentials: true }

    );
    return result;

}

const authService = {
    login,
    register_service,
    logout
};

export default authService;