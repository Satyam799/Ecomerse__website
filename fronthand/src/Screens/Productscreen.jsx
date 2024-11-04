import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from "react-bootstrap";
import { toast } from "react-toastify";

import Rating from "../Component/Rating";
import { useCreatereviewMutation, useGetProductdetailsQuery } from "../Slices/Productapislice";
import Loader from "../Component/Loader";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addtocart } from "../Slices/Cartslice";
import Message from "../Component/Message";

function Productscreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [qty, setqty] = useState(1);
  const [comment,setcomment]=useState()
  const [rating,setrating]=useState()
  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: product,
    isLoading,
    refetch,
    isError,
  } = useGetProductdetailsQuery(productId);

  const [createreview,{isLoading:creation,error:creationerror}]=useCreatereviewMutation()


  function Handelclick() {
    dispatch(addtocart({ ...product, qty: Number(qty) }));
    navigate("/cart");
  }
  async function handelsubmit(e){
   
    e.preventDefault()
    try{
    await createreview({id:product._id,name:userInfo?.name,rating:rating,comment:comment}).unwrap()
    refetch()
    toast.success('The Reviews is added successfully')
    }catch(err){
      toast.error('The Review is not added please check ')
    }

  }






  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <>{isError}</>
      ) : (
        <>
          <Link to={"/"} className="btn btn-light my-3">
            Go back
          </Link>
          <Row>
            <Col md={5}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price ${product?.price}</ListGroup.Item>
                <ListGroup.Item>Price ${product?.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price;</Col>
                      <Col>{product?.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Staus</Col>
                      <Col>
                        <strong>
                          {product?.countInStock > 0
                            ? "In stock"
                            : " Out Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setqty(e.target.value)}
                          >
                            {[...Array(product?.countInStock).keys()].map(
                              (el) => (
                                <option key={el + 1} value={el + 1}>
                                  {el + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product?.countInStock === 0 ? true : false}
                      onClick={Handelclick}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="review">
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant="flush">
                {product.reviews.map((review) => {
                  return (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={Number(review.rating)} />
                      <p>{review?.createdAt?.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  );
                })}
                <ListGroup.Item>
                  <h2>Write An Customer Review</h2>
                  {userInfo ? (
                    <Form onSubmit={handelsubmit}>
                      <Form.Group controlId="rating" className="my-2">
                        <Form.Label> Rating </Form.Label>

                        <Form.Control as="select" onChange={(e)=>setrating(e.target.value)} >

                            <option value=''>...Select</option>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Label>Comment</Form.Label>
                      <Form.Control as='textarea' rows={3} onChange={(e)=>setcomment(e.target.value)}> 

                      </Form.Control>
                      <Button type='submit'> Submit</Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>Sign in</Link> to write Review 
                    </Message>
                  )}

                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default Productscreen;
