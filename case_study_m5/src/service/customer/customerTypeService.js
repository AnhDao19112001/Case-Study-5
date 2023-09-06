import request from "../../config/http_request";

const findAll = () => {
  return request.get(`/customerTypes`);
};

const customerTypeService = {
  findAll
};

export default customerTypeService;