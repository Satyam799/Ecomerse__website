import { Button, Col, Table } from "react-bootstrap"
import { useDeliveredstatusupdateMutation, useGetAllordersQuery } from "../../Slices/Orderapislice"
import Loader from "../../Component/Loader"
import Message from "../../Component/Message"
import { LinkContainer } from "react-router-bootstrap"
import { FaTimes } from "react-icons/fa"

function OrderListscreen() {

    const {data:Myorders,isLoading,error:dataerror}=useGetAllordersQuery()
 
    
    return (
        <>
        <h1>Orders</h1>
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
      </>
    )
}

export default OrderListscreen
