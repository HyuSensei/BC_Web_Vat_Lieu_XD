import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  Pagination,
  Spinner,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getProductCategory } from "../../axios/services";
import { UrlImage } from "../../url";

const URL_IMAGE = UrlImage();

const ProductCategory = () => {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const { categoriesList } = useSelector((state) => state.customer.category);

  useEffect(() => {
    fetchAllProduct(page);
  }, [page, category_id]);

  const fetchAllProduct = async (page) => {
    try {
      let res = await getProductCategory(category_id, page);
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

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
      <Row>
        <Col md={3}>
          <h3 className="mb-4">DANH MỤC</h3>
          <ListGroup>
            {categoriesList &&
              categoriesList.map((item, index) => (
                <ListGroup.Item
                  key={`categoriesList-${index}`}
                  className="border-0 px-0"
                >
                  <h6 className="font-weight-bold">{item.category_parent}</h6>
                  <ListGroup variant="flush">
                    {item.categories.map((category) => (
                      <ListGroup.Item
                        key={category.id}
                        action
                        as={Link}
                        to={`/category/${category.id}`}
                        className="border-0 pl-3"
                      >
                        {category.name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>
        <Col md={9}>
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
              <Pagination className="justify-content-center">
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
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCategory;
