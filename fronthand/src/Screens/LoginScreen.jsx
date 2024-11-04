import { useEffect, useState } from "react"
import Formcontainer from "../Component/Formcontainer"
import { Button, Col, Form, FormGroup, Row } from "react-bootstrap"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useLoginMutation } from "../Slices/userApiSlice"
import { toast } from "react-toastify"
import { setCredintials } from "../Slices/authslice"
import Loader from "../Component/Loader"

function LoginScreen() {
    
    const [email,setemail]=useState()
    const [Password,setPassword]=useState()

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [login,{isLoading}]=useLoginMutation()

    const {userInfo}=useSelector(state => state.auth)

    const {search}=useLocation()
    const sp=new URLSearchParams(search)
    const redirect=sp.get('redirect') || '/'

    useEffect(function(){
        if(userInfo){
            navigate(redirect)
        }
    },[userInfo,redirect,navigate])



    async function submitHndler(e){
        e.preventDefault()
        try{
        const data=await login({email,password:Password}).unwrap()
        console.log(data)
        dispatch(setCredintials(data))
        navigate(redirect)
        toast.success('Logged in successfully')
        }catch(err){
            toast.error(err?.data?.message || err.message)
        }
    }
    
    return (
        <Formcontainer>
           <h1>Sign In</h1>
            <Form  onSubmit={submitHndler}>
                <FormGroup controlId="email" className="my-3">
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Email Address" value={email} 
                    onChange={(e)=>setemail(e.target.value)}
                    >

                    </Form.Control>
                </FormGroup>

                <FormGroup controlId="Password" className="my-3">
                    <Form.Label>
                        Password Address
                    </Form.Label>
                    <Form.Control type="Password" placeholder="Password Address" value={Password} 
                    onChange={(e)=>setPassword(e.target.value)}
                    >

                    </Form.Control>
                </FormGroup>
                <Button type="submit" variant="primary" className="mt-2" disabled={isLoading}>Sign In</Button>
                {isLoading && <Loader/>}
            </Form>

            <Row className="py-3">
                <Col> 
                    New Customer ? <Link to={redirect ? `/register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
        </Formcontainer>
    )
}

export default LoginScreen
