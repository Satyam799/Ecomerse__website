import {  useNavigate, useParams } from "react-router-dom"
import { useGetProductdetailsQuery, usePhotoUploadMutation, useUpdateproductMutation } from "../../Slices/Productapislice"
import { useEffect, useState } from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Button, Form } from "react-bootstrap"
import Formcontainer from "../../Component/Formcontainer"
import Loader from "../../Component/Loader"
import Message from "../../Component/Message"
import { toast } from "react-toastify"

function Productedit() {

    const navigate=useNavigate()


    const {id}=useParams()
    const [updateproduct,{isLoading:updateloading,error:errorupdate}]=useUpdateproductMutation()
    const {data:productdata,refetch,isLoading,error}=useGetProductdetailsQuery(id)
    const [uploadimage,{isLoading:uplaodloading,error:uploadeerror}]=usePhotoUploadMutation()


    const [name,setname]=useState()
    const [price,setprice]=useState()
    const [brand,setbrand]=useState()
    const [category,setcategory]=useState()
    const [countInStock,setcountInStock]=useState()
    const [description,setdescription]=useState()
    const [imageurl,setimageurl]=useState()
    useEffect(function(){
        if(productdata){
            setname(productdata.name)
            setprice(productdata.price)
            setbrand(productdata.brand)
            setcategory(productdata.category)
            setcountInStock(productdata.countInStock)
            setdescription(productdata.description)
            setimageurl(productdata.image)
        }
    },[productdata])

    async function submithandler(e){
        e.preventDefault()
        try{
            await updateproduct({ id,name,price,category,countInStock,brand,description,imageurl})
            refetch()
            navigate('/admin/productlist')
            toast.success('Product is updated')
        }catch(err){
            console.log(err)
            toast.error('Unable to update the product')
        }

    }
async function uploadimagesubmit(e){
    e.preventDefault()
    console.log(e.target.files[0])
    const formdata=new FormData()
    formdata.append('image',e.target.files[0])
    try{
       const res= await uploadimage(formdata).unwrap()
        setimageurl(res.image)
        toast.success('Image is uploaded successfully')
    }catch(err){
        toast.error('Unable to upload the image')
    }
}


    return (
      <>
        <LinkContainer to={'/admin/productlist'}>
            <Button variant="light">Go Back</Button>
        </LinkContainer>
        <Formcontainer>
            <h1>Edit Product</h1>
            {updateloading && <Loader/>}
            {isLoading ? <Loader/> : error ? <Message>{error?.data?.message}</Message> : (
                <Form onSubmit={submithandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="Name" placeholder="Enter Name" value={name} onChange={(e)=>setname(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="price" placeholder="Enter price" value={price} onChange={(e)=>setprice(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="brand" placeholder="Enter brand" value={brand} onChange={(e)=>setbrand(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control type="text" placeholder="Enter Image" value={imageurl} onChange={(e)=>setimageurl(e.target.value)}></Form.Control>
                        <Form.Control type="file" label='Upload file' onChange={uploadimagesubmit}></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="category" placeholder="Enter category" value={category} onChange={(e)=>setcategory(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="countInStock">
                        <Form.Label>CountInStock</Form.Label>
                        <Form.Control type="countInStock" placeholder="Enter countInStock" value={countInStock} onChange={(e)=>setcountInStock(e.target.value)}>
                        
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="description" placeholder="Enter description" value={description} onChange={(e)=>setdescription(e.target.value)}>

                        </Form.Control>
                    </Form.Group>
                    <Button type='submit' variant='primary' style={{marginTop:'10px'}}>Update</Button>
                </Form>
        )}
        </Formcontainer>
      </>
    )
}

export default Productedit
