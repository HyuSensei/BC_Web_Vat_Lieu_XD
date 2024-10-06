import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getProductSearch } from "../../axios/services";
import { UrlImage } from "../../url";

const URL_IMAGE = UrlImage();

const ProductSearch = () => {
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("name");

  const fetchProductSearch = async (page) => {
    try {
      let res = await getProductSearch(name, page);
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductSearch(page);
  }, [page, name]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <FaStar key={index} color={index < rating ? "#e3c01c" : "#e4e5e9"} />
    ));
  };

  return (
    <Container className="my-5">
      <h3 className="text-center text-secondary mb-4">SẢN PHẨM CẦN TÌM</h3>

      {listProduct && listProduct.length > 0 ? (
        <>
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
                      className="mb-2 text-center"
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
                    <div className="mb-2 text-center">
                      {renderStars(5)}{" "}
                      {/* Assuming all products have 5-star rating */}
                    </div>
                    <Card.Text className="mt-auto font-weight-bold text-center">
                      {item.price.toLocaleString("vi-VN")} đ
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination className="justify-content-center mt-4">
            <Pagination.Prev
              onClick={() => handlePageClick(page - 1)}
              disabled={page === 1}
            />
            {[...Array(totalPage)].map((_, index) => (
              <Pagination.Item
                key={index}
                active={index + 1 === page}
                onClick={() => handlePageClick(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => handlePageClick(page + 1)}
              disabled={page === totalPage}
            />
          </Pagination>
        </>
      ) : (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <h4 className="mt-3">Không tìm thấy sản phẩm</h4>
        </div>
      )}
    </Container>
  );
};

export default ProductSearch;
