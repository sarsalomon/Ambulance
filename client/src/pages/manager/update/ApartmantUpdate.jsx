import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { getApartment, updateApartment, fetchDistrict, fetchObject, fetchHouse, fetchEntrance, fetchFloor, fetchSide } from '../../../http/managerAPI';
import { Context } from '../../..';
import { Link } from 'react-router-dom';
import { MANAGER_APARTMENT_ROUTE } from '../../../utils/consts';

const ApartmantUpdate = observer(() => {
    const {user} = useContext(Context)
    const {id} = useParams()
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
    
        UpdateData();
    };

 
    useEffect(() => {
        getApartment(id).then(data => {
            setDistrict(data.districtId);
            setObject(data.objectId);
            setHouse(data.houseId);
            setEntrance(data.entranceId);
            setFloor(data.floorId);
            setSide(data.sideId);
            setTitle(data.title);
        })
    }, [])

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

    const UpdateData = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('id', id);
            formData.append('districtId', district);
            formData.append('objectId', object);
            formData.append('houseId', house);
            formData.append('entranceId', entrance);
            formData.append('floorId', floor);
            formData.append('sideId', side);
            formData.append('title', title);
            formData.append('whoAdd', user._userinfo);
            data = await updateApartment(formData).then(data => {
                setDistrict(district);
                setObject(object);
                setHouse(house);
                setEntrance(entrance);
                setFloor(floor);
                setSide(side);
                setTitle(title);
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
                    <title>Xonadoni yangilash</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_APARTMENT_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Xonadoni Yangilash</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Manzil tanlash</Form.Label>
                                <Form.Select
                                    value={district}
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setDistrict(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {districts.map(district =>
                                            <option key={district._id}
                                                value={district._id} 
                                                selected={district._id == district ? true : false}
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
                                    value={object}
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setObject(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {objects.map(object =>
                                            <option key={object._id}
                                                value={object._id} 
                                                selected={object._id == object ? true : false}
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
                                    value={house}
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setHouse(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {houses.map(house =>
                                            <option key={house._id}
                                                value={house._id} 
                                                selected={house._id == house ? true : false}
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
                                    value={entrance}
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setEntrance(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {entrances.map(entrance =>
                                            <option key={entrance._id}
                                                value={entrance._id} 
                                                selected={entrance._id == entrance ? true : false}
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
                                    value={floor}
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setFloor(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {floors.map(floor =>
                                            <option key={floor._id}
                                                value={floor._id} 
                                                selected={floor._id == floor ? true : false}
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
                                    value={side}
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setSide(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {sides.map(side =>
                                            <option key={side._id}
                                                value={side._id} 
                                                selected={side._id == side ? true : false}
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
                            <Button variant="success" onClick={UpdateData}>Qo`shish</Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <ToastContainer />
        </div>
    );
});

export default ApartmantUpdate;