import axios from 'axios'
import APIConstant from '../configurations/api-constants'

const registService = {
    addRegist: async param => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        let addResp = await axios.post(APIConstant.registListURL, param,config)
        return addResp.data
    }
}

export default registService
