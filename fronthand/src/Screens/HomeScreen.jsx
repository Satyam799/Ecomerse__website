import {  Col, Row } from "react-bootstrap";
import Product from "../Component/Product";
import {useGetProductsQuery } from "../Slices/Productapislice";
import Loader from "../Component/Loader";
import { Link, useParams } from "react-router-dom";
import Paginate from "../Component/Paginate";
import Productcarosel from "../Component/Carosel";

function HomeScreen() {

  const {pageNumber,keyword}=useParams()

  const { data, isLoading, isError } = useGetProductsQuery({pageNumber,keyword})


  return (
    <>
    {keyword ? <Link to='/' className=" btn btn-light mb=4">GoBack</Link>:<Productcarosel/>}
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <div>{isError}</div>
      ) : (
        <>
          <h1>Latest Product</h1>
          <Row>
            {data.data?.map((product) => {
              return (
                <Col key={product._id} sm={12} md={8} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate page={data.page} pages={data.pages} keyword={keyword}/>
        </>
      )}
    </>
  );
}

export default HomeScreen;
