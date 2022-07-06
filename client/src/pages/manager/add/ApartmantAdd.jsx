import React, { useContext, useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import {fetchDistrict, fetchObject, fetchHouse, addApartment, fetchEntrance, fetchFloor, fetchSide } from '../../../http/managerAPI';
import { Context } from '../../..';
import { Link } from 'react-router-dom';
import { MANAGER_APARTMENT_ROUTE } from '../../../utils/consts';

const ApartmantAdd = observer(() => {
    const {user} = useContext(Context)
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [objects, setObjects] = useState([]);
    const [object, setObject] = useState('');
    const [houses, setHouses] = useState([]);
    const [house, setHouse] = useState('');
    const [entrances, setEntrances] = useState([]);
    const [entrance, setEntrance] = useState('');
    const [floors, setFloors] = useState([]);
    const [floor, setFloor] = useState('');
    const [sides, setSides] = useState([]);
    const [side, setSide] = useState('');
    const [title, setTitle] = useState('');
  

    const handleSubmit = event => {
        event.preventDefault();
    
        DataAdd();
    };


    useEffect(() => {
        fetchDistrict().then(data => setDistricts(data));
    }, []);

    useEffect(() => {
        if (district) {
            fetchObject(district).then(data => setObjects(data));
        }
    }, [district]);

    useEffect(() => {
        if (district && object) {
            fetchHouse(district, object).then(data => setHouses(data));
            fetchEntrance().then(data => setEntrances(data));
            fetchFloor().then(data => setFloors(data));
            fetchSide().then(data => setSides(data));
        }
    }, [district, object]);


    const DataAdd = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('districtId', district);
            formData.append('objectId', object);
            formData.append('houseId', house);
            formData.append('entranceId', entrance);
            formData.append('floorId', floor);
            formData.append('sideId', side);
            formData.append('title', title);
            formData.append('whoAdd', user._userinfo);
            data = await addApartment(formData).then(data => {
            });
            toast.success(`Xonodon tizimga qo'shildi`, {
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
                    <title>Xonadon qo'shish</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_APARTMENT_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Xonadon qo'shish</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Manzil tanlash</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setDistrict(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {districts.map(district =>
                                            <option key={district._id}
                                                value={district._id} 
                                            >
                                                {district.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Obyekt</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setObject(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {objects.map(object =>
                                            <option key={object._id}
                                                value={object._id} 
                                            >
                                                {object.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Uy</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setHouse(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {houses.map(house =>
                                            <option key={house._id}
                                                value={house._id} 
                                            >
                                                {house.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Kirish</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setEntrance(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {entrances.map(entrance =>
                                            <option key={entrance._id}
                                                value={entrance._id} 
                                            >
                                                {entrance.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Qavat</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setFloor(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {floors.map(floor =>
                                            <option key={floor._id}
                                                value={floor._id} 
                                            >
                                                {floor.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Taraf</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setSide(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {sides.map(side =>
                                            <option key={side._id}
                                                value={side._id} 
                                            >
                                                {side.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Nomi</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='4'
                                    value={title}
                                    onChange={e=>setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-end">
                            <Button variant="success" onClick={DataAdd}>Qo`shish</Button>
                        </Col>
                    </Row>
                </Form>
                <ToastContainer />
            </Container>
        </div>
    );
});

export default ApartmantAdd;