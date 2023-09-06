import request from '../../config/http_request'

const findAll = () => {
    return request.get('/facilityTypes')
}

const findByName = (name) => {
    return request.get(`/facilityTypes?name_like=${name}`)
}

const facilityTypeService = {
    findAll,
    findByName
}

export default facilityTypeService