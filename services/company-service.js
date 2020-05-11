import axios from 'axios'
import APIConstant from '../configurations/api-constants'

const companyService = {
    getCompanies: async () => {
        let resp = await axios.get(APIConstant.CompanyListURL)
        return resp.data
    },
    addCompany: async param => {
        let addResp = await axios.put(APIConstant.CompanyListURL, param)
        return addResp.data
    }
}

export default companyService
