import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Alert,
  Image,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import OrderStatus from "../../components/customer/OrderStatus";
import {
  getOrderShip,
  orderConfirmAction,
} from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";

const OrderShip = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderShip);
  const orderConfirm = useSelector(
    (state) => state.customer.order.handleOrderConfirm
  );

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderShip(user_id));
  }, [isAuth, orderConfirm, dispatch, navigate, user_id]);

  const orderConfirmClick = (order_id) => {
    dispatch(orderConfirmAction(order_id));
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h4 className="mb-4">ĐƠN HÀNG ĐANG GIAO</h4>
        <OrderStatus />
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="mb-4">
              <Card.Body>
                {order.Order_Products.map((item, indexItem) => (
                  <Row
                    key={`order-${indexItem}`}
                    className="mb-3 align-items-center"
                  >
                    <Col xs={12} md={3}>
                      <Image
                        src={URL_IMAGE + item.Product.image}
                        alt={item.Product.name}
                        fluid
                        style={{ maxWidth: "120px" }}
                      />
                    </Col>
                    <Col xs={12} md={9}>
                      <h5>{item.Product.name}</h5>
                      <p>Số lượng: {item.quantity}</p>
                      <p className="font-weight-bold">
                        {item.Product.price.toLocaleString("vi-VN")} đ
                      </p>
                    </Col>
                  </Row>
                ))}
                <hr />
                <Row className="align-items-center">
                  <Col xs={12} md={4}>
                    <Alert variant="info" className="mb-0">
                      Đơn hàng đang được giao. Nếu không gặp vấn đề gì, vui lòng
                      bấm "Đã nhận hàng".
                    </Alert>
                  </Col>
                  <Col xs={12} md={4}>
                    <h5 className="mb-0">
                      Thành tiền:{" "}
                      <span className="text-danger">
                        {order.total.toLocaleString("vi-VN")} đ
                      </span>
                    </h5>
                  </Col>
                  <Col xs={12} md={4} className="text-md-end mt-3 mt-md-0">
                    <Button
                      variant="success"
                      onClick={() => orderConfirmClick(order.id)}
                    >
                      Đã nhận hàng
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="info" className="text-center">
            Chưa có đơn hàng nào đang giao!
          </Alert>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default OrderShip;
