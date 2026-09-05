import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth.context';

const LoginAdmin = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate('/admin/rooms');
        } catch {
            setError('Invalid email or password!');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: '#f5f0eb',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Georgia, serif'
        }}>
            <div style={{
                width: '420px',
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '48px 40px',
                boxShadow: '0 8px 40px rgba(101, 67, 33, 0.12)',
                border: '1px solid #e8ddd4'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        fontSize: '28px',
                        letterSpacing: '3px',
                        color: '#6b4c2a',
                        fontWeight: '600',
                        marginBottom: '6px'
                    }}>HOTEL</div>
                    <div style={{
                        width: '40px',
                        height: '2px',
                        backgroundColor: '#c9a87c',
                        margin: '0 auto 12px'
                    }} />
                    <p style={{ color: '#a08060', fontSize: '14px', margin: 0 }}>
                        Admin Panel
                    </p>
                </div>

                {error && (
                    <div style={{
                        backgroundColor: '#fdf0f0',
                        border: '1px solid #f5c6c6',
                        color: '#c0392b',
                        padding: '10px 14px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        marginBottom: '20px'
                    }}>{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', fontSize: '13px', color: '#6b4c2a', marginBottom: '6px', letterSpacing: '0.5px' }}>
                            EMAIL
                        </label>
                        <input
                            type="email"
                            required
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                border: '1px solid #ddd0c4',
                                borderRadius: '8px',
                                fontSize: '15px',
                                outline: 'none',
                                backgroundColor: '#fdf9f6',
                                color: '#3d2b1f',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={{ display: 'block', fontSize: '13px', color: '#6b4c2a', marginBottom: '6px', letterSpacing: '0.5px' }}>
                            PASSWORD
                        </label>
                        <input
                            type="password"
                            required
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            style={{
                                width: '100%',
                                padding: '12px 14px',
                                border: '1px solid #ddd0c4',
                                borderRadius: '8px',
                                fontSize: '15px',
                                outline: 'none',
                                backgroundColor: '#fdf9f6',
                                color: '#3d2b1f',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '13px',
                            backgroundColor: '#6b4c2a',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '15px',
                            letterSpacing: '1px',
                            cursor: 'pointer'
                        }}
                        onMouseOver={e => e.target.style.backgroundColor = '#8b6340'}
                        onMouseOut={e => e.target.style.backgroundColor = '#6b4c2a'}
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginAdmin;