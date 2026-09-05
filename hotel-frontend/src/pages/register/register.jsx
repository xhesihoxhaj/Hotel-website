import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/auth/register', form);
            navigate('/login'); // pas regjistimit shko te login
        } catch {
            setError('Regjistrimi dështoi, provo përsëri!');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Card style={{ width: '400px' }} className="p-4">
                <h4 className="mb-3 text-center">Krijo llogari</h4>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Emri</Form.Label>
                        <Form.Control type="text" onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fjalëkalimi</Form.Label>
                        <Form.Control type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                    </Form.Group>
                    <Button type="submit" className="w-100">Regjistrohu</Button>
                    <p className="text-center mt-3">
                        Ke llogari? <Link to="/login">Hyr këtu</Link>
                    </p>
                </Form>
            </Card>
        </Container>
    );
};

export default Register;