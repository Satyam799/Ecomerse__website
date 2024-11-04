import { Link, useParams } from "react-router-dom";
import {
  useDeliveredstatusupdateMutation,
  useGetorderbyidQuery,
  usePaymentdetailsQuery,
  useUpdatepaymentMutation,
} from "../Slices/Orderapislice";
import Loader from "../Component/Loader";
import Message from "../Component/Message";
import { Button, Card, Col, Image, ListGroup, Row } from "react-bootstrap";
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";

function OrderScreen() {
  const { id  } = useParams();

  const { userInfo } = useSelector((state) => state.auth);

  const { data: order, refetch, isLoading, error } = useGetorderbyidQuery(id);

  const [Updatepayment, { isloading: payloading, error: errorinupdate }] = useUpdatepaymentMutation();

  const {
    data: paypal,
    isLoading: paypalloading,
    error: paypalerror,
  } = usePaymentdetailsQuery();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [Deliveredstatusupdate,{isLoading:deliverloading,error:deliveringerror}]=useDeliveredstatusupdateMutation()
    
  async function Deliveringhandler(e){
      e.preventDefault()
      try{
      const res=await Deliveredstatusupdate(id).unwrap()
      toast.success('Order delivered successfully')
      refetch()
      }catch(err){
        toast.error(deliveringerror?.data?.message)
      }
  }
  





  useEffect(
    function () {
      if (paypal?.clientId  && !paypalloading && !paypalerror) {
        const loadpaypalscript = async () => {
          paypalDispatch({
            type: "resetOptions",
            value: {
              "client-id": paypal?.clientId,
              currency:"USD",
            },
          });
          paypalDispatch({ type: "setLoadingStatus", value: "pending" });
        };
        if (order && !order.isPaid) {
          if (!window.paypal) {
            loadpaypalscript();
          }
        }
      }
    },
    [order, paypal, paypalDispatch, paypalloading, paypalerror]
  );

  function createOrder(data,actions){

    return actions.order.create({
      purchase_units:[
        {
        amount:{
          value:order.totalPrice
        }
        }
      ]
    }).then((id)=>{
      return id
    })

  }

  function onApprove(data,actions){
    return actions.order.capture().then(async function (details){
      try{
        await Updatepayment({id,details})
          refetch()
          toast.success('Payment is successful')

        
      }catch(err){
        toast.error(err)

      }
    })

  }
  function onError(err){
    toast.error(err.message)

  }
 
  async function onApprovetest(){
try{
   await Updatepayment({id,details:{pay:{}}}).unwrap()
   refetch();
   toast.success('Payment is successful')
   
  }catch(err){

    toast.error(err)
  }
   
  }

  
  




  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message varient="danger">{error.maessage}</Message>
  ) : (
    <>
      <h1>order {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                {" "}
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                {" "}
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                {" "}
                <strong>Address:</strong>{" "}
                {`${order.shippingAddress.address} ${order.shippingAddress.city} ${order.shippingAddress.country} ${order.shippingAddress.postalCode}`}
              </p>
              {order.isDelivered ? (
                `Delivered at ${order.deliveredAt}`
              ) : (
                <Message variant={"danger"}>
                  Your product is not delevired yet.
                </Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                `Paied at ${order.paidAt}`
              ) : (
                <Message variant={"danger"}>Not Payed</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              {order.orderItem.map((item, index) => {
                return (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col>
                        {`${item.qty} x ${item.price} = ${
                          item.qty * item.price
                        }`}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h1>Order Summary</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>ShippingPrice</Col>
                  <Col>$ {order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>taxPrice</Col>
                  <Col>$ {order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>totalPrice</Col>
                  <Col>$ {order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order.isPaid && (
                <ListGroup.Item>
                  {paypalloading && <Loader />}
                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <Button
                        onClick={onApprovetest}
                        style={{ marginBottom: "10px" }}
                      >
                        Test Pay Order
                      </Button>
                      <div>
                        <PayPalButtons
                       createOrder={createOrder}
                       onApprove={onApprove}
                       onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                 
                </ListGroup.Item>
              )}
               {(!order.isDelivered && <ListGroup.Item>
                    {deliverloading ? <Loader/> : deliveringerror ? <Message variant={'danger'}>{deliveringerror?.data?.message}</Message>:<div>
                      <Button style={{marginBottom:'10px'}} onClick={Deliveringhandler}>
                        Mark as Delivered
                      </Button>
                    </div>}
                  </ListGroup.Item>)}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default OrderScreen;
