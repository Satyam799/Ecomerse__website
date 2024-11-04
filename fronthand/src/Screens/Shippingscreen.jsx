import { useState } from "react";
import Formcontainer from "../Component/Formcontainer";
import { Button, Form, FormGroup } from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { shippingdetails } from "../Slices/Cartslice";
import checkoutsteps from '../Component/checkoutsteps'
import Checkoutsteps from "../Component/checkoutsteps";

function LoginScreen() {

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const {shippingAddress}=useSelector(state=>state.cart)

  const [address, setaddress] = useState(shippingAddress?.address || '');
  const [city, setcity] = useState(shippingAddress?.city || '');
  const [postalCode, setpostalCode] = useState(shippingAddress?.postalCode || '');
  const [country, setcountry] = useState(shippingAddress?.country || '');

    function handelsubmit(e){
      console.log('hi')

        e.preventDefault()
        dispatch(shippingdetails({address,city,postalCode,country}))
        navigate('/payment')
    }



  return (
    <Formcontainer>
      <Checkoutsteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={handelsubmit}>
        <FormGroup controlId="address" className="my-2">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Address"
            value={address}
            onChange={(e) => setaddress(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>city</Form.Label>
          <Form.Control
            type="city"
            placeholder="city"
            value={city}
            onChange={(e) => setcity(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>postalCode</Form.Label>
          <Form.Control
            type="postalCode"
            placeholder="postalCode"
            value={postalCode}
            onChange={(e) => setpostalCode(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>country</Form.Label>
          <Form.Control
            type="country"
            placeholder="country"
            value={country}
            onChange={(e) => setcountry(e.target.value)}
          ></Form.Control>
        </FormGroup>
        <Button type='submit' variant="primary" className="mt-2" >Submit</Button>

      </Form>
    </Formcontainer>
  );
}

export default LoginScreen;
