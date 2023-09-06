import React, {useEffect, useState} from "react";
import Header from "../Header";
import facilityService from "../../service/facility/facilityService";

{
    /* Automatic Slideshow - change image every 4 seconds */
}
var myIndex = 0;
let timeout;

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
        myIndex = 1;
    }
    x[myIndex - 1].style.display = "block";
    timeout = setTimeout(carousel, 4000);
}

function Home() {
    const [facilitiesList, setFacilitiesList] = useState([]);
    useEffect(() => {
        getAllFacilities();
    }, []);

    const getAllFacilities = async () => {
        const facilityData = await facilityService.findLimit3();
        setFacilitiesList(facilityData.data);
    };

    useEffect(() => {
        carousel();

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, []);

    return (
        <>
            <Header/>
            <div style={{maxWidth: 2000, marginTop: 70}}>
                {/* Automatic Slideshow Images */}
                <div className="mySlides">
                    <img
                        src="img/Vietnam_Danang_Furama_Resort_Exterior_Ocean-Pool-6.jpg"
                        width="100%"
                        height="700px"
                    />
                    <div className="slider-content">
                        <h3>KHU NGHỈ DƯỠNG ẨM THỰC</h3>
                        <h3>TỌA LẠC TẠI BÃI BIỂN ĐÀ NẴNG</h3>
                        <h3>MỘT TRONG 6 BÃI BIỂN ĐẸP NHẤT THẾ GIỚI</h3>
                    </div>
                </div>
                <div className="mySlides">
                    <img
                        src="img/Vietnam_Danang_Furama_Resort_Exterior-Furama-girl-with-pink-hat.jpg"
                        width="100%"
                        height="600px"
                        alt="..."
                    />
                    <div className="slider-content">
                        <h3>KHU NGHỈ DƯỠNG ẨM THỰC</h3>
                        <h3>TỌA LẠC TẠI BÃI BIỂN ĐÀ NẴNG</h3>
                        <h3>MỘT TRONG 6 BÃI BIỂN ĐẸP NHẤT THẾ GIỚI</h3>
                    </div>
                </div>
                <div className="mySlides">
                    <img
                        src="img/Vietnam_Danang_Furama_Resort_Exterior_Courtyard.jpg"
                        width="100%"
                        height="600px"
                        alt="..."
                    />
                    <div className="slider-content">
                        <h3>KHU NGHỈ DƯỠNG ẨM THỰC</h3>
                        <h3>TỌA LẠC TẠI BÃI BIỂN ĐÀ NẴNG</h3>
                        <h3>MỘT TRONG 6 BÃI BIỂN ĐẸP NHẤT THẾ GIỚI</h3>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className="container mt-5 mb-5">
                <div className="row mb-3">
                    <div className="col-4">
                        <h2
                            style={{
                                fontSize: 24,
                                color: "#cbbe73",
                                textAlign: "left",
                                fontFamily: "Playfair Display",
                                fontWeight: 700,
                                fontStyle: "normal",
                            }}
                        >
                            KHU NGHỈ DƯỠNG ĐẲNG CẤP THẾ GIỚI, FURAMA ĐÀ NẴNG, NỔI TIẾNG LÀ KHU
                            NGHỈ DƯỠNG ẨM THỰC TẠI VIỆT NAM.
                        </h2>
                    </div>
                    <div className="col-4">
                        <a
                            href="https://www.youtube.com/watch?v=IjlT_4mvd-c"
                            className="video-btn js-video-btn"
                        >
                            <img
                                src="img/Vietnam_Danang_Furama_Resort_Exterior_Beach.jpg"
                                alt=""
                                width={1000}
                                height={754}
                                className="img-fluid"
                            />
                        </a>
                    </div>
                    <div className="col-4">
                        <p style={{textAlign: "justify"}}>
                            Hướng ra bãi biển Đà Nẵng trải dài cát trắng, Furama Resort Đà
                            Nẵng là cửa ngõ đến với 3 di sản văn hoá thế giới: Hội An (20
                            phút), Mỹ Sơn (90 phút) và Huế (2 tiếng. 196 phòng hạng sang cùng
                            với 70 căn biệt thự từ hai đến bốn phòng ngủ có hồ bơi riêng đều
                            được trang trí trang nhã, theo phong cách thiết kế truyền thống
                            của Việt Nam và kiến trúc thuộc địa của Pháp, biến Furama thành
                            khu nghỉ dưỡng danh giá nhất tại Việt Nam – vinh dự được đón tiếp
                            nhiều người nổi tiếng, giới hoàng gia, chính khách, ngôi sao điện
                            ảnh và các nhà lãnh đạo kinh doanh quốc tế.
                        </p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="text-center">
                        <h2
                            style={{
                                fontSize: 24,
                                color: "#cbbe73",
                                textAlign: "center",
                                fontFamily: "Playfair Display",
                                fontWeight: 700,
                                fontStyle: "normal",
                            }}
                        >
                            CÁC LOẠI PHÒNG
                        </h2>
                        <p style={{padding: "0 150px"}} className="mb-5">
                            Khu nghỉ dưỡng có 196 phòng được thiết kế theo phong cách truyền
                            thống Việt Nam kết hợp với phong cách Pháp, 2 tòa nhà 4 tầng có
                            hướng nhìn ra biển, nhìn ra hồ bơi trong xanh và những khu vườn
                            nhiệt đới xanh tươi mát. Ngoài ra, khu nghỉ dưỡng Furama còn cung
                            cấp các liệu pháp spa, phòng xông hơi ướt, phòng xông hơi khô,
                            dịch vụ mát-xa cạnh hồ bơi, các dịch vụ thể thao dưới nước và các
                            lớp tập yoga và Thái Cực Quyền trên bãi biển.
                        </p>
                        <div className="row">
                            {facilitiesList.map((facility, index) => (
                                <div
                                    className="col-4 mb-3"
                                    key={index}
                                    style={{padding: "0"}}
                                >
                                    <div className="card">
                                        <img
                                            src={facility.facilityImg}
                                            className="card-img-top"
                                            alt="..."
                                            width={370}
                                            height={239}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{facility.facilityName}</h5>
                                            <p className="card-text">{facility.facilityArea}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="text-center">
                        <h2
                            style={{
                                fontSize: 24,
                                color: "#cbbe73",
                                textAlign: "center",
                                fontFamily: "Playfair Display",
                                fontWeight: 700,
                                fontStyle: "normal",
                            }}
                        >
                            TRẢI NGHIỆM ẨM THỰC & GIẢI TRÍ
                        </h2>
                        <p style={{padding: "0 250px"}} className="mb-5">
                            Khu nghỉ dưỡng Furama Đà Nẵng là một khu nghỉ dưỡng 5 sao sang
                            trọng, có uy tín và được xem là một trong những biểu tượng của
                            ngành du lịch Việt Nam.
                        </p>
                    </div>
                    <div className="row mb-5">
                        <div
                            className="col-6 flex-column justify-content-center"
                            style={{display: "flex"}}
                        >
                            <h2
                                style={{
                                    fontSize: 30,
                                    color: "#cbbe73",
                                    fontFamily: "Playfair Display",
                                    fontWeight: 700,
                                    fontStyle: "normal",
                                }}
                            >
                                ẨM THỰC
                            </h2>
                            <p className="mb-5">
                                Trải nghiệm ẩm thực tại Khu nghỉ có sự pha trộn độc đáo các món
                                ăn truyền thống Việt Nam với nhiều những hương vị ẩm thực châu
                                Á, Ý và châu Âu cùng các món bò nhập khẩu thượng hạng tại đa
                                dạng các nhà hàng, quầy bar đẳng cấp được bao quanh bởi một khu
                                vườn nhiệt đới hay hướng mình ra biển, đón…
                            </p>
                            <button
                                type="button"
                                style={{
                                    width: "120px",
                                    backgroundColor: "#046056",
                                    fontSize: "13px",
                                }}
                            >
                                XEM THÊM
                            </button>
                        </div>
                        <div className="col-6">
                            <img
                                src="https://furamavietnam.com/wp-content/uploads/2018/07/CULIRARY.jpg"
                                width="100%"
                            />
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div className="col-6">
                            <img
                                src="https://furamavietnam.com/wp-content/uploads/2018/07/RECREATION.jpg"
                                width="100%"
                            />
                        </div>
                        <div
                            className="col-6 flex-column justify-content-center"
                            style={{display: "flex"}}
                        >
                            <h2
                                style={{
                                    fontSize: 30,
                                    color: "#cbbe73",
                                    fontFamily: "Playfair Display",
                                    fontWeight: 700,
                                    fontStyle: "normal",
                                }}
                            >
                                GIẢI TRÍ
                            </h2>
                            <p className="mb-5">
                                Biến kỳ nghỉ dưỡng năng động hơn bằng cách tham gia các hoạt
                                động thể thao trên nước từ chèo thuyền catamaran, lướt ván buồm,
                                chèo thuyền trên biển, lướt vát, đi xe đạp nước, trượt nước,
                                lướt ván, chuối, dù lượn và đa dạng các hoạt động.
                            </p>
                            <button
                                type="button"
                                style={{
                                    width: "120px",
                                    backgroundColor: "#046056",
                                    fontSize: "13px",
                                }}
                            >
                                XEM THÊM
                            </button>
                        </div>
                    </div>
                    <div className="row mb-5">
                        <div
                            className="col-6 flex-column justify-content-center"
                            style={{display: "flex"}}
                        >
                            <h2
                                style={{
                                    fontSize: 30,
                                    color: "#cbbe73",
                                    fontFamily: "Playfair Display",
                                    fontWeight: 700,
                                    fontStyle: "normal",
                                }}
                            >
                                SỰ KIỆN
                            </h2>
                            <p className="mb-5">
                                Cung hội nghị Quốc tế International Convention Palace (ICP) với
                                phòng Hội nghị lớn sức chứa lên tới 1000 khách cùng hơn 10 phòng
                                chức năng phụ trợ quy mô từ 50 đến 300 khách được trang bị cơ sở
                                vật chất, thiết bị hiện đại, là địa điểm lý tưởng dành cho các
                                đoàn MICE tổ chức hội nghị, hội thảo và sự kiện.
                            </p>
                            <button
                                type="button"
                                style={{
                                    width: "120px",
                                    backgroundColor: "#046056",
                                    fontSize: "13px",
                                }}
                            >
                                XEM THÊM
                            </button>
                        </div>
                        <div className="col-6">
                            <img
                                src="https://furamavietnam.com/wp-content/uploads/2018/10/02.-ICP-ICP_Furama_Danang_-Ball-Room-4.jpg"
                                width="100%"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
