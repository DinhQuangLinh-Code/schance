import axios from 'axios'
import APIConstant from '../configurations/api-constants'

const companyService = {
    countFund: async () => {
        let resp = await axios.get(APIConstant.FundCountURL)
        return resp.data
    }
}

export default companyService
