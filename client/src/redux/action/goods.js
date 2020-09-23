import http from "../../helper/http"
import qs from "querystring"

const { REACT_APP_URL } = process.env

export const getGoods = (param = null) => {
  const params = `${qs.stringify(param)}`
  const url = `${REACT_APP_URL}goods?${params}`
  return {
    type: 'GET_GOODS',
    payload: http().get(url)
      .then(res => res)
      .catch(error => {
        if (error) {
          throw error
        }
      })
  }
}
export const createGoods = (data) => {
  console.log(data)
  const url = `${REACT_APP_URL}goods`
  return {
    type: 'CREATE_GOODS',
    payload: http().post(url, data)
      .then(res => {
        const { status, message } = res.data
        if (!status) {
          throw new Error(message)
        }
        return res
      })
      .catch(error => {
        if (error) {
          throw error
        }
      })
  }
}
export const updateGoods = (data, id) => {
  const url = `${REACT_APP_URL}goods/${id}`
  return {
    type: 'UPDATE_GOODS',
    payload: http().patch(url, data)
      .then(res => {
        const { status, message } = res.data
        if (!status) {
          throw new Error(message)
        }
        return res
      })
      .catch(error => {
        if (error) {
          throw error
        }
      })
  }
}
export const deleteGoods = (id) => {
  const url = `${REACT_APP_URL}goods/${id}`
  return {
    type: 'DELETE_GOODS',
    payload: http().delete(url)
      .then(res => {
        const { status, message } = res.data
        if (!status) {
          throw new Error(message)
        }
        return res
      })
      .catch(error => {
        if (error) {
          throw error
        }
      })
  }
}
export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE",
  }
}