import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../../../assets/customer/images/logo-xd.png";

const Footer = () => {
  return (
    <>
      <MDBFooter
        style={{ backgroundColor: "#f8f9fa" }}
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div>
            <span style={{ textAlign: "center" }}></span>
          </div>
        </section>
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <img src={logo} alt="" style={{ width: "200px" }} />
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6
                  style={{ color: "#14134f" }}
                  className="text-uppercase fw-bold mb-4"
                >
                  GẠCH ỐP LÁT
                </h6>
                <p style={{ color: "#14134f" }}>Gạch Lát Nền</p>
                <p style={{ color: "#14134f" }}>Gạch Ốp Tường</p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6
                  style={{ color: "#14134f" }}
                  className="text-uppercase fw-bold mb-4"
                >
                  GƯƠNG
                </h6>
                <p style={{ color: "#14134f" }}>Gương Dây Leo</p>
                <p style={{ color: "#14134f" }}>Gương Gắn Tường</p>
                <p style={{ color: "#14134f" }}>Gương Led</p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6
                  style={{ color: "#14134f" }}
                  className="text-uppercase fw-bold mb-4"
                >
                  SÀN GỖ
                </h6>
                <p style={{ color: "#14134f" }}>Sàn Gỗ Công Nghiệp</p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6
                  style={{ color: "#14134f" }}
                  className="text-uppercase fw-bold mb-4"
                >
                  LIÊN HỆ 
                </h6>
                <p style={{ color: "#14134f" }}>
                  <MDBIcon color="#14134f" icon="home" className="me-2" />
                  Tổ 5 Khối 3 Thị Trấn Cao Lộc - Tỉnh Lạng Sơn
                </p>
                <p style={{ color: "#14134f" }}>
                  <MDBIcon color="#14134f" icon="envelope" className="me-3" />
                  vatlieuxaydungchinhhang@gmail.com
                </p>
                <p style={{ color: "#14134f" }}>
                  <MDBIcon color="#14134f" icon="phone" className="me-3" />{" "}
                  Call/Zalo : 0336714261
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </MDBFooter>
    </>
  );
};
export default Footer;
