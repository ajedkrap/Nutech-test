const initialState = {
  isLoading: false,
  isError: false,
  message: null,
  goodsData: [],
  pageInfo: {}
}

const goods = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_MESSAGE": {
      return {
        ...state,
        message: null
      }
    }
    case "GET_GOODS_PENDING": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "CREATE_GOODS_PENDING": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "UPDATE_GOODS_PENDING": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "DELETE_GOODS_PENDING": {
      return {
        ...state,
        isLoading: true,
      }
    }
    case "GET_GOODS_REJECTED": {
      return {
        ...state,
        isLoading: false,
        isError: true,
        goodsData: [],
        pageInfo: {}
      }
    }
    case "CREATE_GOODS_REJECTED":
    case "UPDATE_GOODS_REJECTED":
    case "DELETE_GOODS_REJECTED": {
      const { response, message } = action.payload
      return {
        ...state,
        isLoading: false,
        isError: true,
        message: response !== null ? response.data.message : message
      }
    }
    case "GET_GOODS_FULFILLED": {
      const { data, options } = action.payload.data
      return {
        ...state,
        isLoading: false,
        isError: false,
        goodsData: data,
        pageInfo: options,
      }
    }
    case "CREATE_GOODS_FULFILLED":
    case "UPDATE_GOODS_FULFILLED":
    case "DELETE_GOODS_FULFILLED": {
      const { message } = action.payload.data
      return {
        ...state,
        isLoading: false,
        isError: false,
        message
      }
    }
    default: {
      return state
    }
  }
}

export default goods