import { ref } from "vue";
import axios from "axios";
import api from "@/services/axios";

const API = "http://localhost:8000/";


const accessToken = ref(localStorage.getItem("access") || "");
const refreshToken = ref(localStorage.getItem("refresh") || "");
const user = ref(null);

const login = async (email, password) => {
  try {
    const res = await axios.post(`${API}token/`, { email, password });
    accessToken.value = res.data.access;
    refreshToken.value = res.data.refresh;

    localStorage.setItem("access", accessToken.value);
    localStorage.setItem("refresh", refreshToken.value);

    await fetchUser();
  } catch (error) {
    console.log("erro no login: ", error.response?.data || error.message);
    throw error;
  }
};

const fetchUser = async () => {
  try {
    if (!accessToken.value) {
      user.value = null;
      return;
    }

    const res = await api.get("/UsuarioLogado/", {
      headers: { Authorization: `Bearer ${accessToken.value}` },
    });
    user.value = res.data; 
  } catch (error) {
    console.log("erro ao buscar usuário:", error.response?.data || error.message);
    user.value = null;
  }
};

const register = async (nome, email, password, biografia) => {
  try {
    await axios.post(`${API}api/registrar/`, { nome, email, password, biografia });
    const res = await axios.post(`${API}token/`, { email, password });
    accessToken.value = res.data.access;
    localStorage.setItem("access", accessToken.value);
    await fetchUser();
    return user.value;
  } catch (error) {
    console.log("erro no registro:", error.response?.data);
    throw error;
  }
};

const logout = () => {
  accessToken.value = "";
  refreshToken.value = "";
  user.value = null;
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export function useAuth() {
  return { login, fetchUser, register, logout, user, accessToken };
}
