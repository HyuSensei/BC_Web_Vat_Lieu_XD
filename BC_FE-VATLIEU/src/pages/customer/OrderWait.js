import React, { useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import OrderStatus from "../../components/customer/OrderStatus";
import {
  getOrderWait,
  orderCancelAction,
} from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";

const OrderWait = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderWait);
  const orderCancel = useSelector(
    (state) => state.customer.order.handleOrderCancel
  );

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderWait(user_id));
  }, [isAuth, orderCancel, dispatch, navigate, user_id]);

  const cancelOrderClick = (order_id) => {
    dispatch(orderCancelAction(order_id));
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h4 className="mb-4">ĐƠN HÀNG ĐANG CHỜ</h4>
        <OrderStatus />
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <Card key={`order-${order.id}`} className="mb-4">
              <Card.Body>
                {order.Order_Products.map((item, itemIndex) => (
                  <Row
                    key={`item-${order.id}-${itemIndex}`}
                    className="mb-3 align-items-center"
                  >
                    <Col xs={12} md={3}>
                      <img
                        src={URL_IMAGE + item.Product.image}
                        alt={item.Product.name}
                        className="img-fluid"
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
                      Đơn hàng đang được chờ duyệt!
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
                      variant="danger"
                      onClick={() => cancelOrderClick(order.id)}
                    >
                      Hủy đơn hàng
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="info" className="text-center">
            Chưa có đơn hàng nào đang chờ duyệt!
          </Alert>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default OrderWait;
