import axios from 'axios'
import APIConstant from '../configurations/api-constants'

const productService = {
    getProducts: async () => {
        let resp = await axios.get(APIConstant.ProductListURL)
        return resp.data
    }
}

export default productService
