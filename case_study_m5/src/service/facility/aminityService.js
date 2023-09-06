import request from '../../config/http_request'

const findAll = () => {
    return request.get('/aminities')
}

const aminityService = {
    findAll
}

export default aminityService