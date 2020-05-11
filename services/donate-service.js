import axios from 'axios'
import APIConstant from '../configurations/api-constants'

const donateService = {
    getDonate: async () => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        let resp = await axios.get(APIConstant.DonateListURL, config)
        return resp.data
    },
    addDonate: async param => {
        let addResp = await axios.post(APIConstant.DonateListURL, param)
        return addResp.data
    }
}

export default donateService
