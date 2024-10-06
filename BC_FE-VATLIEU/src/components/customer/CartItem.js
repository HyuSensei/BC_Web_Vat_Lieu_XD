import React, { useEffect } from "react";
import { Container, Table, Image, Button, Form } from "react-bootstrap";
import { FaHome, FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { UrlImage } from "../../url";
import {
  removeCart,
  decreaseCart,
  addTocart,
  getTotal,
} from "../../redux/silce/customer/cartSlice";
import Order from "./Order";
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );

  const removeCartClick = (product) => {
    dispatch(removeCart(product));
  };

  const decreaseCartClick = (product) => {
    dispatch(decreaseCart(product));
  };

  const increaseCartClick = (product) => {
    dispatch(addTocart(product));
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  return (
    <Container className="my-5">
      <Table responsive hover className="align-middle">
        <thead className="bg-light">
          <tr>
            <th>Sản phẩm</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Tổng tiền</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart && cart.length > 0 ? (
            cart.map((item, index) => (
              <tr key={`cart-${index}`}>
                <td>
                  <Image src={URL_IMAGE + item.image} width={120} fluid />
                </td>
                <td className="text-start">{item.name}</td>
                <td className="fw-bold">
                  {item.price.toLocaleString("vi-VN")} đ
                </td>
                <td>
                  <div className="d-flex align-items-center justify-content-center">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => decreaseCartClick(item)}
                    >
                      <FaMinus />
                    </Button>
                    <Form.Control
                      type="number"
                      value={item.cartQuantity}
                      readOnly
                      className="mx-2 text-center"
                      style={{ width: "50px" }}
                    />
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => increaseCartClick(item)}
                    >
                      <FaPlus />
                    </Button>
                  </div>
                </td>
                <td className="fw-bold">
                  {(item.cartQuantity * item.price).toLocaleString("vi-VN")} đ
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => removeCartClick(item)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))
          ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  <img style={{
                    borderRadius: '20px'
                  }} width={'200px'} src={'https://i.pinimg.com/originals/5a/d0/47/5ad047a18772cf0488a908d98942f9bf.gif'} alt="" />
                </td>
              </tr>
          )}
        </tbody>
      </Table>
      <Order />
    </Container>
  );
};

export default CartItem;
