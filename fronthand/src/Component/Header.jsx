import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../Slices/userApiSlice";
import { Lougout } from "../Slices/authslice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SearchBox from "./SearchBox";

function Header() {
  const { cartItem } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ logout ] = useLogoutMutation();

  async function loginguserout() {
    try {
      await logout().unwrap();
      dispatch(Lougout());
      navigate("/");
      toast.success("Logged Out Successfully");
    } catch (err) {
      console.log(err)
      toast.error('Unable to log you out')
    }
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to={"/"}>
            <Navbar.Brand>
              <img src={logo} alt="proshop" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <SearchBox/>
              <LinkContainer to={"/cart"}>
                <Nav.Link>
                  <FaShoppingCart />
                  Cart
                  {cartItem.length > 0 && (
                    <Badge pill="success">
                      {cartItem.reduce((acc, crr) => acc + crr.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo?.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={loginguserout}>
                    logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to={"/login"}>
                  <Nav.Link>
                    <FaUser />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin ? (
                <NavDropdown title='Admin' id='Adminid'>
             
                <LinkContainer to={'/admin/productlist'}>
                  <NavDropdown.Item>
                    Product
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={'/admin/userlist'}>
                  <NavDropdown.Item>
                    Users
                  </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to={'/admin/orderlist'}>
                  <NavDropdown.Item>
                    Order
                  </NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>) :''}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
