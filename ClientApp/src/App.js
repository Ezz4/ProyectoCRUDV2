import { Container, Col, Row, Card, Button as ReactstrapButton,CardHeader, CardBody } from "reactstrap"
import TablaContacto from "./Components/TablaContacto"
import { useEffect, useState } from "react"
import ModalContacto from "./Components/ModalContacto"

const App = () => {

    const [contactos, setContactos] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null);

    const mostrarContactos = async () => {
        const response = await fetch("/api/contacto/Lista");

        if (response.ok) {
            const data = await response.json();
            setContactos(data);
        }
        else {
            console.log("error en la lista");
        }
    }

    useEffect(() => {
        mostrarContactos()
    },[])

    const guardarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Guardar", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json; charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    } 

    const editarContacto = async (contacto) => {
        const response = await fetch("api/contacto/Editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(contacto)
        })
        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarContactos();
        }
    } 

    const eliminarContacto = async (id) => {
        var respuesta = window.confirm("Desea eliminar el contacto?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/contacto/Eliminar/" + id, {
            method: 'DELETE',
        })
        if (response.ok) {           
            mostrarContactos();
        }
    } 

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                <CardHeader>
                    <h5>Lista de Contactos</h5>
                </CardHeader>
                <CardBody>
                            <ReactstrapButton size="sm" color="success"
                                onClick={() => setMostrarModal(!mostrarModal)}
                            >Nuevo Contacto</ReactstrapButton>
                            <hr></hr>
                            <TablaContacto data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}

                                eliminarContacto={eliminarContacto}
                            />
                  </CardBody>
                </Card>
               </Col>             
            </Row>
            <ModalContacto
                mostraModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}

                editar={editar}
                setEditar={setEditar}
                editarContacto={editarContacto}
            />
        </Container>
    )
}


export default App;