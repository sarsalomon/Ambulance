import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
import { fetchStatisticHistory, fetchDistrict, fetchDisease, fetchDiseaseInfo, fetchApartment, fetchHouse } from '../../../http/managerAPI';
import Paginations from '../../../components/Paginations';
import * as excelJS from "exceljs";
import { saveAs } from "file-saver";

const StatisticsView = observer(() => {
    const [allItems, setAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const history = useNavigate();

    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [houses, setHouses] = useState([]);
    const [house, setHouse] = useState('');
    const [apartments, setApartments] = useState([]);
    const [apartment, setApartment] = useState('');
    const [diseases, setDiseases] = useState([]);
    const [disease, setDisease] = useState('');
    const [diseasesinfo, setDiseasesInfo] = useState([]);
    const [diseaseinfo, setDiseaseInfo] = useState('');
    const [callDatefrom, setCallDateFrom] = useState('');
    const [callDateto, setCallDateTo] = useState('');


    useEffect(() => {
        fetchDisease().then(data => setDiseases(data));
    }, []);

    useEffect(() => {
        if(disease){
            fetchDiseaseInfo(disease).then(data => setDiseasesInfo(data));
        }
    }, [disease]);

    useEffect(() => {
        fetchDistrict().then(data => setDistricts(data));
    }, []);

    useEffect(() => {
        if(district){
            fetchHouse(district).then(data => setHouses(data));
        }
    }, [district]);

  
    useEffect(() => {
        if(district && house){
            fetchApartment(district, house).then(data => setApartments(data));
        }
    }, [district, house]);

    useEffect(() => {
        if (callDatefrom == '') {
            // let callDatefrom = new Date('2000 01 02').toISOString().slice(0, 10);
            let today = new Date();
            let callDatefrom = today.getFullYear()+ "-" + ((today.getMonth() < 10 ? '0' : '') +  String(Number(today.getMonth()) + Number(1))) + "-" + ((today.getDate() < 10 ? '0' : '') + String(Number(today.getDate())));
            if (callDateto == '') {
                let today = new Date();
                let date = today.getFullYear()+ "-" + ((today.getMonth() < 10 ? '0' : '') +  String(Number(today.getMonth()) + Number(1))) + "-" + ((today.getDate() < 10 ? '0' : '') + String(Number(today.getDate()) + Number(1)));
                let callDateto = date
                fetchStatisticHistory(district, house, apartment, disease, diseaseinfo, callDatefrom, callDateto).then(data => setAllItems(data));
            } else {
                fetchStatisticHistory(district, house, apartment, disease, diseaseinfo, callDatefrom, callDateto).then(data => setAllItems(data));
            }
        } else {
            if (callDateto == '') {
                let today = new Date();
                let date = today.getFullYear()+ "-" + ((today.getMonth() < 10 ? '0' : '') +  String(Number(today.getMonth()) + Number(1))) + "-" + ((today.getDate() < 10 ? '0' : '') + String(Number(today.getDate()) + Number(1)));
                let callDateto = date
                fetchStatisticHistory(district, house, apartment, disease, diseaseinfo, callDatefrom, callDateto).then(data => setAllItems(data));
            } else {
                fetchStatisticHistory(district, house, apartment, disease, diseaseinfo, callDatefrom, callDateto).then(data => setAllItems(data));
            }
        }
    }, [district, house, apartment, disease, diseaseinfo, callDatefrom, callDateto]);


    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage
    const currentItem = allItems.slice(firstItemIndex, lastItemIndex)

    const paginate = pageNumber => setCurrentPage(pageNumber)

    let paginates = null
    if(allItems.length>5){
      paginates =  <Paginations
      itemsPerPage={itemsPerPage}
      totalItems={allItems.length}
      paginate={paginate}
      currentPage={currentPage}
  />
    }

    let cpi
    if(currentPage === 1){
        cpi = currentPage - 1
    }else if(currentPage >1){
        cpi = itemsPerPage * (currentPage - 1)
    }

    
    const DownloadXLSX = async () => {
            const workbook = new excelJS.Workbook();
            const worksheet = workbook.addWorksheet("Ro'yhat");
            worksheet.columns = [
              { header: "№", key: "s_no", width: 10 }, 
              { header: "Manzil", key: "districtId", width: 30 },
              { header: "Uy", key: "houseId", width: 30 },
              { header: "Kirish", key: "entranceId", width: 30 },
              { header: "Qavat", key: "floorId", width: 30 },
              { header: "Taraf", key: "sideId", width: 30 },
              { header: "Xonodon", key: "apartmentId", width: 30 },
              { header: "Bemor", key: "peopelId", width: 30 },
              { header: "Kasallik", key: "diseaseId", width: 30 },
              { header: "Tashxis", key: "diseaseInfoId", width: 30 },
              { header: "Boshliqgich Manzil", key: "blatitude", width: 30 },
              { header: "Yo'lga tushgan vaqt", key: "driverstartTime", width: 30 },
              { header: "Oxirgi Manzil", key: "elatitude", width: 30 },
              { header: "Yetib kelgan vaqt", key: "driverendTime", width: 30 },
              { header: "Tashxis vaqi", key: "doctorendTime", width: 30 }
          ];

        let counter = 1;
        allItems.forEach((user) => {
        user.s_no = counter;
        worksheet.addRow(user);
        counter++;
        });

        worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
        });

        workbook.xlsx.writeBuffer().then(function(buffer) {
            const blob = new Blob([buffer], { type: "applicationi/xlsx" });
            saveAs(blob, "Ro'yhat.xlsx");
        });
    }

    return (
        <div>
            <Container fluid>
                <div className="application">
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Statistika</title>
                    </Helmet>
                </div>
                <h2 className='text-center'>Statistika</h2>
                <Row>
                    <Form>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tuman tanlang</Form.Label>
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
                                    <Form.Label>Uylar tanlang</Form.Label>
                                    <Form.Select
                                        onChange={(e) => {const seletcedItem = e.target.value
                                            setHouse(seletcedItem);
                                        }}
                                    >  
                                    <option value={''}>Uylar</option>
                                        {houses.map(house =>
                                            <option  key={house._id}
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
                                    <Form.Label>Xonodonlar</Form.Label>
                                    <Form.Select
                                        onChange={(e) => {const seletcedItem = e.target.value
                                            setApartment(seletcedItem);
                                        }}
                                    >  
                                    <option value={''}>Xonodonlar</option>
                                        {apartments.map(apartment =>
                                            <option  key={apartment._id}
                                                value={apartment._id} 
                                            >
                                                {apartment.title}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Kasallik tanlang</Form.Label>
                                    <Form.Select
                                        onChange={(e) => {const seletcedItem = e.target.value
                                            setDisease(seletcedItem);
                                        }}
                                    >  
                                        <option value={''}>tanlang</option>
                                            {diseases.map(disease =>
                                                <option key={disease._id}
                                                    value={disease._id} 
                                                >
                                                    {disease.title}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tashxis tanlang</Form.Label>
                                    <Form.Select
                                        onChange={(e) => {const seletcedItem = e.target.value
                                            setDiseaseInfo(seletcedItem);
                                        }}
                                    >  
                                        <option value={''}>tanlang</option>
                                            {diseasesinfo.map(diseasesinf =>
                                                <option key={diseasesinf._id}
                                                    value={diseasesinf._id} 
                                                >
                                                    {diseasesinf.title}
                                            </option>
                                        )}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dan</Form.Label>
                                    <Form.Control type="date" placeholder="name@example.com" value={callDatefrom} onChange={e=>setCallDateFrom(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Gacha</Form.Label>
                                    <Form.Control type="date" placeholder="name@example.com" value={callDateto} onChange={e=>setCallDateTo(e.target.value)}/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nechtalik</Form.Label>
                                    <Form.Select
                                        onChange={(e) => {const seletcedItem = e.target.value
                                            setItemsPerPage(seletcedItem);
                                        }}
                                    >  
                                        <option value={5}>tanlang</option>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={25}>25</option>
                                        <option value={50}>50</option>
                                        <option value={100}>100</option>
                                        <option value={250}>250</option>
                                        <option value={500}>500</option>
                                        <option value={1000}>1000</option>
                                        <option value={allItems.length}>{allItems.length}</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col className='d-flex align-items-center justify-content-center'>
                                <Button onClick={DownloadXLSX}>Excel</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>
                                        Manzil - Obyekt
                                    </th>
                                    <th>
                                        Kirish - Qavat - Taraf - Xonodon
                                    </th>
                                    <th>
                                        Kasallik - Tashxis
                                        <br/>                                    
                                        Manzil
                                        <br/>                                    
                                        Holati
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItem.map((statistics, index)  =>
                                    <tr
                                        key={statistics._id}
                                    >
                                        <td>{cpi + index + 1}</td>
                                        <th>
                                            {statistics.districtTitle} -   {statistics.houseTitle}
                                        </th>
                                        <th>
                                            {statistics.entranceTitle} - {statistics.floorTitle} - {statistics.sideTitle} - {statistics.apartmentTitle}
                                        </th>
                                        <th>
                                            {statistics.peopleTitle}
                                            <br/>
                                            {statistics.diseaseTitle} - {statistics.diseaseInfoTitle}
                                            <br/>
                                            <a href={`https://www.google.ru/maps/@${statistics.blatitude},${statistics.blongitude},50m/data=!3m1!1e3`} target="_blank" rel="noopener noreferrer">Boshlangich</a> - <a href={`https://www.google.ru/maps/@${statistics.elatitude},${statistics.elongitude},50m/data=!3m1!1e3`} target="_blank" rel="noopener noreferrer">Yakuniy</a>
                                            <br/>
                                            {statistics.status}
                                        </th>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                {paginates}
                <ToastContainer />
            </Container>
        </div>
    );
});

export default StatisticsView;