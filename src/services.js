import axios from 'axios'
import { toast } from 'vue3-toastify'

const apiClient = axios.create({
  baseURL: 'https://test-api-met.herokuapp.com/',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('register', userData)
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('auth', credentials)
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const createStore = async (storeName) => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiClient.post(`store/${storeName}`, null, {
      headers: {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const getStore = async (storeName) => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiClient.get(`store/${storeName}`, {
      headers: {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const deleteStore = async (storeName) => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiClient.delete(`store/${storeName}`, {
      headers: {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const getAllStores = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiClient.get('stores', {
      headers: {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const createItem = async (itemName, storeId, itemData) => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiClient.post(
      `item/${itemName}`,
      { storeId, ...itemData },
      {
        headers: {
          ...apiClient.defaults.headers,
          Authorization: `Bearer ${token}`,
        },
      },
    )
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const getItem = async (itemName) => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiClient.get(`item/${itemName}`, {
      headers: {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const updateItem = async (itemName, itemData) => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiClient.put(`item/${itemName}`, itemData, {
      headers: {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const deleteItem = async (itemName) => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiClient.delete(`item/${itemName}`, {
      headers: {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}

export const getAllItems = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await apiClient.get('items', {
      headers: {
        ...apiClient.defaults.headers,
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    toast.error(error.message)
  }
}
