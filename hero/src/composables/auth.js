import { ref } from "vue";
import axios from "axios";
import api from "@/services/axios";

const API = "http://localhost:8000/"

export function useAuth(){
  const accessToken = ref(localStorage.getItem("access") || "")
  const refreshToken = ref(localStorage.getItem("refresh") || "")
  const user = ref(null)

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API}token/`, {email, password})
      accessToken.value = res.data.access
      refreshToken.value = res.data.refresh

      localStorage.setItem("access", accessToken.value)
      localStorage.setItem("refresh", refreshToken.value)

      await fetchUser()

    } catch (error) {
      console.log("erro no login: ", error.response?.data || error.message)
      throw error
    }
  }
  const fetchUser = async () => {
    const res = await axios.get(`${API}api/usuarios/`, {
      headers: {
        Authorization: `Bearer ${accessToken.value}`,
      },
    })
    user.value = res.data[0]
  }
 const register = async (nome, email, password, biografia) => {
  try {
    await axios.post(`${API}api/registrar/`, {
      nome,
      email,
      password,
      biografia
    })

    // depois de registrar, tenta logar
    const res = await axios.post(`${API}token/`, { email, password })
    accessToken.value = res.data.access
    localStorage.setItem('access_token', accessToken.value)

    user.value = { nome, email }
    return user.value
  } catch (error) {
    console.log("erro no registro:", error.response?.data)
    throw error
  }
}
  return{login, fetchUser, register, user, accessToken}
}

