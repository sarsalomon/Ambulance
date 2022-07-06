import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

const Home = observer(() => {
    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Bosh sahifa</title>
                </Helmet>
            </div>
            <Container>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label><h4>Bemorni qidirish</h4></Form.Label>
                                <Form.Control type="text" 
                                    placeholder="Turdiyev Bahodir Pardaboy o`g`li"     
                                    // value={name}
                                    // onChange={e=>setName(e.target.value)} 
                                />
                            </Form.Group>
                        </Form>
                        <ul className="search_result">
                            
                        </ul>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Home;