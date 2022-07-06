import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { Container, Row, Col, Button, ListGroup, Dropdown } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { MANAGER_APARTMENT_ROUTE, MANAGER_CAR_ROUTE, MANAGER_DISEASE_ROUTE, MANAGER_DISTRICT_ROUTE, MANAGER_DRIVER_ROUTE, MANAGER_ENTRANCE_ROUTE, MANAGER_FLOOR_ROUTE, MANAGER_HOUSE_ROUTE, MANAGER_MAP_ROUTE, MANAGER_OBJECT_ROUTE, MANAGER_POEPLE_ROUTE, MANAGER_SHIFT_ROUTE, MANAGER_SIDE_ROUTE, MANAGER_STATISTICS_ROUTE} from '../../utils/consts';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import { fetchTraking } from '../../http/managerAPI';

const ManagerDashboard = observer(() => {
    const [allItems, setAllItems] = useState([]);
    const markerIcon = new L.Icon({
        iconUrl: require(`../../assets/icons/white.png`),
        iconSize: [80, 40],
    });
    
    useEffect(()=>{
        const interval = setInterval(() => {
            fetchTraking().then(data => setAllItems(data));
        }, 3000);
        return () => clearInterval(interval);
    },[])
    

    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Manager boshqarish paneli</title>
                </Helmet>
            </div>
            <Container fluid>
                <Row>
                    <Col className='d-flex align-items-center justify-content-center'>
                        <ListGroup horizontal>
                            <Link to={MANAGER_DISTRICT_ROUTE}><Button variant='outline-success ms-4'>Manzil</Button></Link>
                            <Link to={MANAGER_OBJECT_ROUTE}><Button variant='outline-success ms-4'>Obyekt</Button></Link>
                            <Link to={MANAGER_SIDE_ROUTE}><Button variant='outline-success ms-4'>Taraf</Button></Link>
                            <Link to={MANAGER_ENTRANCE_ROUTE}><Button variant='outline-success ms-4'>Kirish</Button></Link>
                            <Link to={MANAGER_FLOOR_ROUTE}><Button variant='outline-success ms-4'>Qavat</Button></Link>
                            <Link to={MANAGER_HOUSE_ROUTE}><Button variant='outline-success ms-4'>Uy</Button></Link>
                            <Link to={MANAGER_APARTMENT_ROUTE}><Button variant='outline-success ms-4'>Xonodon</Button></Link>
                        </ListGroup>
                        <ListGroup horizontal>
                            <Link to={MANAGER_POEPLE_ROUTE}><Button variant='outline-success ms-4'>Bemor</Button></Link>
                            <Link to={MANAGER_CAR_ROUTE}><Button variant='outline-success ms-4'>Avtomobil</Button></Link>
                            <Link to={MANAGER_DRIVER_ROUTE}><Button variant='outline-success ms-4'>Haydovchi</Button></Link>
                            <Link to={MANAGER_DISEASE_ROUTE}><Button variant='outline-success ms-4'>Kasallik</Button></Link>
                            <Link to={MANAGER_SHIFT_ROUTE}><Button variant='outline-success ms-4'>Smena</Button></Link>
                            <Link to={MANAGER_STATISTICS_ROUTE}><Button variant='outline-success ms-4'>Statistika</Button></Link>
                            <Link to={MANAGER_MAP_ROUTE}><Button variant='outline-success ms-4'>Harita</Button></Link>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
            <Container fluid className='mt-5'>
                <Row>
                    <Col>
                        <MapContainer center={[40.905636, 69.6433945]} zoom={15} maxZoom={17} scrollWheelZoom={true} className={'ManagerMap'}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                            />
                             {allItems.map((item,index) =>
                                    <Marker position={[item.latitude, item.longitude]} icon={markerIcon}>
                                        <Popup>
                                            {item.title}
                                        </Popup>
                                    </Marker>
                                    )   
                                }
                        
                        </MapContainer>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default ManagerDashboard;