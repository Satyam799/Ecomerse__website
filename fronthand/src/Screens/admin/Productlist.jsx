import { Button, Col, Row, Table } from "react-bootstrap";
import { useCreateproductMutation, useDeleteproductMutation, useGetProductsQuery } from "../../Slices/Productapislice";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Loader from "../../Component/Loader";
import Message from "../../Component/Message";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../../Component/Paginate";

function Productlist() {

  const {pageNumber,keyword}=useParams()
  const { data, refetch,isloading, error } = useGetProductsQuery({pageNumber,keyword});
  const [Createproduct,{isLoading,error:handelingerror}]=useCreateproductMutation()
  const [deletedata,{isloading:deleteloading,error:deleteerror}]=useDeleteproductMutation()



  async function deletehandler(id){
    window.confirm('Aur You sure you wnat to delet the product')
      try{
        await deletedata(id).unwrap()
        refetch()
        toast.success('Data is delete succesdsully')
      }catch(err){
        toast.error('Unable to delete the product')
      }
    }

async function Addnewproduct(e){
  e.preventDefault()
  if(window.confirm('Are you sure want to create  the product ?'))
  try{
    await Createproduct().unwrap()
    refetch()
    toast.success('Product is created successfully')
  }catch(err){
    toast.error('Product is nnot created ')

  }
}


  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={Addnewproduct}>
            <FaEdit /> Create Product
          </Button>
        </Col>
      </Row>
      {isloading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error?.data?.Message}</Message>
      ) :(
        <>
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item)=>(
               <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item?.name}</td> 
                <td>{item?.price}</td>
                <td> {item?.category}</td>
                <td>{item?.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${item._id}/edit`}>
                    <Button type='button' variant='light' className="btn-sm mx-2"><FaEdit/></Button>
                  </LinkContainer>
                  <Button variant="danger"  className="btn-sm" onClick={()=>deletehandler(item._id)}>
                        <FaTrash style={{color:'white'}}/>
                  </Button>
                </td>
              </tr>

            ))}
          </tbody>
        </Table>
        <Paginate page={data?.page} pages={data?.pages} isAdmin={true}/>
        </>
      )
}
</>
)
}
export default Productlist;
