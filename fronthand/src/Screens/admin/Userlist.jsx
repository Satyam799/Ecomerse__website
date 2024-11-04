import { Button, Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Loader from "../../Component/Loader";
import Message from "../../Component/Message";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useAllusersQuery, useDeleteuserMutation } from "../../Slices/userApiSlice";

function UserList() {
  const { data: userlist, refetch,isLoading, error } =   useAllusersQuery();
  const [Deleteuser,{isLoading:deleteloading,error:deleteerror}]=useDeleteuserMutation()

  async function deletehandler(id){
  
    try{
      const res=await Deleteuser(id).unwrap()
      refetch()
      toast.success('Deleted successfully')
    }catch(err){
      toast.error(err?.data?.message||'Unable to deletew')
    }

  }

async function Addnewproduct(e){
 
}


  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={Addnewproduct}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error?.data?.message}</Message>
      ) :(
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>isAdmin</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userlist?.map((item)=>(
               <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item?.name}</td> 
                <td>{item?.email}</td>
                <td> {item?.isAdmin ? <FaCheck style={{color:'green'}}/>:<FaTimes style={{color:'red'}}/>}</td>
                <td>
                  <LinkContainer to={`/admin/userlist/${item._id}/edit`}>
                    <Button type='button' variant='light' className="btn-sm mx-2"><FaEdit/></Button>
                  </LinkContainer>
                  <Button variant="danger"  className="btn-sm" onClick={()=>deletehandler(item?._id)}>
                        <FaTrash style={{color:'white'}}/>
                  </Button>
                </td>
              </tr>

            ))}
          </tbody>
        </Table>
      )
}
</>
)
}
export default UserList;
