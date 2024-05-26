import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from "axios";

const UpdateComponent = (props) => {
    const [show, setShow] = useState(false);

    const [title, setTitle] = useState(props.title)
    const [date, setDate] = useState(props.date)
    const [id, setId] = useState(props.id)
    const [selectedFile, setselectedFile] = useState("")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const URL = "http://localhost:8002/api/update-posts";
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            const formInput = new FormData();
            formInput.append('id', id);
            formInput.append('title', title);
            formInput.append('date', date);

            if (selectedFile != "" && selectedFile.length != 0) {
                formInput.append('image', selectedFile);
            }
            const response = await axios.post(URL, formInput, config);
            if (response.data.success == true) {
                alert(response.data.msg);
                e.target.reset();
            } else {
                alert(response.data.msg);
            }
            handleClose();

        } catch (error) {
            alert("Post Faile",error);
        }
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Update
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Form className='mt-5' onSubmit={handleSubmit}>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
                                    <Form.Label column sm={2}>
                                        Title
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Title" name='title' value={title} onChange={(e) => setTitle(e.target.value)} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalDate">
                                    <Form.Label column sm={2}>
                                        Date
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="date" placeholder="Date" name='date' value={date} onChange={(e) => setDate(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalImage">
                                    <Form.Label column sm={2}>
                                        Image
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="file" name='image' placeholder="Image" onChange={(e) => setselectedFile(e.target.files[0])} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3">
                                    <Col sm={{ span: 10, offset: 2 }}>
                                        <Button type="submit">Submit</Button>
                                    </Col>
                                </Form.Group>
                            </Form>

                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default UpdateComponent
