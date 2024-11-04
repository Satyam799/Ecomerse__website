import { Carousel, Image } from "react-bootstrap";
import { useGettopproductQuery } from "../Slices/Productapislice";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";

function Productcarosel() {
  const { data:carosal, isLoading, error } = useGettopproductQuery();


  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-primary mb-4">
      {carosal?.gettopproduct?.map((el) => {
        return (
          <Carousel.Item key={el?._id}>
            <Link to={`/product/${el?._id}`}>
              <Image src={el?.image} alt={el?.name} fluid />
              <Carousel.Caption className="carousel-caption">
                <h2>
                  {el?.name}
                  {el?.price}
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default Productcarosel;
