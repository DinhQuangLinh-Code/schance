import axios from 'axios'
import APIConstant from '../configurations/api-constants'

const projectService = {
    getProjects: async () => {
        let resp = await axios.get(APIConstant.ProjectListURL)
        return resp.data
    }
}

export default projectService
