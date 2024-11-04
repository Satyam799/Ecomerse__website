import { useState } from "react"
import { Button, Form, FormControl } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

function SearchBox() {

    const navigate=useNavigate()
    const {keyword:urldata}=useParams()
    const [keyword,setKeyword]=useState(urldata || '')

    function handelsubmit(e){
        e.preventDefault()

       keyword ?  navigate(`/search/${keyword}`):navigate('/')

       setKeyword('')

    }



    return (
        <Form className="d-flex" onSubmit={handelsubmit}>
            <FormControl className="mr-sm-2 ml-sm-5"
                onChange={(e)=>setKeyword(e.target.value)}
                value={keyword}
                type="text"
                placeholder="Search Product..."
            >

            </FormControl>
            <Button type="submit" variant="outline-light" className="p-2 mx-2">Search</Button>
        </Form>
    )
}

export default SearchBox
