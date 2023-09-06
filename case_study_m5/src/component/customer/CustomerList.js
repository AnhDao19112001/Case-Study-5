import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import customerService from "../../service/customer/customerService";
import customerTypeService from "../../service/customer/customerTypeService";
import ModalDelete from "../modal/modalDelete";
import { Formik, Form, Field } from "formik";
import ReactPaginate from "react-paginate";

function CustomerList() {
  const [customerList, setCustomerList] = useState([]);
  const [customerType, setCustomerType] = useState([]);
  const [deletedId, setDeleteId] = useState(0);
  const [deletedName, setDeleteName] = useState("");
  const [deletedType, setDeleteType] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;
  let stt = itemOffset;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(customerList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(customerList.length / itemsPerPage));
    let firstPage = document.querySelector(".page-next");
    let lastPage = document.querySelector(".page-previous");
    if (firstPage != null && lastPage != null) {
      if (itemOffset === 0) {
        if (endOffset >= customerList.length) {
          firstPage.style.display = "none";
          lastPage.style.display = "none";
        } else {
          firstPage.style.display = "none";
          lastPage.style.display = "block";
        }
      } else if (endOffset > customerList.length) {
        firstPage.style.display = "block";
        lastPage.style.display = "none";
      } else {
        firstPage.style.display = "block";
        lastPage.style.display = "block";
      }
    }
  }, [itemOffset, itemsPerPage, customerList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % customerList.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getCustomerList();
    getCustomerTypeList();
  }, []);

  const getCustomerList = async () => {
    const customerData = await customerService.findByName({ search: "" });
    setCustomerList(customerData.data);
  };

  const getCustomerTypeList = async () => {
    const customerTypeData = await customerTypeService.findAll();
    setCustomerType(customerTypeData.data);
  };

  const transferInfo = (id, name, type) => {
    setDeleteId(id);
    setDeleteName(name);
    setDeleteType(type);
  };

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
              textAlign: "center",
              fontFamily: "Playfair Display",
              fontWeight: 700,
              fontStyle: "normal",
              marginBottom: "20px",
            }}
          >
            Danh sách khách hàng
          </div>
          <div
            className="element-button mb-5"
            style={{ display: "inline-block" }}
          >
            <Link
              className="btn btn-add btn-sm bg-success text-white"
              to="/customer-add"
            >
              <i className="fas fa-plus"></i>
              Tạo mới khách hàng
            </Link>
          </div>
          <Formik
            initialValues={{
              search: "",
            }}
            onSubmit={(values) => {
              const getCustomersByName = async () => {
                const customerData = await customerService.findByName(
                  values.search
                );
                setCustomerList(customerData.data);
              };
              getCustomersByName();
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
            <table
              className="table table-striped"
              style={{ boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" }}
            >
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Họ Tên</th>
                  <th scope="col">Ngày sinh</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Số CMND</th>
                  <th scope="col">Số Điện Thoại</th>
                  <th scope="col">Email</th>
                  <th scope="col">Loại khách</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Chức năng</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((customer) => (
                  <tr key={customer.id}>
                    <th scope="row">{++stt}</th>
                    <td>{customer.name}</td>
                    <td>{customer.dateOfBirth}</td>
                    <td>{parseInt(customer.gender) === 0 ? "nam" : "nữ"}</td>
                    <td>{customer.identityNumb}</td>
                    <td>{customer.phoneNumb}</td>
                    <td>{customer.email}</td>
                    <td>
                      {
                        customerType.filter(
                          (type) => type.id === parseInt(customer.typeId)
                        )[0]?.name
                      }
                    </td>
                    <td>{customer.address}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() =>
                          transferInfo(
                            customer.id,
                            customer.name,
                            customer.customer
                          )
                        }
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <Link
                        className="btn btn-primary btn-sm edit"
                        to={`/customer-edit/${customer.id}`}
                      >
                        <i
                          className="fas fa-edit"
                          style={{ padding: "7px 3px" }}
                        ></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ModalDelete
            id={deletedId}
            name={deletedName}
            type={deletedType}
            onCompletedDelete={getCustomerList}
          />
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
              nextLinkClassName="page-previous"
              previousLinkClassName="page-next"
              activeClassName="active"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerList;
