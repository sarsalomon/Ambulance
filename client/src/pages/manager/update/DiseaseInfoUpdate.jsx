import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { updateDiseaseInfo } from '../../../http/managerAPI';
import { Context } from '../../..';
import { MANAGER_DISEASE_ROUTE } from '../../../utils/consts';
import { Link } from 'react-router-dom';


const DiseaseInfoUpdate = observer(() => {
    const {user} = useContext(Context)
    const {id} = useParams()

    const handleSubmit = event => {
        event.preventDefault();
    
        UpdateData();
    };

 
    const UpdateData = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('id', id);
            formData.append('whoAdd', user._userinfo);
            data = await updateDiseaseInfo(formData).then(data => {
            });
            toast.info(`Xonodon tizimga qo'shildi`, {
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
                    <title>Tasxisni yangilash</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_DISEASE_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Tasxisni Yangilash</h2>
                    <span></span>
                </span>

                <Row onSubmit={handleSubmit}>
                    <Col>
                        1
                    </Col>
                </Row>
            </Container>
            <ToastContainer />

             DiseaseInfoUpdate
        </div>
    );
});

export default DiseaseInfoUpdate;