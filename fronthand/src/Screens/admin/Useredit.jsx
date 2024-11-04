import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Form } from "react-bootstrap";
import Formcontainer from "../../Component/Formcontainer";
import Loader from "../../Component/Loader";
import Message from "../../Component/Message";
import { toast } from "react-toastify";
import { useGetindividualuserQuery, useUpdateuserdetailMutation } from "../../Slices/userApiSlice";

function Useredit() {
  const navigate = useNavigate();

    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [admin,setadmin]=useState(false)

  const { id } = useParams();
  const {
    data: userindivialdata,
    isLoading,
    refetch,
    error,
  } = useGetindividualuserQuery(id);
const [Updateuserdetail,{isLoading:Updatedataisloading,error:uploaddataerror}]=useUpdateuserdetailMutation()

console.log(uploaddataerror)
   
useEffect(function(){
  if(userindivialdata){
    setname(userindivialdata.name)
    setemail(userindivialdata.email)
    setadmin(userindivialdata.isAdmin)
  }
},[userindivialdata])



  async function submithandler(e) {
    e.preventDefault()
    try{
     const res= await Updateuserdetail({id,name,email,admin}).unwrap()
     refetch()
     navigate('/admin/userlist')
     toast.success('Data is updates successfully')
    }catch(err){
      toast.error('Unable to update the data')

    }

  }

  return (
    <>
      <LinkContainer to={"/admin/userlist"}>
        <Button variant="light">Go Back</Button>
      </LinkContainer>
      <Formcontainer>
        <h1>Edit Product</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error?.data?.message}</Message>
        ) : (
          <Form onSubmit={submithandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="Name"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setname(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="admin">
              <Form.Check
                label='isAdmin'
                type="checkbox"
                checked={admin}
                onChange={()=>setadmin(!admin)}
              ></Form.Check>
            </Form.Group>
            <Button
              type="submit"
              variant="primary"
              style={{ marginTop: "10px" }}
              
            >
              Update
            </Button>
          </Form>
        )}
      </Formcontainer>
    </>
  );
}

export default Useredit;
