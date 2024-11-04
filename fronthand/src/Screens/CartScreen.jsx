import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Component/Message";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { addtocart, Remocecart } from "../Slices/Cartslice";

function CartScreen() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { cartItem } = useSelector((state) => state.cart);

    async function  submithandlet(el,number){

        dispatch(addtocart({...el,qty:number}))
    }

    function handelsubmit(){
      navigate('/login?redirect=/shipping')
    }




  return (
    <>
      <Row>
        <Col>
          <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
          {cartItem.length === 0 ? (
            <Message variant="danger">
              Your cart is empty <Link to={"/"}>Go Back</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItem.map((el) => (
                <ListGroup.Item key={el._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={el.image} alt={el.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${el._id}`}>{el.name}</Link>
                    </Col>
                    <Col md={2}>$ {el.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={el.qty}
                        onChange={(e) =>submithandlet(el,Number(e.target.value))}
                      >
                        {[...Array(el.countInStock).keys()].map((element) => (
                          <option key={element+10} value={element + 1}>
                            {element + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col>
                      <Button type="button" variant="light" onClick={()=>dispatch(Remocecart(el))}>
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>
                  SubTotal ({cartItem.reduce((acc, crr) => acc + crr.qty, 0)}) Items
                </h2>
               $ {cartItem.reduce((acc,crr)=>acc+crr.qty*crr.price,0)}
                </ListGroup.Item>
                <ListGroup.Item>
                <Button type="button" className="btn-block"disabled={cartItem.length===0} onClick={handelsubmit}>
                    Proceed to checkout

                </Button>

                </ListGroup.Item>

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default CartScreen;
