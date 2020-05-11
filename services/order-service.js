import axios from 'axios'
import APIConstant from '../configurations/api-constants'

const orderService = {
    getOrder: async () => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        let resp = await axios.get(APIConstant.OrderListURL,config)
        return resp.data
    },
    createOrder: async param => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        let resp = await axios.post(APIConstant.OrderListURL, param,config)
        return resp.data
    },
    editOrder: async (id, param) => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        let resp = await axios.put(APIConstant.OrderListURL + '/' + id + '/cancel', param,config)
        return resp.data
    }
}

export default orderService
