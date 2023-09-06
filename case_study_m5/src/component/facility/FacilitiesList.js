import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import facilityService from "../../service/facility/facilityService";
import facilityTypeService from '../../service/facility/facilityTypeService'
import ModalDelete from "../modal/modalDelete";
import ReactPaginate from "react-paginate";
import { Formik, Form, Field } from "formik";

function FacilitiesList() {
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [facilityTypeList, setFacilityTypeList] = useState([])
  const [deletedId, setDeleteId] = useState(0);
  const [deletedName, setDeleteName] = useState("");
  const [deletedType, setDeleteType] = useState("");
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(facilitiesList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(facilitiesList.length / itemsPerPage));
    let firstPage = document.querySelector(".page-next");
    let lastPage = document.querySelector(".page-previous");
    if (firstPage != null && lastPage != null) {
      if (itemOffset === 0) {
        if (endOffset >= facilitiesList.length) {
          firstPage.style.display = "none";
          lastPage.style.display = "none";
        } else {
          firstPage.style.display = "none";
          lastPage.style.display = "block";
        }
      } else if (endOffset > facilitiesList.length) {
        firstPage.style.display = "block";
        lastPage.style.display = "none";
      } else {
        firstPage.style.display = "block";
        lastPage.style.display = "block";
      }
    }
  }, [itemOffset, itemsPerPage, facilitiesList]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % facilitiesList.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    getAllFacilities();
    getAllFacilityType()
  }, []);

  const getAllFacilities = async () => {
    const facilityData = await facilityService.findByName({ search: "" });
    setFacilitiesList(facilityData.data);
  };

  const getAllFacilitiesByType = async () => {
    const typeSelectData = document.getElementById('type-select').value
    const facilityTypeData = await facilityService.findByType(typeSelectData)
    setFacilitiesList(facilityTypeData.data)
  }

  const getAllFacilityType = async () => {
    const facilityTypeData = await facilityTypeService.findAll()
    setFacilityTypeList(facilityTypeData.data)
  }


  const transferInfo = (id, name, type) => {
    setDeleteId(id);
    setDeleteName(name);
    setDeleteType(type);
  };

  return (
    <>
      <div style={{ maxWidth: "2000px", marginTop: "70px" }}>
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
            Danh sách dịch vụ
          </div>
          <div style={{ display: "flex" , justifyContent: 'space-between'}}>
            <div
              className="element-button mb-5"
              style={{ display: "inline-block" }}
            >
              <Link
                className="btn btn-add btn-sm bg-success text-white"
                to="/facility-add"
              >
                <i className="fas fa-plus"></i>
                Tạo mới dịch vụ
              </Link>
            </div>
            <div>
              <select id="type-select" onChange={() => getAllFacilitiesByType()}>
                <option value=''>---Chọn loại dịch vụ---</option>
                {facilityTypeList?.map((type) => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
            <Formik
              initialValues={{
                search: "",
              }}
              onSubmit={(values) => {
                const getFacilitiesByName = async () => {
                  const facilityData = await facilityService.findByName(
                    values.search
                  );
                  setFacilitiesList(facilityData.data);
                };
                getFacilitiesByName();
              }}
            >
              <Form
                className="col-4"
                style={{ width: "100%", padding: "0" , boxShadow: 'none'}}
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
          </div>

          <div className="row">
            {currentItems.map((facility, index) => (
              <div
                className="col-4 mb-3"
                key={index}
                style={{ padding: "0 8px" }}
              >
                <div
                  className="card"
                  style={{ boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)" }}
                >
                  <img
                    src={facility.facilityImg}
                    className="card-img-top"
                    alt="..."
                    width={370}
                    height={239}
                  />
                  <div className="card-body">
                    <h5 className="card-title" style={{ fontSize: "18px" }}>
                      {facility.facilityName}
                    </h5>
                    <p className="card-text mb-3">{facility.facilityArea}</p>
                    <button
                      style={{ marginRight: "5px", width: 40, height: 40 }}
                      type="button"
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() =>
                        transferInfo(
                          facility.id,
                          facility.facilityName,
                          facility.facility
                        )
                      }
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <Link
                      className="btn btn-primary btn-sm edit"
                      to={`/facility-edit/${facility.id}`}
                    >
                      <i
                        className="fas fa-edit"
                        style={{ padding: "8px 3px", fontSize: "15px" }}
                      ></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <ModalDelete
            id={deletedId}
            name={deletedName}
            type={deletedType}
            getList={() => {
              getAllFacilities();
            }}
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

export default FacilitiesList;
