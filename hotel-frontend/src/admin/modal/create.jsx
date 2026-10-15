// import { useState } from 'react';
// import { Modal, Form, Button } from 'react-bootstrap';
// import axios from 'axios';
// import { useAuth } from '../../context/auth.context';

// const API = 'http://localhost:3000/rooms/create';

// const CreateModal = ({ show, handleShow, onRefresh }) => {
//     const { token } = useAuth();
//     const [formData, setFormData] = useState({
//         name: '', description: '', price: '', capacity: '', room_type: '', available: false
//     });
//     const [images, setImages] = useState([]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const data = new FormData();
//         data.append('name', formData.name);
//         data.append('description', formData.description);
//         data.append('price', formData.price);
//         data.append('capacity', formData.capacity);
//         data.append('room_type', formData.room_type);
//         data.append('available', formData.available === true ? 'true' : 'false');
//         Array.from(images).forEach((img) => data.append('images', img));

//         try {
//             const res = await axios.post(API, data, {
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             console.log('RESPONSE:', res.data);
//             onRefresh();
//             handleShow();
//         } catch (err) {
//             console.log('GABIMI:', err.response?.data);
//             console.log('STATUS:', err.response?.status);
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleShow} backdrop="static" centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Shto Dhome</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Emri</Form.Label>
//                         <Form.Control name="name" value={formData.name} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Pershkrimi</Form.Label>
//                         <Form.Control name="description" value={formData.description} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Cmimi</Form.Label>
//                         <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Kapaciteti</Form.Label>
//                         <Form.Control name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                         <Form.Label>Tipi</Form.Label>
//                         <Form.Select name="room_type" value={formData.room_type} onChange={handleChange} required>
//                             <option value="">Zgjidh tipin</option>
//                             <option value="single">Single</option>
//                             <option value="double">Double</option>
//                             <option value="suite">Suite</option>
//                         </Form.Select>
//                     </Form.Group>
//                     <Form.Group className="mb-2">
//                         <Form.Check name="available" label="Disponueshem" checked={formData.available} onChange={handleChange} />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Imazhet (max 4)</Form.Label>
//                         <Form.Control type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
//                     </Form.Group>
//                     <Button type="submit" variant="primary">Krijo</Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default CreateModal;



import { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../../context/auth.context';

const API = 'http://localhost:3000/rooms/create';

const CreateModal = ({ show, handleShow, onRefresh }) => {
    const { token } = useAuth();
    const [formData, setFormData] = useState({
        name: '', description: '', price: '', capacity: '', room_type: '', available: false
    });
    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('capacity', formData.capacity);
        data.append('room_type', formData.room_type);
        data.append('available', formData.available === true ? 'true' : 'false');
        Array.from(images).forEach((img) => data.append('images', img));

        try {
            const res = await axios.post(API, data, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('RESPONSE:', res.data);
            onRefresh();
            handleShow();
        } catch (err) {
            alert(err.response?.data?.message || 'Gabim: hyr si admin dhe sigurohu qe backend-i punon.');
        }
    };

    return (
        <Modal show={show} onHide={handleShow} backdrop="static" centered>
            <Modal.Header closeButton>
                <Modal.Title>Shto Dhome</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Emri</Form.Label>
                        <Form.Control name="name" value={formData.name} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Pershkrimi</Form.Label>
                        <Form.Control name="description" value={formData.description} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Cmimi</Form.Label>
                        <Form.Control name="price" type="number" value={formData.price} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Kapaciteti</Form.Label>
                        <Form.Control name="capacity" type="number" value={formData.capacity} onChange={handleChange} required />
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Tipi</Form.Label>
                        <Form.Select name="room_type" value={formData.room_type} onChange={handleChange} required>
                            <option value="">Zgjidh tipin</option>
                            <option value="single">Single</option>
                            <option value="double">Double</option>
                            <option value="suite">Suite</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Check name="available" label="Disponueshem" checked={formData.available} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Imazhet (max 4)</Form.Label>
                        <Form.Control type="file" multiple accept="image/*" onChange={(e) => setImages(e.target.files)} />
                    </Form.Group>
                    <Button type="submit" variant="primary">Krijo</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateModal;