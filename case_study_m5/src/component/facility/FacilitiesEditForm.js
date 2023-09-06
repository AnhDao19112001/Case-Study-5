import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import aminityService from "../../service/facility/aminityService";
import facilityTypeService from "../../service/facility/facilityTypeService";
import { useEffect, useState } from "react";
import facilityService from "../../service/facility/facilityService";

function FacilitiesEditForm() {
  let navigate = useNavigate();
  const param = useParams();
  const [facility, setFacility] = useState();
  const [aminities, setAminities] = useState([]);
  const [facilityType, setFacilityType] = useState([]);
  const [type, setType] = useState();
  const [validation, setValidation] = useState(
    Yup.object({
      facilityImg: Yup.string(),
      facilityName: Yup.string(),
      facilityArea: Yup.string(),
      facilityRentalCost: Yup.string(),
      facitilyMaxPeople: Yup.string(),
      villaStandard: Yup.string(),
      villaOtherAminities: Yup.string(),
      villaPoolArea: Yup.string(),
      villaNumbOfFloor: Yup.string(),
      houseStandard: Yup.string(),
      houseOtherAminities: Yup.string(),
      houseNumbOfFloor: Yup.string(),
      roomFreeAminities: Yup.string(),
    })
  );

  const defaultValidationSchem = Yup.object({
    facilityImg: Yup.string(),
    facilityName: Yup.string(),
    facilityArea: Yup.string(),
    facilityRentalCost: Yup.string(),
    facitilyMaxPeople: Yup.string(),
    villaStandard: Yup.string(),
    villaOtherAminities: Yup.string(),
    villaPoolArea: Yup.string(),
    villaNumbOfFloor: Yup.string(),
    houseStandard: Yup.string(),
    houseOtherAminities: Yup.string(),
    houseNumbOfFloor: Yup.string(),
    roomFreeAminities: Yup.string(),
  });

  const villaValidationSchema = Yup.object({
    facilityImg: Yup.string().required("Trường này bắt buộc nhập"),
    facilityName: Yup.string()
      .required("Trường này bắt buộc nhập")
      .matches("^([^0-9]*)$", "Tên dịch vụ không được chứa số"),
    facilityArea: Yup.string().required("Trường này bắt buộc nhập"),
    facilityRentalCost: Yup.string().required("Trường này bắt buộc nhập"),
    facitilyMaxPeople: Yup.string().required("Trường này bắt buộc nhập"),
    villaStandard: Yup.string().required("Trường này bắt buộc nhập"),
    villaOtherAminities: Yup.string().required("Trường này bắt buộc nhập"),
    villaPoolArea: Yup.string()
      .required("Trường này bắt buộc nhập")
      .matches("^[1-9][\\d]*$", "Diện tích hồ bơi phải là số nguyên dương"),
    villaNumbOfFloor: Yup.string()
      .required("Trường này bắt buộc nhập")
      .matches("^[1-9][\\d]*$", "Số tầng phải là số nguyên dương"),
  });

  const houseValidationSchema = Yup.object({
    facilityImg: Yup.string().required("Trường này bắt buộc nhập"),
    facilityName: Yup.string()
      .required("Trường này bắt buộc nhập")
      .matches("^([^0-9]*)$", "Tên dịch vụ không được chứa số"),
    facilityArea: Yup.string().required("Trường này bắt buộc nhập"),
    facilityRentalCost: Yup.string().required("Trường này bắt buộc nhập"),
    facitilyMaxPeople: Yup.string().required("Trường này bắt buộc nhập"),
    houseStandard: Yup.string().required("Trường này bắt buộc nhập"),
    houseOtherAminities: Yup.string().required("Trường này bắt buộc nhập"),
    houseNumbOfFloor: Yup.string()
      .required("Trường này bắt buộc nhập")
      .matches("^[1-9][\\d]*$", "Số tầng phải là số nguyên dương"),
  });

  const roomValidationSchema = Yup.object({
    facilityImg: Yup.string().required("Trường này bắt buộc nhập"),
    facilityName: Yup.string()
      .required("Trường này bắt buộc nhập")
      .matches("^([^0-9]*)$", "Tên dịch vụ không được chứa số"),
    facilityArea: Yup.string().required("Trường này bắt buộc nhập"),
    facilityRentalCost: Yup.string().required("Trường này bắt buộc nhập"),
    facitilyMaxPeople: Yup.string().required("Trường này bắt buộc nhập"),
    roomFreeAminities: Yup.string().required("Trường này bắt buộc nhập"),
  });

  useEffect(() => {
    const villa = document.getElementById("villa");
    const room = document.getElementById("room");
    const house = document.getElementById("house");
    switch (type) {
      case "1":
        villa.style.display = "block";
        house.style.display = "none";
        room.style.display = "none";
        break;
      case "2":
        villa.style.display = "none";
        house.style.display = "block";
        room.style.display = "none";
        break;
      case "3":
        villa.style.display = "none";
        house.style.display = "none";
        room.style.display = "block";
        break;
    }
  }, [type]);

  useEffect(() => {
    const getFacilityDetail = async () => {
      const facilityDetail = await facilityService.findById(param.id);
      setType(facilityDetail.data.facilityTypeId);
      setFacility(facilityDetail.data);
    };
    getFacilityDetail();
  }, [param.id]);

  useEffect(() => {
    getAminities();
    getFacilityTypes();
  }, []);

  const getAminities = async () => {
    const aminityData = await aminityService.findAll();
    setAminities(aminityData.data);
  };

  const getFacilityTypes = async () => {
    const facilityTypeData = await facilityTypeService.findAll();
    setFacilityType(facilityTypeData.data);
  };

  if (!facility) {
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

  const handleFacilityChanged = (event) => {
    const villa = document.getElementById("villa");
    const room = document.getElementById("room");
    const house = document.getElementById("house");

    switch (event.currentTarget.value) {
      case "0":
        setValidation(defaultValidationSchem);
        villa.style.display = "none";
        house.style.display = "none";
        room.style.display = "none";
        break;
      case "1":
        setValidation(villaValidationSchema);
        villa.style.display = "block";
        house.style.display = "none";
        room.style.display = "none";
        break;
      case "2":
        setValidation(houseValidationSchema);
        villa.style.display = "none";
        house.style.display = "block";
        room.style.display = "none";
        break;
      case "3":
        setValidation(roomValidationSchema);
        villa.style.display = "none";
        house.style.display = "none";
        room.style.display = "block";
        break;
      default:
        throw new Error("Value dịch vụ không hợp lệ");
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          id: facility?.id,
          facilityImg: facility?.facilityImg,
          facilityName: facility?.facilityName,
          facilityArea: facility?.facilityArea,
          facilityRentalCost: facility?.facilityRentalCost,
          facitilyMaxPeople: facility?.facitilyMaxPeople,
          facilityRentalType: facility?.facilityRentalType,
          facilityTypeId: facility?.facilityTypeId,
          villaStandard: facility?.villaStandard,
          villaOtherAminities: facility?.villaOtherAminities,
          villaPoolArea: facility?.villaPoolArea,
          villaNumbOfFloor: facility?.villaNumbOfFloor,
          houseStandard: facility?.houseStandard,
          houseOtherAminities: facility?.houseOtherAminities,
          houseNumbOfFloor: facility?.houseNumbOfFloor,
          roomFreeAminities: facility?.roomFreeAminities,
          facilityAminitiesid: facility?.facilityAminitiesid,
          facility: facility?.facility,
        }}
        validationSchema={validation}
        onSubmit={(values, { setSubmitting }) => {
          try {
            switch (values.facilityTypeId) {
              case "1":
                values.houseStandard = "";
                values.houseNumbOfFloor = "";
                values.houseOtherAminities = "";
                values.roomFreeAminities = "";
                break;
              case "2":
                values.villaStandard = "";
                values.villaNumbOfFloor = "";
                values.villaOtherAminities = "";
                values.villaPoolArea = "";
                values.roomFreeAminities = "";
                break;
              case "3":
                values.houseStandard = "";
                values.houseNumbOfFloor = "";
                values.houseOtherAminities = "";
                values.villaStandard = "";
                values.villaNumbOfFloor = "";
                values.villaOtherAminities = "";
                values.villaPoolArea = "";
              default:
                break;
            }
            facilityService.edit(values);
            toast("Sửa thành công");
            navigate("/facility");
          } catch (error) {
            toast("Sửa thất bại");
          }
          setSubmitting(false);
        }}
      >
        {({ isSubmitting, setFieldValue, getFieldProps }) => (
          <Form>
            <div className="d-flex justify-content-center">
              <div
                className="card"
                style={{
                  width: "30%",
                  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
                  marginTop: "9%",
                  marginBottom: 100,
                }}
              >
                <img
                  src="https://furamavietnam.com/wp-content/uploads/2018/03/Vietnam_Danang_Furama_Ocean-Suite-Feature-370x239.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <div className="d-flex mb-2 row">
                    <div className="col-6 pe-0 d-flex align-items-center">
                      <h5 className="card-title" style={{ fontWeight: "bold" }}>
                        Tên dịch vụ
                      </h5>
                    </div>
                    <div className="col-6 px-0">
                      <Field
                        type="text"
                        style={{ borderRadius: 5 }}
                        name="facilityName"
                      />
                      <ErrorMessage
                        name="facilityName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="d-flex mb-3 row">
                    <div className="col-6 pe-0 d-flex align-items-center">
                      <p
                        className="card-text d-flex align-items-center"
                        style={{ marginRight: 78 }}
                      >
                        Hình ảnh:
                      </p>
                    </div>
                    <div className="col-6 px-0">
                      <Field
                        type="text"
                        style={{ borderRadius: 5 }}
                        name="facilityImg"
                      />
                      <ErrorMessage
                        name="facilityImg"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="d-flex mb-3 row">
                    <div className="col-6 pe-0 d-flex align-items-center">
                      <p
                        className="card-text d-flex align-items-center"
                        style={{ marginRight: 78 }}
                      >
                        Diện tích sử dụng:
                      </p>
                    </div>
                    <div className="col-6 px-0">
                      <Field
                        type="text"
                        style={{ borderRadius: 5 }}
                        name="facilityArea"
                      />
                      <ErrorMessage
                        name="facilityArea"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="d-flex mb-3 row">
                    <div className="col-6 pe-0 d-flex align-items-center">
                      <p
                        className="card-text d-flex align-items-center"
                        style={{ marginRight: 105 }}
                      >
                        Chi phí thuê:
                      </p>
                    </div>
                    <div className="col-6 px-0">
                      <Field
                        type="text"
                        style={{ borderRadius: 5 }}
                        name="facilityRentalCost"
                      />
                      <ErrorMessage
                        name="facilityRentalCost"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="d-flex mb-3 row">
                    <div className="col-6 pe-0 d-flex align-items-center">
                      <p
                        className="card-text d-flex align-items-center"
                        style={{ marginRight: 105 }}
                      >
                        Số lượng người tối đa:
                      </p>
                    </div>
                    <div className="col-6 px-0">
                      <Field
                        type="text"
                        style={{ borderRadius: 5 }}
                        name="facitilyMaxPeople"
                      />
                      <ErrorMessage
                        name="facitilyMaxPeople"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>
                  <div className="d-flex mb-2 row">
                    <div className="col-6 pe-0 d-flex align-items-center">
                      <p className="card-text" style={{ marginRight: 75 }}>
                        Kiểu thuê:
                      </p>
                    </div>
                    <div className="col-6 px-0">
                      <Field
                        as="select"
                        style={{ borderRadius: 5, width: "97%" }}
                        name="facilityRentalType"
                        id="rental-type"
                      >
                        <option value="1">Ngày</option>
                        <option value="2">Tháng</option>
                        <option value="3">Năm</option>
                      </Field>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex mb-3 row">
                      <div className="col-6 pe-0 d-flex align-items-center">
                        <p className="card-text" style={{ marginRight: 75 }}>
                          Dịch vụ đi kèm:
                        </p>
                      </div>
                      <div className="col-6 px-0">
                        {aminities.map((aminity) => (
                          <div className="row" key={aminity.id}>
                            <Field
                              style={{ width: "5%", marginBottom: "0" }}
                              type="checkbox"
                              id={aminity.id}
                              name="facilityAminitiesid"
                              value={aminity.id.toString()}
                            />
                            <label htmlFor={aminity.id} className="col-10">
                              {aminity.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex mb-2 row">
                    <div className="col-6 pe-0 d-flex align-items-center">
                      <p className="card-text" style={{ marginRight: 75 }}>
                        Loại dịch vụ:
                      </p>
                    </div>
                    <div className="col-6 px-0">
                      <Field
                        as="select"
                        style={{ borderRadius: 5, width: "97%" }}
                        name="facilityTypeId"
                        onChange={(event) => {
                          handleFacilityChanged(event);
                          setFieldValue(
                            "facilityTypeId",
                            event.currentTarget.value
                          );
                        }}
                      >
                        <option value="0">Dịch vụ</option>
                        {facilityType.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div id="villa" style={{ display: "none" }}>
                    <div className="d-flex mb-3 row">
                      <div className="col-6 pe-0 d-flex align-items-center">
                        <p
                          className="card-text d-flex align-items-center"
                          style={{ marginRight: 105 }}
                        >
                          Tiêu chuẩn phòng:
                        </p>
                      </div>
                      <div className="col-6 px-0">
                        <Field
                          type="text"
                          style={{ borderRadius: 5 }}
                          name="villaStandard"
                        />
                        <ErrorMessage
                          name="villaStandard"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="d-flex mb-3 row">
                      <div className="col-6 pe-0 d-flex align-items-center">
                        <p
                          className="card-text d-flex align-items-center"
                          style={{ marginRight: 105 }}
                        >
                          Mô tả tiện nghi khác:
                        </p>
                      </div>
                      <div className="col-6 px-0">
                        <Field
                          name="villaOtherAminities"
                          type="text"
                          style={{ borderRadius: 5 }}
                        />
                        <ErrorMessage
                          name="villaOtherAminities"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="d-flex mb-3 row">
                      <div className="col-6 pe-0 d-flex align-items-center">
                        <p
                          className="card-text d-flex align-items-center"
                          style={{ marginRight: 105 }}
                        >
                          Diện tích hồ bơi:
                        </p>
                      </div>
                      <div className="col-6 px-0">
                        <Field
                          name="villaPoolArea"
                          type="text"
                          style={{ borderRadius: 5 }}
                        />
                        <ErrorMessage
                          name="villaPoolArea"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="d-flex mb-3 row">
                      <div className="col-6 pe-0 d-flex align-items-center">
                        <p
                          className="card-text d-flex align-items-center"
                          style={{ marginRight: 105 }}
                        >
                          Số tầng:
                        </p>
                      </div>
                      <div className="col-6 px-0">
                        <Field
                          name="villaNumbOfFloor"
                          type="text"
                          style={{ borderRadius: 5 }}
                        />
                        <ErrorMessage
                          name="villaNumbOfFloor"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div id="house" style={{ display: "none" }}>
                    <div className="d-flex mb-3 row">
                      <div className="col-6 pe-0 d-flex align-items-center">
                        <p
                          className="card-text d-flex align-items-center"
                          style={{ marginRight: 105 }}
                        >
                          Tiêu chuẩn phòng:
                        </p>
                      </div>
                      <div className="col-6 px-0">
                        <Field
                          name="houseStandard"
                          type="text"
                          style={{ borderRadius: 5 }}
                        />
                        <ErrorMessage
                          name="houseStandard"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="d-flex mb-3 row">
                      <div className="col-6 pe-0 d-flex align-items-center">
                        <p
                          className="card-text d-flex align-items-center"
                          style={{ marginRight: 105 }}
                        >
                          Mô tả tiện nghi khác:
                        </p>
                      </div>
                      <div className="col-6 px-0">
                        <Field
                          name="houseOtherAminities"
                          type="text"
                          style={{ borderRadius: 5 }}
                        />
                        <ErrorMessage
                          name="houseOtherAminities"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                    <div className="d-flex mb-3 row">
                      <div className="col-6 pe-0 d-flex align-items-center">
                        <p
                          className="card-text d-flex align-items-center"
                          style={{ marginRight: 105 }}
                        >
                          Số tầng:
                        </p>
                      </div>
                      <div className="col-6 px-0">
                        <Field
                          name="houseNumbOfFloor"
                          type="text"
                          style={{ borderRadius: 5 }}
                        />
                        <ErrorMessage
                          name="houseNumbOfFloor"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div id="room" style={{ display: "none" }}>
                    <div className="d-flex mb-3 row">
                      <div className="col-6 pe-0 d-flex align-items-center">
                        <p
                          className="card-text d-flex align-items-center"
                          style={{ marginRight: 105 }}
                        >
                          Dịch vụ miễn phí đi kèm:
                        </p>
                      </div>
                      <div className="col-6 px-0">
                        <Field
                          name="roomFreeAminities"
                          type="text"
                          style={{ borderRadius: "5px" }}
                        />
                        <ErrorMessage
                          name="roomFreeAminities"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="">
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
                        <button type="submit" className="btn btn-success me-3">
                          Sửa
                        </button>
                        <Link to="/facility" className="btn btn-primary">
                          Thoát
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FacilitiesEditForm;
