import { useEffect, useState } from 'react'
import {Button, Col, Form} from 'react-bootstrap'
import Formcontainer from "../Component/Formcontainer";
import Checkoutsteps from '../Component/checkoutsteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SavePaymentmethod } from '../Slices/Cartslice';


function Paymentscreen() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const [paymentmethod,setpaymentmethod]=useState('PayPal')

    const {shippingAddress} =useSelector((state)=>state.cart)

    useEffect(function(){
        if(!shippingAddress.address||!shippingAddress.city||!shippingAddress.country||!shippingAddress.postalCode){
            navigate('/shipping')
        }

    },[shippingAddress,navigate])

    function handlesubmit(e){
        e.preventDefault()
        dispatch(SavePaymentmethod(paymentmethod))
        navigate('/placeorder')
    }

    return (
       <Formcontainer>
         <h1>Payment Method</h1>
            <Checkoutsteps step1 step2 step3/>
         <Form onSubmit={handlesubmit}>
            <Form.Group>
                <Form.Label as='legend'>
                    Select Method
                </Form.Label> 
                <Col>
                    <Form.Check 
                    type='radio'
                    className='my-2'
                    label='PayPal or Credit Card'
                    id='PayPal'
                    name='paymentMethod'
                    value='PayPal'
                    checked
                    onChange={(e)=>setpaymentmethod(e.value.target)}
                    >

                    </Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
         </Form>
       </Formcontainer>
    )
}

export default Paymentscreen
