import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import customerService from "../../service/customer/customerService";
import facilityService from "../../service/facility/facilityService";
import { useEffect, useState } from "react";
import contractService from "../../service/contract/contractService";

function ContractAddForm() {
  let navigate = useNavigate();
  const [customerList, setCustomerList] = useState();
  const [facilitiesList, setFacilitiesList] = useState();

  useEffect(() => {
    getCustomerList();
    getFacilitiesList();
  }, []);

  const getCustomerList = async () => {
    const customerData = await customerService.findAll();
    setCustomerList(customerData.data);
  };

  const getFacilitiesList = async () => {
    const facilityData = await facilityService.findAll();
    setFacilitiesList(facilityData.data);
  };

  if (!customerList || !facilitiesList) {
    return (
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    );
  }

  return (   
    <>
      <Formik
        initialValues={{
          customerId: customerList[0]?.id,
          facilitiyId: facilitiesList[0]?.id,
          contractCode: "",
          startDate: "",
          endDate: "",
          deposit: "",
          totalMoney: "",
        }}
        validationSchema={Yup.object({
          deposit: Yup.string().matches('^[1-9][\\d]*$', 'Tiền đặt cọc phải là số nguyên dương')
        })}
        onSubmit={(value, { setSubmitting }) => {
          try {
            console.log(value);
            contractService.save(value)
            toast("Thêm mới thành công");
            setSubmitting(false);
            navigate("/contract");
          } catch (error) {
            toast("Thêm mới thất bại");
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="testbox" style={{ marginTop: 70 }}>
              <div className="">
                <h1>Thêm mới hợp đồng</h1>
                <div className="item">
                  <label htmlFor="contractCode">Số hợp đồng</label>
                  <Field type="text" name="contractCode" id="contractCode" />
                </div>
                <div className="item">
                  <label htmlFor="customerId">Khách hàng</label>
                  <Field as="select" name="customerId" id="customerId">
                    {customerList.map((customer) => (
                      <option key={customer.id} value={customer.id.toString()}>
                        {customer.name}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="item">
                  <label htmlFor="facilitiyId">Dịch vụ</label>
                  <Field as="select" name="facilitiyId" id="facilitiyId">
                    {
                        facilitiesList.map((facility) => (
                      <option key={facility.id} value={facility.id.toString()}>
                        {facility.facilityName}
                      </option>
                    ))}
                  </Field>
                </div>
                <div className="item">
                  <label htmlFor="startDate">Ngày bắt đầu</label>
                  <Field
                    type="date"
                    name="startDate"
                    id="startDate"
                    required=""
                  />
                </div>
                <div className="item">
                  <label htmlFor="endDate">Ngày kết thúc</label>
                  <Field type="date" name="endDate" id="endDate" required="" />
                </div>
                <div className="item">
                  <label htmlFor="deposit">Số tiền cọc trước</label>
                  <Field type="text" name="deposit" id="deposit" />
                  <ErrorMessage
                    name="deposit"
                    component="div"
                    className="text-danger"
                  />
                </div>
                <div className="item">
                  <label htmlFor="totalMoney">Tổng số tiền thanh toán</label>
                  <Field type="text" name="totalMoney" id="totalMoney" />
                </div>
                <div className="btn-block">
                  {isSubmitting ? (
                    <Oval
                      height={80}
                      width={80}
                      color="#4fa94d"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#4fa94d"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    <>
                      <button
                        type="submit"
                        style={{ marginRight: "10px" }}
                        className="btn btn-success"
                      >
                        Thêm
                      </button>
                      <Link to="/contract" className="btn btn-primary">
                        Thoát
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ContractAddForm;
