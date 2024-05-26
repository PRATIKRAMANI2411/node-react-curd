import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import axios from "axios";

const PostComponent = () => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [image, setImage] = useState("")
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {        
        e.preventDefault();
        try {
            const URL = "http://localhost:8002/api/create-post";
            const config = {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }

            const formInput = new FormData();
            formInput.append('title', title);
            formInput.append('date', date);
            formInput.append('image', image);
            
            const response = await axios.post(URL, formInput, config);
           if(response.data.success == true){
               setMessage("Post Created successfully....!");
               e.target.reset();
           }
        } catch (error) {
            setMessage("Post Faile", );
        }
        setTimeout(() => {
            setMessage('')
        }, 2000);

        
    }

    return (
        <>
            <Container>
                <Row>
                    <Form className='mt-5' onSubmit={handleSubmit}>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalTitle">
                            <Form.Label column sm={2}>
                                Title
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" placeholder="Title" name='title' onChange={(e) => setTitle(e.target.value)} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalDate">
                            <Form.Label column sm={2}>
                                Date
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="date" placeholder="Date" name='date' onChange={(e) => setDate(e.target.value)} />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalImage">
                            <Form.Label column sm={2}>
                                Image
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="file" name='image' placeholder="Image" onChange={(e) => setImage(e.target.files[0])} />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="submit">Submit</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                    <p>{message}</p>
                </Row>
            </Container>
        </>
    )
}

export default PostComponent;
