import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/auth.context';
import RoomTable from './roomtable';
import CreateModal from './modal/create';
import EditModal from './modal/edit';

const API = 'http://localhost:3000/rooms/all';

const RoomsAdmin = () => {
    const [rooms, setRooms] = useState([]);
    const [showCreate, setShowCreate] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const { token } = useAuth();
    const navigate = useNavigate();

    const fetchRooms = async () => {
        const res = await axios.get(API);
        setRooms(res.data);
    };

    useEffect(() => { fetchRooms(); }, []);

    const handleEdit = (room) => {
        setSelectedRoom(room);
        setShowEdit(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this room?')) return;
        try {
            await axios.delete(`http://localhost:3000/rooms/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchRooms();
        } catch (err) {
            console.log('Delete error:', err.response?.data);
        }
    };

    return (
        <Container className="mt-5" style={{ paddingTop: '80px' }}>
            <Row className="mb-3 align-items-center">
                <Col>
                    <h3 className="fw-bold">Rooms</h3>
                </Col>
                <Col className="text-end d-flex gap-2 justify-content-end">
                    <Button variant="outline-secondary" onClick={() => navigate('/admin/bookings')}>
                        View Bookings
                    </Button>
                    <Button variant="success" onClick={() => setShowCreate(true)}>
                        + Add Room
                    </Button>
                </Col>
            </Row>

            <RoomTable rooms={rooms} onEdit={handleEdit} onDelete={handleDelete} />

            <CreateModal show={showCreate} handleShow={() => setShowCreate(false)} onRefresh={fetchRooms} />
            <EditModal show={showEdit} handleShow={() => setShowEdit(false)} room={selectedRoom} onRefresh={fetchRooms} />
        </Container>
    );
};

export default RoomsAdmin;