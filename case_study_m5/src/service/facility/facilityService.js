import request from "../../config/http_request";

const findAll = () => {
  return request.get("/facilities");
};

const save = (facility) => {
  request.post("/facilities", { ...facility });
};

const findByName = (search) => {
  return request.get(`/facilities?facilityName_like=${search}`);
};

const findByType = (type) => {
  return request.get(`/facilities?facilityTypeId_like=${type}`);
};

const remove = (id) => {
  return request.delete(`/facilities/${id}`);
};

const edit = (facility) => {
  request.put(`/facilities/${facility.id}`, { ...facility });
};

const findById = (id) => {
  return request.get(`/facilities/${id}`);
};

const findLimit3 = () => {
  return request.get("/facilities?_limit=3");
};

const facilityService = {
  findAll,
  save,
  remove,
  edit,
  findById,
  findByName,
  findLimit3,
  findByType,
};

export default facilityService;
