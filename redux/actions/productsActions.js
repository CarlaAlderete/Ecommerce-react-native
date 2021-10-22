import axios from "axios"

const productsActions = {
  getProducts: () => {
    return async (dispatch) => {
      try {
        let res = await axios.post(
          "https://cozydeco.herokuapp.com/api/products",
          {filterBy: {forSale: true}},
          { withCredentials: true }
        )
        dispatch({ type: "GET_ALL_PRODUCTS", payload: res.data.response })
        return { success: true, res: res.data.response }
      } catch (err) {
        return { success: false, res: err }
      }
    }
  },
  addProduct: (newProduct) => {
    return async (dispatch) => {
      try {
        let response = await axios.post(
          "https://cozydeco.herokuapp.com/api/product/add",
          newProduct,
          { withCredentials: true }
        )
        if (response.data.success) {
          dispatch({ type: "ADD_PRODUCT", payload: response.data.respose })
          return response
        } else {
          throw new Error(response.data.response)
        }
      } catch (error) {
        return {
          success: false,
          response: error,
        }
      }
    }
  },
  getAProduct: (id) => {
    return async (dispatch) => {
      try {
        let res = await axios.get(`https://cozydeco.herokuapp.com/api/product/${id}`)
        dispatch({ type: "GET_PRODUCT", payload: res.data.response })
        return { success: true, res: res.data.response }
      } catch (err) {
        return { success: false, res: err }
      }
    }
  },
  findAProduct: (id) => {
    return (dispatch) => {
      dispatch({ type: "FIND_A_PRODUCT", payload: id })
    }
  },
  modifyProduct: (id, stock) => {
    return async () => {
      try {
        let response = await axios.put(
          `https://cozydeco.herokuapp.com/api/product/${id}`,
          stock,
          { withCredentials: true }
        )
        if (!response.data.success)
          throw new Error("Error trying to modify the stock")
        return { success: true }
      } catch (error) {
        return { success: false }
      }
    }
  },
  getProductByCategory: (category) => {
    return (dispatch) => {
      dispatch({ type: !category ? "GET_ALL" : "GET_BY_CATEGORY", payload: category })
    }
  }
}

export default productsActions
