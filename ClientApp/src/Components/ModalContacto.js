
import { Modal, ModalHeader, Button, ModalFooter, ModalBody, Form, FormGroup, Input,Label } from "reactstrap"
import { useEffect, useState } from "react"

const modeloContacto = {
    idContacto : 0,
    nombre: "",
    corre: "",
    telefono:""
}

const ModalContacto = ({ mostraModal, setMostrarModal, setEditar, editar,editarContacto,guardarContacto}) => {

    const [contacto, setContacto] = useState(modeloContacto);

    const actualizarDato = (e) => {
        console.log(e.target.name + " : " + e.target.value)
        setContacto(
            {
                ...contacto,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (contacto.idContacto == 0) {
            guardarContacto(contacto)
        }
        else {
            editarContacto(contacto)
        }
        setContacto(modeloContacto)
    }

    const cerrarModal = () => {
        setMostrarModal(!mostraModal)
        setEditar(null)
    }

    useEffect(() => {
        if (editar != null) {
            setContacto(editar)
        }
        else {
            setContacto(modeloContacto)
        }
    },[editar])

    return (

        <Modal isOpen={mostraModal}>
            <ModalHeader>
                {contacto.idContacto == 0 ? "Nuevo contacto" : "Editar Contacto"}
                Nuevo Contacto
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={contacto.nombre}  />
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={contacto.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Telefono</Label>
                        <Input name="telefono" onChange={(e) => actualizarDato(e)} value={contacto.telefono} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>

            </ModalFooter>
        </Modal>

    )
}

export default ModalContacto;