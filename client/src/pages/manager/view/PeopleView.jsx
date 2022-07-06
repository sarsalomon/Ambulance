import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Button, Table, Form  } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useNavigate } from 'react-router-dom';
import { deletePeople, fetchAllPeople, fetchApartment, fetchDistrict, fetchObject, fetchHouse, fetchPeople } from '../../../http/managerAPI';
import { MANAGER_ADD_POEPLE_ROUTE, MANAGER_GET_POEPLE_ROUTE } from '../../../utils/consts';
import Paginations from '../../../components/Paginations';
import * as excelJS from "exceljs";
import { saveAs } from "file-saver";

const PeopleView = observer(() => {
    const [allItems, setAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const history = useNavigate();

    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [objects, setObjects] = useState([]);
    const [object, setObject] = useState('');
    const [houses, setHouses] = useState([]);
    const [house, setHouse] = useState('');
    const [apartments, setApartments] = useState([]);
    const [apartment, setApartment] = useState('');



    useEffect(() => {
        fetchDistrict().then(data => setDistricts(data));
    }, []);

    useEffect(() => {
        if (district) {
            fetchObject().then(data => setObjects(data));
        }
    }, [district]);

    useEffect(() => {
        if (district && object) {
            fetchHouse(district, object).then(data => setHouses(data));
        }
    }, [district, object]);

    useEffect(()=>{
        if (district && object && house) {
            fetchApartment(district, object, house).then(data => setApartments(data));
        }
    },[district, object, house]);

    useEffect(()=>{
        if (district && object && house && apartment) {
            fetchPeople(district, object, house, apartment).then(data => setAllItems(data));

        }
    },[district, object, house, apartment]);

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
    
    const deleteP = async (id, district, object, house) => {
        try{
            let data;
            data = await deletePeople(id)
            if (data){
                fetchAllPeople(district, object, house).then(data => setAllItems(data));
                toast.success(`O'chirildi`, {
                    position: "bottom-left",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } catch (e) {
            toast.error(e.response.data.message, {
                position: "bottom-left",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

 
    const Peopledelete = (id, district, object, house) => {
        confirmAlert({
            title: 'O`chirishni tasdiqlang',
            message: 'Ishonchingiz komilmi Bemorni o`chirishga?',
            buttons: [
              {
                label: 'Ha',
                onClick: () => deleteP(id, district, object, house)
              },
              {
                label: 'Yo`q'
              }
            ],
            closeOnEscape: true,
            closeOnClickOutside: true,
          });
    }
    
    let cpi
    if(currentPage === 1){
        cpi = currentPage - 1
    }else if(currentPage >1){
        cpi = itemsPerPage * (currentPage - 1)
    }

    const DownloadXLSX = async () => {
        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet("Odamlar Ro'yhati");
        worksheet.columns = [
          { header: "№", key: "s_no", width: 10 }, 
          { header: "F.I.SH", key: "fish", width: 30 },
          { header: "Tuman", key: "districtTitle", width: 30 },
          { header: "Obyekt", key: "objectTitle", width: 30 },
          { header: "Uy", key: "houseTitle", width: 30 },
          { header: "Kirish", key: "entranceTitle", width: 30 },
          { header: "Qavat", key: "floorTitle", width: 30 },
          { header: "Taraf", key: "sideTitle", width: 30 },
          { header: "Xonadon", key: "apartmentTitle", width: 30 },
          { header: "Jins", key: "sex", width: 30 },
          { header: "Tug'ilgan yili", key: "birthday", width: 30 }
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
            saveAs(blob, "Odamlar Ro'yhati.xlsx");
        });
    }

    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Odamlar</title>
                </Helmet>
            </div>
            <Container fluid>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_ADD_POEPLE_ROUTE}><Button variant='success'>Bemor qo`shish</Button></Link>
                        <h2 className='text-center'>Odamlar</h2>
                    <Col md={2} xs={12}>
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
                </span>
                <Row>
                    <Form>
                        <Row>
                            <Col md={2} xs={12}>
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
                            <Col md={2} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Obyekt tanlang</Form.Label>
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
                            <Col md={2} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Uy tanlang</Form.Label>
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
                            <Col md={2} xs={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Xonadon tanlang</Form.Label>
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
                            <Col className='d-flex align-items-center justify-content-center'>
                                <Button onClick={DownloadXLSX}>Excel</Button>
                            </Col>
                        </Row>
                    </Form>
                </Row>
                <Row className="mt-3">
                    <Col>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fish</th>
                                    <th>Tuman</th>
                                    <th>Obyekt</th>
                                    <th>Uy</th>
                                    <th>Kirish</th>
                                    <th>Qavat</th>
                                    <th>Taraf</th>
                                    <th>Xonadon</th>
                                    <th>Jins</th>
                                    <th>Tug'ilgan yili</th>
                                    <th>Harakat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentItem.map((item,index) =>
                                        <tr key={item._id}>
                                            <td>{cpi + index + 1}</td>
                                            <td>{item.fish}</td>
                                            <td>{item.districtTitle}</td>
                                            <td>{item.objectTitle}</td>
                                            <td>{item.houseTitle}</td>
                                            <td>{item.entranceTitle}</td>
                                            <td>{item.floorTitle}</td>
                                            <td>{item.sideTitle}</td>
                                            <td>{item.apartmentTitle}</td>
                                            <td>{item.sex}</td>
                                            <td>{item.birthday}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => history(MANAGER_GET_POEPLE_ROUTE + '/' + item._id)}>Yangilash</Button>
                                                <Button variant="danger" className="ms-2" onClick={() => Peopledelete(item._id, district, object, house)}>O'chirish</Button>
                                            </td>
                                        </tr>
                                    )   
                                }
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

export default PeopleView;