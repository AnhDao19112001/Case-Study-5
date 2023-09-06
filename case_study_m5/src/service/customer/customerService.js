import request from "../../config/http_request";

const findAll = () => {
    return request.get(`/customers`);
};

const findByName = (search) => {
    return request.get(`/customers?name_like=${search}`);
};

const save = (customer) => {
    request.post("/customers", {...customer});
};

const remove = (id) => {
    return request.delete(`/customers/${id}`);
};

const findById = (id) => {
    return request.get(`customers/${id}`);
};

const edit = (customer) => {
    request.put(`/customers/${customer.id}`, {...customer});
};

const customerService = {
    findAll,
    save,
    remove,
    findById,
    edit,
    findByName,
};

export default customerService;
