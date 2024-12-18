import { Col, Container, Row } from "react-bootstrap";

function Footer() {
  const currentyear = new Date().getFullYear();

  return (
    <footer>
      <Container>
        <Row>
            <Col className="text-center py-3">
                <p>ProShop &copy; {currentyear}</p>
            </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
