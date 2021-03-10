import React from 'react';

import {Card, Icon, message} from "antd";

import * as Yup from "yup";
import {Formik} from "formik";
import {Form, Input, InputNumber, ResetButton, SubmitButton} from "@jbuschke/formik-antd";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// onLoginSuccess
export default class LoginSection extends React.Component {


    onFormSubmit = async (values, {setSubmitting, resetForm}) => {
        await sleep(500);

        if (values.username === 'admin' && values.password === 'admin') {
            this.props.onLoginSuccess();
        } else {
            message.error('Credenciales incorrectas');
        }

        setSubmitting(false);
    };



    render() {

        const validationSchema = Yup.object().shape({
            username: Yup.string()
                .required('Username es requerido'),
            password: Yup.string()
                .required('Password es requerido')
        });

        return (<div style={{ }}>
            <Card title="BIENVENIDO" style={{width: 800, margin: "50px auto" }}>

            <Formik
                validationSchema={validationSchema}
                onSubmit={this.onFormSubmit}
                initialValues={ {username: "", password: ""} }
            >
                {() => (
                    <Form layout="inline" >
                        <h1>SISTEMAS OPERATIVOS 1 - PROYECTO #1</h1>
                        <h2>Andrea Vicente - Ruben Osorio</h2> 
                        <Form.Item label="" name="username" hidden>
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)', display: 'none' }} />}
                                name="username"
                                placeholder="Username" hidden/>
                        </Form.Item>

                        <Form.Item label="" name="password" hidden>
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)', display: 'none' }} />}
                                name="password"
                                type="password"
                                placeholder="Password" hidden/>
                        </Form.Item>

                        <SubmitButton>Vamos a ver!</SubmitButton>
                    </Form>
                )}

            </Formik>

        </Card>
        </div>);
    }
}