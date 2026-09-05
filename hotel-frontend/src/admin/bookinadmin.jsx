import { useState, useEffect } from 'react';
import axios from 'axios';

const BookingsAdmin = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/booking', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        }).then(res => setBookings(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <div style={{ padding: '100px 40px 40px', fontFamily: 'Georgia, serif' }}>
            <h3 style={{ marginBottom: '24px', color: '#3d2b1f' }}>All Bookings</h3>
            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                    <thead>
                        <tr style={{ background: '#6b4c2a', color: '#fff' }}>
                            <th style={th}>ID</th>
                            <th style={th}>Room</th>
                            <th style={th}>Guest</th>
                            <th style={th}>Check In</th>
                            <th style={th}>Check Out</th>
                            <th style={th}>Guests</th>
                            <th style={th}>Notes</th>
                            <th style={th}>Total Price</th>
                            <th style={th}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((b, i) => (
                            <tr key={b.id} style={{ background: i % 2 === 0 ? '#fdf9f6' : '#fff' }}>
                                <td style={td}>{b.id}</td>
                                <td style={td}>{b.room?.name || b.roomId}</td>
                                <td style={td}>{b.user?.name || b.user?.email || '—'}</td>
                                <td style={td}>{b.check_in?.slice(0, 10)}</td>
                                <td style={td}>{b.check_out?.slice(0, 10)}</td>
                                <td style={td}>{b.guestCount}</td>
                                <td style={td}>{b.notes || '—'}</td>
                                <td style={td}>
                                    {b.total_price ? (
                                        <span style={{ color: '#6b4c2a', fontWeight: '600' }}>
                                            €{b.total_price}
                                        </span>
                                    ) : '—'}
                                </td>
                                <td style={td}>
                                    <span style={{
                                        padding: '4px 10px', borderRadius: '20px', fontSize: '12px',
                                        background: b.status === 'confirmed' ? '#e8f5e9' : '#fff3e0',
                                        color: b.status === 'confirmed' ? '#2e7d32' : '#e65100'
                                    }}>
                                        {b.status || 'pending'}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {bookings.length === 0 && (
                    <p style={{ textAlign: 'center', color: '#a08060', marginTop: '40px' }}>No bookings yet.</p>
                )}
            </div>
        </div>
    );
};

const th = { padding: '12px 16px', textAlign: 'left', fontWeight: '500' };
const td = { padding: '12px 16px', borderBottom: '1px solid #e8ddd4', color: '#3d2b1f' };

export default BookingsAdmin;