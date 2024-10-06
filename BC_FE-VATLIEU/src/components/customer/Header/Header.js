import React, { useEffect } from "react";
import { Container, Nav, Navbar, NavDropdown, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBasketShopping, FaUser } from "react-icons/fa6";
import { authLogin, logout } from "../../../redux/silce/customer/authSilce";
import { getTotal } from "../../../redux/silce/customer/cartSlice";
import { fetchAllCategory } from "../../../redux/silce/customer/categorySlice";
import { toast } from "react-toastify";
import SearchInput from "../SearchInput";
import logo from "../../../assets/customer/images/logo-xd.png";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const userLogin = useSelector((state) => state.customer.auth.dataUser);
  const { categoriesList } = useSelector((state) => state.customer.category);
  const { cartTotalQuantity, cartItem } = useSelector(
    (state) => state.customer.cart
  );

  useEffect(() => {
    dispatch(getTotal());
    dispatch(fetchAllCategory());
    dispatch(authLogin());
  }, [cartItem, dispatch]);

  const logoutClick = () => {
    dispatch(logout()).then((result) => {
      if (result.payload.success) {
        toast.success(result.payload.message);
        navigate("/login");
      }
    });
  };

  return (
    <div className="header-wrapper" style={{ paddingTop: "20px" }}>
      <Navbar bg="white" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img src={logo} alt="Logo" width="150" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => navigate("/")}
                className="fw-semibold text-dark"
              >
                Trang Chủ
              </Nav.Link>
              {categoriesList.map((item, index) => (
                <NavDropdown
                  key={`category_parent-${index}`}
                  title={item.category_parent}
                  id={`dropdown-${index}`}
                  className="fw-semibold"
                >
                  {item.categories.map((category) => (
                    <NavDropdown.Item
                      key={`category-${category.id}`}
                      onClick={() => navigate(`/category/${category.id}`)}
                    >
                      {category.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
              <Nav.Link className="fw-semibold text-dark">Liên Hệ</Nav.Link>
            </Nav>
            <Nav className="align-items-center">
              <Nav.Link
                onClick={() => navigate("/cart")}
                className="position-relative me-3"
              >
                <FaBasketShopping className="fs-4 text-dark" />
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {cartTotalQuantity}
                </Badge>
              </Nav.Link>
              {isAuth && isAuth.success ? (
                <NavDropdown
                  title={
                    <>
                      <FaUser className="me-1" /> {userLogin.name}
                    </>
                  }
                  id="user-dropdown"
                  className="fw-semibold"
                >
                  <NavDropdown.Item
                    onClick={() => navigate(`/order_wait/${userLogin.id}`)}
                  >
                    Đơn Hàng
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logoutClick}>
                    Đăng Xuất
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <NavDropdown
                  title="Tài Khoản"
                  id="account-dropdown"
                  className="fw-semibold"
                >
                  <NavDropdown.Item onClick={() => navigate("/login")}>
                    Đăng Nhập
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={() => navigate("/register")}>
                    Đăng Ký
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <SearchInput />
      </Container>
    </div>
  );
};

export default Header;
