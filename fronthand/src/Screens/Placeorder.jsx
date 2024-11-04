import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Checkoutsteps from "../Component/checkoutsteps";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { useCreateOrderMutation } from "../Slices/Orderapislice";
import { toast } from "react-toastify";
//import Message from "../Component/Message";
import Loader from "../Component/Loader";
import { ClearCart } from "../Slices/Cartslice";
import Message from "../Component/Message";

function Placeorder() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [CreateOrder, { isLoading, error }] = useCreateOrderMutation();
  const dispatch=useDispatch()

  async function handelsubmition(e) {
    e.preventDefault();
    try{
    const res = await CreateOrder({
      cartItem:cart.cartItem,
      shippingAddress:cart.shippingAddress,
      paymetMethod: cart.paymetMethod,
      totalproice: cart.totalproice,
      itemprice:cart.itemprice,
      shippingprice:cart.shippingprice,
      taxprice:cart.taxprice,
    }).unwrap();
    dispatch(ClearCart())
    navigate(`/orders/${res._id}`)
   toast.success(`data created successfully`);

     
  }catch(err){
    console.log(err)
    toast.error(`Unable to create the data`);

  }
  }

  useEffect(
    function () {
      if (!cart.shippingAddress) {
        navigate("/shipping");
      }
      if (!cart.paymentMethod) {
        navigate("/payment");
      }
    },
    [cart.paymentMethod, cart.shippingAddress, navigate]
  );

  return (
    <>
      <Checkoutsteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {`${cart.shippingAddress.address} ${cart.shippingAddress.city} ${cart.shippingAddress.country} ${cart.shippingAddress.postalCode}`}
              </p>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Payment Method:</strong>
              {cart.paymentMethod}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flush">
            {cart.cartItem.map((item, index) => {
              return (
                <ListGroup.Item key={index}>
                  <Row >
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col>
                      {`${item.qty} * $${item.price} = $${
                        item.qty * item.price
                      }`}
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>${cart.itemprice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.taxprice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>ShippingPrice:</Col>
                  <Col>${cart.shippingprice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>TotalPrice:</Col>
                  <Col>${cart.totalproice}</Col>
                </Row>
              </ListGroup.Item>
             { <ListGroup.Item>
                {error && <Message variant="danger">{error?.data?.message}</Message>}
              </ListGroup.Item>}

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItem === 0}
                  onClick={handelsubmition}
                >
                  Place Order
                </Button>
                {isLoading && <Loader />}

              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default Placeorder;
