import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { updateShift } from '../../../http/managerAPI';
import { Context } from '../../..';
import { Link } from 'react-router-dom';


const ShiftUpdate = observer(() => {
    const {user} = useContext(Context)
    const {id} = useParams()

    // useEffect(() => {
    //     getDisease(id).then(data => {
    //         setTitle(data.title)
    //     })
    // }, [])


    const UpdateData = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('id', id);
            formData.append('whoAdd', user._userinfo);
            data = await updateShift(formData).then(data => {
            });
            toast.info(`Xonodon yangilandi`, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (e) {
            toast.error(e.response.data.message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Tarafni yangilash</title>
                </Helmet>
            </div>
            <Container>
                <h2 className='text-center'>Xonadon Yangilash</h2>
                <Row>
                    <Col>
                        1
                    </Col>
                </Row>
            </Container>
            <ToastContainer />

             ShiftUpdate
        </div>
    );
});

export default ShiftUpdate;