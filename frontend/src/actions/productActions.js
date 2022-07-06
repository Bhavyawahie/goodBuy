import axios from 'axios'
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_IMAGE_UPLOAD_FAIL, PRODUCT_IMAGE_UPLOAD_REQUEST, PRODUCT_IMAGE_UPLOAD_SUCCESS} from '../constants/productConstants'
import { PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS, PRODUCT_DETAILS_FAIL} from '../constants/productConstants'
import { logout } from './userActions'

export const listProducts = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        const res = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAILS_REQUEST
        })
        const res = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_DELETE_REQUEST
        })
        const {userLogin: { userInfo }} = getState()
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        await axios.delete(`/api/products/${id}`, config)

        dispatch({
            type: PRODUCT_DELETE_SUCCESS,
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_DELETE_FAIL,
            payload: message
        })
    }
}

export const createProduct = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REQUEST
        })
        const {userLogin: { userInfo }} = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        const res = await axios.post(`/api/products/`, {} ,config)

        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: res.data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_CREATE_FAIL,
            payload: message
        })
    }
}

export const uploadProductImage = (productId ,image) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_IMAGE_UPLOAD_REQUEST
        })
        const {userLogin: {userInfo}} = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = async () => {
            const res = await axios.post(`/api/products/${productId}/image/upload`, JSON.stringify({image: reader.result}) ,config)
            dispatch({
                type: PRODUCT_IMAGE_UPLOAD_SUCCESS,
                payload: res.data
            })
        }
    } catch (error) {
        const message = error.message && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_IMAGE_UPLOAD_FAIL,
            payload: message
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_UPDATE_REQUEST
        })
        const {userLogin: { userInfo }} = getState()
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        const res = await axios.put(`/api/products/${product._id}`, product ,config)

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: res.data
        })
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS, 
            payload: res.data 
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message
        })
    }
}

export const createProductReview = (productId, review ) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_REQUEST
        })
        const {userLogin: { userInfo }} = getState()
        const config = {
            headers: {
                'Content-type' : 'application/json',
                Authorization: `Bearer ${userInfo.token}` 
            }
        }
        await axios.post(`/api/products/${productId}/reviews`, review ,config)

        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}