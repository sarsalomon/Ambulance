import { observer } from 'mobx-react-lite';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = observer(() => {
    return (
        <footer className='mt-4'>
            <Container>
                <Row>
                    <Col><a href="https://t.me/File00000000001" target="_blank">Yoshlar Texnoparki</a> tomonidan yaratilgan (Create by Las)</Col>
                    <Col className='text-capitalize'>© Barcha huquqlar himoyalangan</Col>
                </Row>
            </Container>
        </footer>
    );
});

export default Footer;