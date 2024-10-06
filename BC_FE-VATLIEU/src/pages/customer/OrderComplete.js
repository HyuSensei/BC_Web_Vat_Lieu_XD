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
import { getOrderComplete } from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";

const OrderComplete = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderComplete);
  const rates = useSelector((state) => state.customer.order.orderRate);

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderComplete(user_id));
  }, [isAuth, dispatch, navigate, user_id]);

  const isRated = (productId, orderId) => {
    return rates.some(
      (itemRate) =>
        itemRate.ProductId === productId && itemRate.OrderId === orderId
    );
  };

  return (
    <>
      <Header />
      <Container className="my-5">
        <h4 className="mb-4">ĐƠN HÀNG ĐÃ HOÀN THÀNH</h4>
        <OrderStatus />
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <Card key={`order-${index}`} className="mb-4">
              <Card.Body>
                {order.Order_Products.map((item, itemIndex) => (
                  <Row
                    key={`item-${index}-${itemIndex}`}
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
                      {!isRated(item.ProductId, order.id) ? (
                        <Button
                          variant="primary"
                          onClick={() =>
                            navigate(
                              `/rate?order_id=${order.id}&product_id=${item.ProductId}&user_id=${order.UserId}`
                            )
                          }
                        >
                          Đánh giá
                        </Button>
                      ) : (
                        <Button variant="secondary" disabled>
                          Đã đánh giá
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}
                <hr />
                <Row className="align-items-center">
                  <Col xs={12} md={6}>
                    <Alert variant="success" className="mb-0">
                      Đơn hàng đã được giao thành công!
                    </Alert>
                  </Col>
                  <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
                    <h5 className="mb-0">
                      Thành tiền:{" "}
                      <span className="text-danger">
                        {order.total.toLocaleString("vi-VN")} đ
                      </span>
                    </h5>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Alert variant="info" className="text-center">
            Chưa có đơn hàng nào hoàn thành
          </Alert>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default OrderComplete;
