import { Col, Container, Row } from "react-bootstrap"

function Formcontainer({children}) {
    return (
        <Container>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    {children}
                </Col>

            </Row>
        </Container>
    )
}

export default Formcontainer
