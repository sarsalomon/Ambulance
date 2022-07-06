import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Button, Table, Form  } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';
import { confirmAlert } from 'react-confirm-alert';
import { Link, useNavigate } from 'react-router-dom';
import { deleteHouse, fetchHouse, fetchDistrict, fetchObject } from '../../../http/managerAPI';
import { MANAGER_ADD_HOUSE_ROUTE, MANAGER_GET_HOUSE_ROUTE } from '../../../utils/consts';
import Paginations from '../../../components/Paginations';
import * as excelJS from "exceljs";
import { saveAs } from "file-saver";

const HouseView = observer(() => {
    const [allItems, setAllItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const history = useNavigate();

    const [districts, setDistricts] = useState([]);
    const [district, setDistrict] = useState('');
    const [objects, setObjects] = useState([]);
    const [object, setObject] = useState('');

    useEffect(() => {
        fetchDistrict().then(data => setDistricts(data));
    }, []);

    useEffect(() => {
        if (district) {
            fetchObject().then(data => setObjects(data));
        }
    }, [district]);

    useEffect(()=>{
        fetchHouse(district, object).then(data => setAllItems(data));
    },[district, object]);


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
    
    const deleteH = async (id, district,  object) => {
        try{
            let data;
            data = await deleteHouse(id)
            if (data){
                fetchHouse(district,  object).then(data => setAllItems(data));
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

 
    const Housedelete = (id, district,  object) => {
        confirmAlert({
            title: 'O`chirishni tasdiqlang',
            message: 'Ishonchingiz komilmi Uyni o`chirishga?',
            buttons: [
              {
                label: 'Ha',
                onClick: () => deleteH(id, district,  object)
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
        const worksheet = workbook.addWorksheet("Uylar Ro'yhati");
        worksheet.columns = [
          { header: "№", key: "s_no", width: 10 }, 
          { header: "Tuman", key: "districtTitle", width: 30 },
          { header: "Obyekt", key: "objectTitle", width: 30 },
          { header: "Kirish", key: "entranceCount", width: 30 },
          { header: "Qavat", key: "floorCount", width: 30 },
          { header: "Nechtalik", key: "dualityortrinity", width: 30 },
          { header: "Boshlandi", key: "firstdoor", width: 30 },
          { header: "Tugadi", key: "objectId", width: 30 },
          { header: "Uzunlik", key: "latitude", width: 30 },
          { header: "Kenglik", key: "longitude", width: 30 },
          { header: "Nomi", key: "title", width: 30 }
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
            saveAs(blob, "Uylar Ro'yhati.xlsx");
        });
    }

    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Uylar</title>
                </Helmet>
            </div>
            <Container fluid>
                <span className='d-flex justify-content-between'>
                    <Link to={MANAGER_ADD_HOUSE_ROUTE}><Button variant='success'>Uy qo`shish</Button></Link>
                        <h2 className='text-center'>Uylar</h2>
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
                                    <th>Manzil</th>
                                    <th>Obyekt</th>
                                    <th>Kirish</th>
                                    <th>Qavat</th>
                                    <th>Nechtalik</th>
                                    <th>Boshlandi<br/>Tugadi</th>
                                    <th>Manzil</th>
                                    <th>Nomi</th>
                                    <th>Harakat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItem.map((item,index) =>
                                        <tr key={item._id}>
                                            <td>{cpi + index + 1}</td>
                                            <td>{item.districtTitle}</td>
                                            <td>{item.objectTitle}</td>
                                            <td>{item.entranceCount}</td>
                                            <td>{item.floorCount}</td>
                                            <td>{item.dualityortrinity}</td>
                                            <td>{item.firstdoor} - {item.entranceCount * item.floorCount * item.dualityortrinity}</td>
                                            <td><a href={`https://www.google.ru/maps/@${item.latitude},${item.longitude},50m/data=!3m1!1e3`} target="_blank" rel="noopener noreferrer">Google Xarita</a></td>
                                            <td>{item.title}</td>
                                            <td>
                                                <Button variant="primary" onClick={() => history(MANAGER_GET_HOUSE_ROUTE + '/' + item._id)}>Yangilash</Button>
                                                <Button variant="danger" className="ms-2" onClick={() => Housedelete(item._id, district, object)}>O'chirish</Button>
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

export default HouseView;