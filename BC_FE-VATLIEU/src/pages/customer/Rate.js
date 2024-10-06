import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Alert,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import {
  getProductRate,
  handleRate,
} from "../../redux/silce/customer/rateSlice";
import { toast } from "react-toastify";
import { UrlImage } from "../../url";

const Rate = () => {
  const URL_IMAGE = UrlImage();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const { ProductRate, isSuccessRate } = useSelector(
    (state) => state.customer.rate
  );

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const order_id = new URLSearchParams(location.search).get("order_id");
  const user_id = new URLSearchParams(location.search).get("user_id");
  const product_id = new URLSearchParams(location.search).get("product_id");

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    if (!order_id || !user_id || !product_id) {
      navigate("/");
    }
    dispatch(getProductRate({ order_id, product_id, user_id }));
  }, [
    isSuccessRate,
    isAuth,
    dispatch,
    navigate,
    order_id,
    user_id,
    product_id,
  ]);

  const isValidRate = () => {
    if (!rating) {
      toast.error("Vui lòng chọn số sao đánh giá");
      return false;
    }
    if (!comment) {
      toast.error("Vui lòng nhập thông tin đánh giá");
      return false;
    }
    return true;
  };

  const rateClick = () => {
    if (isValidRate()) {
      const data_rate = { order_id, product_id, user_id, rating, comment };
      dispatch(handleRate(data_rate));
      toast.success("Đánh giá sản phẩm thành công");
    }
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h4 className="mb-4 text-secondary">ĐÁNH GIÁ SẢN PHẨM</h4>
        {ProductRate && ProductRate.product ? (
          <Row>
            <Col md={3}>
              <Image
                src={URL_IMAGE + ProductRate.product.image}
                fluid
                alt={ProductRate.product.name}
              />
            </Col>
            <Col md={9}>
              <h5>{ProductRate.product.name}</h5>
              <div className="my-3">
                {[...Array(5)].map((star, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FaStar
                      key={index}
                      size={30}
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"
                      }
                      style={{ marginRight: 10, cursor: "pointer" }}
                      onClick={() => setRating(ratingValue)}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  );
                })}
              </div>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Nhập ghi chú đánh giá..."
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Button variant="dark" onClick={rateClick}>
                  Đánh giá
                </Button>
              </Form>
            </Col>
          </Row>
        ) : (
          ProductRate &&
          ProductRate.message && (
            <Alert variant="info">{ProductRate.message}</Alert>
          )
        )}
      </Container>
      <Footer />
    </>
  );
};

export default Rate;
