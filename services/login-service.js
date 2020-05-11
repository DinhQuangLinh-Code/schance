import axios from 'axios'
import APIConstant from '../configurations/api-constants'

const loginService = {
    login: async (fb_token, param) => {
        let resp = await axios.post(APIConstant.LoginURL + '/?fb_token=' + fb_token, param)
        return resp.data
    }
}

export default loginService
