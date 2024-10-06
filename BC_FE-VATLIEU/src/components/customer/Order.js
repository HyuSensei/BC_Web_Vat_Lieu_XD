import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { getTotal } from "../../redux/silce/customer/cartSlice";
import { authLogin } from "../../redux/silce/customer/authSilce";
import {
  addOrderOff,
  addOrderOnl,
} from "../../redux/silce/customer/orderSlice";
import { clearCart } from "../../redux/silce/customer/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js/pure";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const dataUser = useSelector((state) => state.customer.auth.dataUser);
  const { isLoadingOrder } = useSelector((state) => state.customer.order);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    dispatch(authLogin());
    dispatch(getTotal());
  }, [cart, dispatch]);

  const isValidOrder = () => {
    if (isAuth === null) {
      toast.error("Vui lòng đăng nhập để đặt hàng");
      navigate("/login");
      return false;
    }
    if (cart.length === 0) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      return false;
    }
    if (!name) {
      toast.error("Vui lòng nhập tên người nhận");
      return false;
    }
    if (!phone) {
      toast.error("Vui lòng nhập số điện thoại");
      return false;
    }
    const isValidPhone =
      /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g.test(
        phone
      );
    if (!isValidPhone) {
      toast.error("Vui lòng nhập đúng số điện thoại");
      return false;
    }
    if (!payment) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return false;
    }
    return true;
  };

  const orderClick = async () => {
    if (isValidOrder()) {
      const data_order = {
        cart: cart,
        user: {
          name: name,
          address: address,
          phone: phone,
          user_id: dataUser.id,
          payment: payment,
        },
      };

      if (payment === "off") {
        dispatch(addOrderOff(data_order)).then((result) => {
          if (result.payload.success) {
            dispatch(clearCart());
            navigate("/order_success");
          }
        });
      } else if (payment === "online") {
        const stripe = await loadStripe(
          "pk_test_51P9qpeJTZBjqYLtWGPLLElOttmEDoIOBBJ1JCs6Zuf6M4Z4hTgxZK14WsuJ9Lx20lB3QFigboaqcTrbbmuEOrzkN00nSEr4pdM"
        );
        dispatch(addOrderOnl(data_order)).then((result) => {
          if (result.payload.success) {
            stripe
              .redirectToCheckout({ sessionId: result.payload.id })
              .then((res) => {
                if (res.error) console.log(res.error);
              });
          }
        });
      }
    }
  };

  return (
    <Container className="mt-5">
      <h4 className="mb-4">CHI TIẾT ĐẶT HÀNG</h4>
      <Row>
        <Col md={6}>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Người nhận hàng <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Số điện thoại <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>
                Địa chỉ nhận hàng <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <Card className="bg-light">
            <Card.Body>
              <h5 className="mb-4">THÀNH TIỀN</h5>
              <div className="d-flex justify-content-between mb-3">
                <h6>TỔNG</h6>
                <p className="text-danger fw-bold">
                  {cartTotalAmount.toLocaleString("vi-VN")} đ
                </p>
              </div>
              <h6 className="mb-3">Phương thức thanh toán</h6>
              <Form.Check
                type="radio"
                label="Thanh toán khi nhận hàng"
                name="paymentMethod"
                value="off"
                onChange={(e) => setPayment(e.target.value)}
                className="mb-2"
              />
              <Form.Check
                type="radio"
                label="Thanh toán Online"
                name="paymentMethod"
                value="online"
                onChange={(e) => setPayment(e.target.value)}
                className="mb-4"
              />
              <Button
                variant="success"
                className="w-100"
                onClick={orderClick}
                disabled={isLoadingOrder}
              >
                {isLoadingOrder ? "ĐANG XỬ LÝ..." : "ĐẶT HÀNG"}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Order;
