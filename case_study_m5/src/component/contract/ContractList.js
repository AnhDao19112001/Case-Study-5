import contractService from "../../service/contract/contractService";
import customerService from "../../service/customer/customerService";
import facilityService from "../../service/facility/facilityService";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { Formik, Form, Field } from "formik";
import { Oval } from "react-loader-spinner";

function ContractList() {
  const [contractList, setContractList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  let stt = itemOffset;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % contractList.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getContractList();
    getCustomerList();
    getFacilitiesList();
  }, []);

  const getContractList = async () => {
    const contractData = await contractService.findAll();
    setContractList(contractData.data);
  };

  const getCustomerList = async () => {
    const customerData = await customerService.findAll();
    setCustomerList(customerData.data);
  };

  const getFacilitiesList = async () => {
    const facilityData = await facilityService.findAll();
    setFacilitiesList(facilityData.data);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(contractList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(contractList.length / itemsPerPage));
    let firstPage = document.querySelector(".page-previous");
    let lastPage = document.querySelector(".page-next");
    if (firstPage != null && lastPage != null) {
      if (itemOffset === 0) {
        if (endOffset >= contractList.length) {
          firstPage.style.display = "none";
          lastPage.style.display = "none";
        } else {
          firstPage.style.display = "none";
          lastPage.style.display = "block";
        }
      } else if (endOffset > contractList.length) {
        firstPage.style.display = "block";
        lastPage.style.display = "none";
      } else {
        firstPage.style.display = "block";
        lastPage.style.display = "block";
      }
    }
  }, [itemOffset, contractList]);

  if (contractList.length === 0) {
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
    )
  }

  return (
    <>
      <div style={{ maxWidth: 2000, marginTop: 70 }}>
        <div className="heading-img">
        </div>
        <div className="room container">
          <div
            className="text-center"
            style={{
              fontSize: 30,
              color: "#cbbe73",
              textAlign: "left",
              fontFamily: "Playfair Display",
              fontWeight: 700,
              fontStyle: "normal",
              marginBottom: "20px",
            }}
          >
            Danh sách hợp đồng
          </div>
          <div
            className="element-button mb-5"
            style={{ display: "inline-block" }}
          >
            <Link
              className="btn btn-add btn-sm bg-success text-white"
              to="/contract-add"
            >
              <i className="fas fa-plus" />
              Tạo mới hợp đồng
            </Link>
          </div>
          <Formik
            initialValues={{
              search: "",
            }}
            onSubmit={(values) => {
              const getContractsByName = async () => {
                const contractData = await contractService.findByContractCode(
                  values.search
                );
                setContractList(contractData.data);
              };
              getContractsByName();
            }}
          >
            <Form
              className="col-4"
              style={{ float: "right", width: "100%", padding: "0" }}
            >
              <div className="search-btn">
                <div className="input-group">
                  <Field
                    style={{ border: "1px solid" }}
                    className="form-control"
                    type="search"
                    name="search"
                    id="search"
                    placeholder="Tìm kiếm"
                  />
                  <span className="input-group-append">
                    <button
                      style={{ border: "1px solid" }}
                      className="btn bg-white"
                      type="submit"
                    >
                      <i className="fa fa-search"></i>
                    </button>
                  </span>
                </div>
              </div>
            </Form>
          </Formik>
          <div className="row">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Số hợp đồng</th>
                  <th scope="col">Khách hàng</th>
                  <th scope="col">Dịch vụ</th>
                  <th scope="col">Ngày bắt đầu</th>
                  <th scope="col">Ngày kết thúc</th>
                  <th scope="col">Số tiền cọc trước</th>
                  <th scope="col">Tổng số tiền thanh toán</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((contract) => (
                  <tr key={++stt}>
                    <th scope="row">{contract.id}</th>
                    <td>{contract.contractCode}</td>
                    <td>
                      {
                        customerList.filter(
                          (customer) => customer.id === contract.customerId
                        )[0]?.name
                      }
                    </td>
                    <td>
                      {
                        facilitiesList.filter(
                          (facility) => facility.id === contract.facilitiyId
                        )[0]?.facilityName
                      }
                    </td>
                    <td>{contract.startDate}</td>
                    <td>{contract.endDate}</td>
                    <td>{contract.deposit}</td>
                    <td>{contract.totalMoney}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="d-grid">
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={pageCount}
              previousLabel="< "
              renderOnZeroPageCount={null}
              containerClassName="pagination"
              pageLinkClassName="page-num"
              nextLinkClassName="page-next"
              previousLinkClassName="page-previous"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ContractList;
