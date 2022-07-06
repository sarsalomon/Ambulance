import React, { useEffect, useState } from 'react';
import {Helmet} from "react-helmet";
import { ToastContainer, toast } from 'react-toastify';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

const UserAdd = observer(() => {
    return (
        <div>
           <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Foydalanuvchi qo'shish</title>
                </Helmet>
            </div>
UserAdd
        </div>
    );
});

export default UserAdd;