import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Container, Row, Col } from 'react-bootstrap';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import L from 'leaflet';
import { fetchTraking } from '../../../http/managerAPI';

const MapView = observer(() => {
    const [allItems, setAllItems] = useState([]);

    const markerIcon = new L.Icon({
        iconUrl: require(`../../../assets/icons/white.png`),
        iconSize: [80, 40],
    });

    useEffect(()=>{
        const interval = setInterval(() => {
            fetchTraking().then(data => setAllItems(data));
        }, 1000);
        return () => clearInterval(interval);
    },[])

    return (
        <div>
            <Container fluid>
                <Row>
                    <Col>
                        <MapContainer center={[40.905636, 69.6433945]} zoom={15} maxZoom={17} scrollWheelZoom={true}>
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

export default MapView;