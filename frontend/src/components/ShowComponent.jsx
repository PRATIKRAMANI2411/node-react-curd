import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import UpdateComponent from './UpdateComponent';

const ShowComponent = () => {
    const [posts, setPosts] = useState({});
    console.log('posts: ', posts);

    const fetchPosts = async () => {
        try {
            const response = await axios.get("http://localhost:8002/api/get-posts");
            if (JSON.stringify(response.data) !== JSON.stringify(posts)) {
                console.log("changes");
                setPosts(response.data);
            }
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };
    useEffect(() => {
        fetchPosts();

        const intervalId = setInterval(fetchPosts, 1000);

        return () => clearInterval(intervalId);
    }, [posts])

    const deletePost = async (id, e) => {
        const responce = await axios.get("http://localhost:8002/api/delete-posts/" + id);
        if (responce.data.success == true) {
            alert(responce.data.msg);
            document.getElementById(id).parentElement.parentElement.remove();
        } else {
            alert(responce.data.msg);
        }
    }

    return (
        <Container className='mt-5'>
            {posts.data != undefined && posts.data.length > 0 && (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.data.map((post, inx) => (
                            <tr key={post._id}>
                                <td>{inx + 1}</td>
                                <td>{post.title}</td>
                                <td>{post.date}</td>
                                <td>
                                    <img src={'http://localhost:8002/api/postImages/' + post.image} style={{ width: '50px', height: '50px' }} />
                                </td>
                                <td><Button id={post._id} onClick={(e) => deletePost(post._id, e)} variant="outline-danger">Delete</Button>{' '}
                                    <UpdateComponent id={post._id} title={post.title} date={post.date} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}

        </Container>
    )
}

export default ShowComponent
