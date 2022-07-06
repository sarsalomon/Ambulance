import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { getDriver, fetchCar, updateDriver } from '../../../http/managerAPI';
import { Context } from '../../..';
import { MANAGER_DRIVER_ROUTE } from '../../../utils/consts';
import { Link } from 'react-router-dom';


const DriverUpdate = observer(() => {
    const {user} = useContext(Context)
    const {id} = useParams();
    const [cars,setCars] = useState([]);
    const [car,setCar] = useState('');
    const [title,setTitle] = useState('');
    const [phone,setPhone] = useState('');
    const [birthday,setBirthday] = useState('');
    const [address,setAddress] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
    
        UpdateData();
    };

 
    useEffect(() => {
        getDriver(id).then(data => {
            setTitle(data.title)
            setPhone(data.phone)
            setAddress(data.address)
            setBirthday(data.birthday)
            setCar(data.carId)
        })
    }, [])

    useEffect(() => {
        fetchCar().then(data => setCars(data));
    }, []);

    const UpdateData = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('id', id);
            formData.append('carId', car);
            formData.append('title', title);
            formData.append('phone', phone);
            formData.append('birthday', birthday);
            formData.append('address', address);
            formData.append('whoAdd', user._userinfo);
            data = await updateDriver(formData).then(data => {
                setCar(car);
                setTitle(title);
                setPhone(phone);
                setBirthday(birthday);
                setAddress(address);
                setAddress(car);
            });
            toast.info(`Haydovchi yangilandi`, {
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
                    <title>Haydovchini yangilash</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_DRIVER_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Haydovchini Yangilash</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Moshina tanlang</Form.Label>
                                <Form.Select
                                    value={car}
                                    onChange={(e) => {const seletcedCar = e.target.value
                                        setCar(seletcedCar);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {cars.map(car =>
                                            <option key={car._id}
                                                value={car._id} 
                                                selected={car._id == car ? true : false}
                                            >
                                                {car.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>F.I.SH</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Toshtimorv Sanjar'
                                    value={title}
                                    onChange={e=>setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                    <Col>
                        <Form.Group className="mb-3">
                                <Form.Label>Telefon Raqam</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='+998907548803'
                                    value={phone}
                                    onChange={e=>setPhone(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Manzil</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ezgulik 12'
                                    value={address}
                                    onChange={e=>setAddress(e.target.value)}
                                />
                            </Form.Group>
                        </Col> 
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Tug'ilgan kun</Form.Label>
                                <Form.Control
                                    type='date'
                                    value={birthday}
                                    onChange={e=>setBirthday(e.target.value)}
                                />
                            </Form.Group>
                        </Col> 
                    </Row>
                    <Row>
                        <Col className="text-end">
                            <Button variant="success" onClick={UpdateData}>Yangilash</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <ToastContainer />
        </div>
    );
});

export default DriverUpdate;