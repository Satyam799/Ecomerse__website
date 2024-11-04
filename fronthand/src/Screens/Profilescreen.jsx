import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useProfileMutation } from "../Slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredintials } from "../Slices/authslice";
import Loader from "../Component/Loader";
import { useMineordersQuery } from "../Slices/Orderapislice";
import Message from "../Component/Message";
import {FaTimes} from 'react-icons/fa'
import {LinkContainer} from 'react-router-bootstrap'
function Profilescreen() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Confirmpassword, setConfirmpassword] = useState("");
  const dispatch = useDispatch();
  const [Profile, { isLoading: Updateloading, error }] = useProfileMutation();
  const { data: Myorders, isLoading, error: dataerror } = useMineordersQuery();
  const { userInfo } = useSelector((state) => state.auth);


  useEffect(
    function () {
      setname(userInfo.name);
      setemail(userInfo.email);
    },
    [userInfo.name, userInfo.email]
  );

  async function Fomsubmit(e) {
    e.preventDefault();
    if (password === Confirmpassword) {
      try {
        const res = await Profile({ name, email, password }).unwrap();
        dispatch(setCredintials(res));
        toast.success("Updated successfully");
      } catch (err) {
        toast.error("Unable to update");
      }
    } else {
      toast.error("Password and confiem password should match");
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        <Form onSubmit={Fomsubmit}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setname(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password" className="my-2">
            <Form.Label>password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmpassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={Confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Submit
          </Button>
          {Updateloading && <Loader />}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : dataerror ? (
          <Message variant={'danger'}>{dataerror?.data?.message}</Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Myorders?.map((item)=>(
                 <tr key={item._id}>
                  <td>{item._id}</td>
                  <td>{item?.createdAt?.substring(0,10)}</td> 
                  <td>{item?.totalPrice}</td>
                  <td> {item?.paidAt ? item?.paidAt?.substring(0,10): <FaTimes style={{color:'red'}}/>}</td>
                  <td>{item?.deliveredAt ? item?.deliveredAt?.substring(0,10):<FaTimes style={{color:'red'}}/>}</td>
                  <td>
                    <LinkContainer to={`/orders/${item._id}`}>
                      <Button type='button' variant='light'>Details</Button>
                    </LinkContainer>
                  </td>
                </tr>

              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
}

export default Profilescreen;
