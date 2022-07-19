import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Button, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

import Alert from '../component/Alert';
import { Input } from '../component/Input';
import axios from 'axios';

export default function Login() {

  const [alert, setAlert] = useState([])
  const addAlert = (add_alert) => setAlert([...alert, add_alert])

  let navigate = useNavigate()
  return (
    <>
      <Container>
        <Row className="justify-content-md-center mt-4">
          <Col md={6}>
            <Alert alert={alert} setAlert={setAlert} />
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>{process.env.REACT_APP_NAME} - Área de clientes</Card.Title>
                <Card.Text>
                  Digite seu CPF ou CNPJ para consultar seus pedidos
                </Card.Text>
                <Formik
                  initialValues={{
                    cnpj_cpf: ''
                  }}
                  validationSchema={
                    Yup.object({
                      cnpj_cpf: Yup.string()
                        .required('Preenchimento obrigatório')
                    })}
                  onSubmit={(values, { setSubmitting }) => {
                    axios.post(process.env.REACT_APP_API_URL+"/auth", values)
                      .then(response => {
                        // Verifica a autenticação do usuário
                        if (response.status === 200 && response.data.status) {
                          localStorage.setItem('cnpj_cpf', response.data.cnpj_cpf)
                          localStorage.setItem('customer', response.data.name)
                          navigate('/customer/order')
                        } else {
                          setSubmitting(false)
                          addAlert({
                            variant: 'danger',
                            title: 'Ops,',
                            content: 'Não foi possivel consultar seus pedidos, verifique suas credenciais e tente novamente, se o problema persistir entre em contato com o nosso suporte.'
                          })
                        }
                      })
                      .catch(err => {
                        console.log(err);
                        setSubmitting(false)
                        addAlert({
                          variant: 'danger',
                          title: 'Ops,',
                          content: 'Não foi possivel consultar seus pedidos, verifique suas credenciais e tente novamente, se o problema persistir entre em contato com o nosso suporte.'
                        })
                        console.error("Erro: " + err);
                      });
                  }}
                >
                  {formik => (
                    <Form>
                      <Input as={CpfCnpj} 
                        id="cnpj_cpf"
                        name="cnpj_cpf"
                        type="text"
                        placeholder="CPF/CNPJ" />
                      {
                        formik.isSubmitting
                          ? <Button variant="primary" type="submit" disabled={formik.isSubmitting}><Spinner animation="grow" size="sm" /> Carregando</Button>
                          : <Button variant="primary" type="submit">Consultar</Button>
                      }
                    </Form>
                  )}
                </Formik>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}