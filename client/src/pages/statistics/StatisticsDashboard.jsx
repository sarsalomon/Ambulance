import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const StatisticsDashboard = observer(() => {
    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Statistika boshqarish paneli</title>
                </Helmet>
            </div>
            Static
        </div>
    );
});

export default StatisticsDashboard;