import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'https://test-api-met.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth', credentials)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const createStore = async (storeName) => {
  try {
    const response = await apiClient.post(`/store/${storeName}`)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const getStore = async (storeName) => {
  try {
    const response = await apiClient.get(`/store/${storeName}`)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const deleteStore = async (storeName) => {
  try {
    const response = await apiClient.delete(`/store/${storeName}`)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const getAllStores = async () => {
  try {
    const response = await apiClient.get('/stores')
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const createItem = async (itemName, storeId, itemData) => {
  try {
    const response = await apiClient.post(`/item/${itemName}`, { storeId, ...itemData })
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const getItem = async (itemName, token) => {
  try {
    const response = await apiClient.get(`/item/${itemName}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const updateItem = async (itemName, itemData) => {
  try {
    const response = await apiClient.put(`/item/${itemName}`, itemData)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const deleteItem = async (itemName) => {
  try {
    const response = await apiClient.delete(`/item/${itemName}`)
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}

export const getAllItems = async () => {
  try {
    const response = await apiClient.get('/items')
    return response.data
  } catch (error) {
    throw error.response ? error.response.data : error
  }
}
