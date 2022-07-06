import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col><a href="https://t.me/File00000000001" target="_blank">Yoshlar Texnoparki</a> tomonidan yaratilgan</Col>
                    <Col className='text-capitalize'>© Barcha huquqlar himoyalangan</Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;