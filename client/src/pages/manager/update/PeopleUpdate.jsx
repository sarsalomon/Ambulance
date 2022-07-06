import React, { useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { getPeople, fetchTerritory, fetchCityOrVillage, fetchDistrict, fetchNeighborhood, fetchHouse, fetchApartment, updatePeople } from '../../../http/managerAPI';
import { Context } from '../../..';
import { MANAGER_POEPLE_ROUTE } from '../../../utils/consts';
import { Link } from 'react-router-dom';


const PeopleUpdate = observer(() => {
    const {user} = useContext(Context);
    const {id} = useParams();
    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [houses, setHouses] = useState([]);
    const [house, setHouse] = useState('');
    const [apartments, setApartments] = useState([]);
    const [apartment, setApartment] = useState('');
    const [sex, setSex] = useState('');
    const [birthday, setBirthday] = useState('');
    const [fish, setFish] = useState('');
    const [objects, setObjects] = useState([]);
    const [object, setObject] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
    
        UpdateData();
    };

 
    useEffect(() => {
        getPeople(id).then(data => {
            setFish(data.fish)
            setBirthday(data.birthday)
        })
    }, [])

    useEffect(() => {
        fetchDistrict().then(data => setDistricts(data));
    }, []);

    useEffect(() => {
        if (district) {
            fetchHouse(district).then(data => setHouses(data));
        }
    }, [district]);

    useEffect(() => {
        if (district && house) {
            fetchApartment(district, house).then(data => setApartments(data));
        }
    }, [district, house]);

    const UpdateData = async () => {
        try{
            let data;
            const formData = new FormData();
            formData.append('id', id);
            formData.append('districtId', district);
            formData.append('houseId', house);
            formData.append('apartmentId', apartment);
            formData.append('objectId', object);
            formData.append('sex', sex);
            formData.append('birthday', birthday);
            formData.append('fish', fish);
            formData.append('whoAdd', user._userinfo);
            data = await updatePeople(formData).then(data => {
                setDistrict(district);
                setHouse(house);
                setApartment(apartment);
                setObject(object);
                setSex('');
                setFish(fish)
                setBirthday(birthday)
            });
            toast.info(`Foydalanuvchi yangilandi`, {
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
                    <title>Odamni yangilash</title>
                </Helmet>
            </div>
            <Container>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_POEPLE_ROUTE}><Button className='text-start'>Orqaga qaytish</Button></Link>
                    <h2 className='text-center'>Odamni Yangilash</h2>
                    <span></span>
                </span>

                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Tuman tanlash</Form.Label>
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
                                <Form.Label>Xonadon</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedItem = e.target.value
                                        setApartment(seletcedItem);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                        {apartments.map(apartment =>
                                            <option key={apartment._id}
                                                value={apartment._id} 
                                            >
                                                {apartment.title}
                                        </option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Jins tanlash</Form.Label>
                                <Form.Select
                                    onChange={(e) => {const seletcedSex = e.target.value
                                        setSex(seletcedSex);
                                    }}
                                >  
                                    <option value={''}>tanlang</option>
                                    <option value={'M'}>Erkak</option>
                                    <option value={'F'}>Ayol</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Ism Familiya Sharif</Form.Label>
                                <Form.Control
                                    type='text'
                                    placeholder='Ozoda Egamberdiyeva Begzodovna'
                                    value={fish}
                                    onChange={e=>setFish(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label>Tug'ilgan yili</Form.Label>
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

export default PeopleUpdate;