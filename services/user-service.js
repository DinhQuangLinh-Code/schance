import axios from 'axios'
import APIConstant from '../configurations/api-constants'

const userService = {
    getUserFront: async () => {
        let config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        let resp = await axios.get(APIConstant.UserFrontURL,config)
        return resp.data
    }
}

export default userService
