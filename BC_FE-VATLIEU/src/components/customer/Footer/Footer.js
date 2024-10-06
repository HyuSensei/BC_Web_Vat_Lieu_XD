import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaHome, FaEnvelope, FaPhone } from "react-icons/fa";
import logo from "../../../assets/customer/images/logo-xd.png";

const Footer = () => {
  return (
    <footer className="text-center text-lg-start text-muted">
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div>
          <span style={{ textAlign: "center" }}></span>
        </div>
      </section>

      <section className="py-5">
        <Container>
          <Row className="mt-3">
            <Col md={3} lg={4} xl={3} className="mx-auto mb-4">
              <img src={logo} alt="Logo" style={{ width: "200px" }} />
            </Col>

            <Col md={2} lg={2} xl={2} className="mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "#001529" }}
              >
                GẠCH ỐP LÁT
              </h6>
              <p style={{ color: "#001529" }}>Gạch Lát Nền</p>
              <p style={{ color: "#001529" }}>Gạch Ốp Tường</p>
            </Col>

            <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "#001529" }}
              >
                GƯƠNG
              </h6>
              <p style={{ color: "#001529" }}>Gương Dây Leo</p>
              <p style={{ color: "#001529" }}>Gương Gắn Tường</p>
              <p style={{ color: "#001529" }}>Gương Led</p>
            </Col>

            <Col md={3} lg={2} xl={2} className="mx-auto mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "#001529" }}
              >
                SÀN GỖ
              </h6>
              <p style={{ color: "#001529" }}>Sàn Gỗ Công Nghiệp</p>
            </Col>

            <Col md={4} lg={3} xl={3} className="mx-auto mb-md-0 mb-4">
              <h6
                className="text-uppercase fw-bold mb-4"
                style={{ color: "#001529" }}
              >
                LIÊN HỆ
              </h6>
              <p style={{ color: "#001529" }}>
                <FaHome className="me-2" style={{ color: "#001529" }} />
                Tổ 5 Khối 3 Thị Trấn Cao Lộc - Tỉnh Lạng Sơn
              </p>
              <p style={{ color: "#001529" }}>
                <FaEnvelope className="me-2" style={{ color: "#001529" }} />
                vatlieuxaydungchinhhang@gmail.com
              </p>
              <p style={{ color: "#001529" }}>
                <FaPhone className="me-2" style={{ color: "#001529" }} />
                Call/Zalo : 0336714261
              </p>
            </Col>
          </Row>
        </Container>
      </section>
    </footer>
  );
};

export default Footer;
