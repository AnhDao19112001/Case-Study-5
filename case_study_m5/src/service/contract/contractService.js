import request from "../../config/http_request";
import axios from "axios";

const findAll = async () => {
  try {
    return await axios.get(`https://localhost:8081/contracts`)
  }catch (error){
    return error
  }
};

const findByContractCode = async (search) => {
  const rs = await request.get(`/contracts?contractCode_like=${search}`);
  return rs
};

const save = (contract) => {
  request.post("/contracts", { ...contract });
};

const contractService = {
  findAll,
  save,
  findByContractCode,
};

export default contractService;
