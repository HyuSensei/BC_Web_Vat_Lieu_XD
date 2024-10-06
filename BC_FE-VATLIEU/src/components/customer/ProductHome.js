import React, { useEffect } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { fetchProductHome } from "../../redux/silce/customer/productSilce";
import { UrlImage } from "../../url";

const URL_IMAGE = UrlImage();

const ProductHome = () => {
  const navigate = useNavigate();
  const listProduct = useSelector(
    (state) => state.customer.product.listProduct
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductHome());
  }, [dispatch]);

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar key={index} color={index < rating ? "#e3c01c" : "#e4e5e9"} />
    ));
  };

  return (
    <Container className="my-5">
      <h3 className="text-center mb-4">SẢN PHẨM NỔI BẬT</h3>
      {listProduct && listProduct.length > 0 ? (
        <Row>
          {listProduct.map((item, index) => (
            <Col
              key={`product-${index}`}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              className="mb-4"
            >
              <Card className="h-100 shadow-sm">
                <Link to={`/detail/${item.id}`}>
                  <Card.Img
                    variant="top"
                    src={URL_IMAGE + item.image}
                    alt={item.name}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title
                    className="mb-2"
                    style={{
                      cursor: "pointer",
                      overflow: "hidden",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                    onClick={() => navigate(`/detail/${item.id}`)}
                  >
                    {item.name}
                  </Card.Title>
                  <div className="mb-2">
                    {renderStars(5)}{" "}
                    {/* Assuming all products have 5-star rating */}
                  </div>
                  <Card.Text className="mt-auto font-weight-bold">
                    {item.price.toLocaleString("vi-VN")} đ
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </Container>
  );
};

export default ProductHome;
