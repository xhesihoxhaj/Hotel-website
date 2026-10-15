// import { useState, useEffect } from 'react';
// import { Modal, Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { useAuth } from '../../context/auth.context';

// const EditModal = ({ show, handleShow, room, onRefresh }) => {
//     const { token } = useAuth();
//     const [formData, setFormData] = useState({
//         name: '', description: '', price: '', capacity: '', room_type: '', available: false
//     });

//     useEffect(() => {
//         if (room) setFormData({
//             name: room.name || '',
//             description: room.description || '',
//             price: room.price || '',
//             capacity: room.capacity || '',
//             room_type: room.room_type || '',
//             available: room.available || false
//         });
//     }, [room]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const payload = {
//                 name: formData.name,
//                 description: formData.description,
//                 price: Number(formData.price),
//                 capacity: Number(formData.capacity),
//                 room_type: formData.room_type,
//                 available: formData.available
//             };
//             await axios.patch(`http://localhost:3000/rooms/${room.id}`, payload, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     'Content-Type': 'application/json'
//                 }
//             });
//             onRefresh();
//             handleShow();
//         } catch (err) {
//             console.log('GABIMI:', err.response?.data);
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleShow} backdrop="static">
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Room</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Name</Form.Label>
//                         <Form.Control name="name" value={formData.name} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Description</Form.Label>
//                         <Form.Control name="description" value={formData.description} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Price</Form.Label>
//                         <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Capacity</Form.Label>
//                         <Form.Control name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Type</Form.Label>
//                         <Form.Select name="room_type" value={formData.room_type} onChange={handleChange} required>
//                             <option value="">Select type</option>
//                             <option value="single">Single</option>
//                             <option value="double">Double</option>
//                             <option value="suite">Suite</option>
//                         </Form.Select>
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Check name="available" label="Available" checked={formData.available} onChange={handleChange} />
//                     </Form.Group>
//                     <Button type="submit" variant="warning">Save</Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default EditModal;




import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/auth.context';

const EditModal = ({ show, handleShow, room, onRefresh }) => {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', capacity: '', room_type: '', available: false
    });

    useEffect(() => {
        if (room) setFormData({
            name: room.name || '',
            description: room.description || '',
            price: room.price || '',
            capacity: room.capacity || '',
            room_type: room.room_type || '',
            available: room.available || false
        });
    }, [room]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                capacity: Number(formData.capacity),
                room_type: formData.room_type,
                available: formData.available
            };
            await axios.patch(`http://localhost:3000/rooms/${room.id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            onRefresh();
            handleShow();
        } catch (err) {
            alert(err.response?.data?.message || 'Gabim: hyr si admin dhe sigurohu qe backend-i punon.');
        }
    };

    return (
        <Modal show={show} onHide={handleShow} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Edit Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Name</Form.Label>
                        <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" value={formData.description} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Price</Form.Label>
                        <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Type</Form.Label>
                        <Form.Select name="room_type" value={formData.room_type} onChange={handleChange} required>
                            <option value="">Select type</option>
                            <option value="single">Single</option>
                            <option value="double">Double</option>
                            <option value="suite">Suite</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check name="available" label="Available" checked={formData.available} onChange={handleChange} />
                    </Form.Group>
                    <Button type="submit" variant="warning">Save</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default EditModal;