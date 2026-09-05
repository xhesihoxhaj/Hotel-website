import { useState, useEffect } from "react";
import axios from "axios";
import "./Rooms.css";

export default function Rooms({ title = "Explore our rooms" }) {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function getRooms() {
            try {
                const res = await axios.get("http://localhost:3000/rooms/all");
                setRooms(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getRooms();
    }, []);

    return (
        <div className="rooms-page">
            <div className="rooms-header">
                <p className="rooms-header-sub">Our Rooms</p>
                <h1 className="rooms-header-title">{title}</h1>
                <div className="rooms-header-line"></div>
            </div>
            <div className="rooms-list">
                {rooms.map((room, index) => (
                    <RoomRow key={room.id} room={room} reverse={index % 2 !== 0} />
                ))}
            </div>
        </div>
    );
}

function RoomRow({ room, reverse }) {
    const [currentImg, setCurrentImg] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({ checkIn: "", checkOut: "", guestsCount: 1, notes: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await axios.post("http://localhost:3000/booking", {
                roomId: room.id,
                checkIn: form.checkIn,
                checkOut: form.checkOut,
                guestsCount: Number(form.guestsCount),
                notes: form.notes,
            });
            setSuccess(true);
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    function prevImg(e) {
        e.stopPropagation();
        setCurrentImg((i) => (i - 1 + room.images.length) % room.images.length);
    }

    function nextImg(e) {
        e.stopPropagation();
        setCurrentImg((i) => (i + 1) % room.images.length);
    }

    return (
        <>
            <div className={`room-row ${reverse ? "room-row-reverse" : ""}`}>
                <div className="room-photo">
                    <img src={`http://localhost:3000${room.images[currentImg]}`} alt={room.name} />
                    {room.images.length > 1 && (
                        <>
                            <button className="arrow arrow-left" onClick={prevImg}>&#8249;</button>
                            <button className="arrow arrow-right" onClick={nextImg}>&#8250;</button>
                            <div className="dots">
                                {room.images.map((_, i) => (
                                    <span key={i} className={`dot ${i === currentImg ? "dot-active" : ""}`}
                                        onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <div className="room-info">
                    <h2 className="room-name">{room.name}</h2>
                    <ul className="room-features">
                        <li>1 double bed</li>
                        <li>Ensuite bathroom</li>
                        <li>Wifi</li>
                    </ul>
                    <p className="room-desc">{room.description}</p>
                    <div className="room-footer">
                        {room.price && <span className="room-price">€{room.price} <small>/ night</small></span>}
                        <button className="book-btn" onClick={() => setShowModal(true)}>Book Now</button>
                    </div>
                </div>
            </div>

            {showModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
                    background: "rgba(0,0,0,0.6)", zIndex: 99999,
                    display: "flex", alignItems: "center", justifyContent: "center"
                }} onClick={() => setShowModal(false)}>
                    <div style={{
                        background: "#fff", borderRadius: "16px", padding: "2rem",
                        width: "90%", maxWidth: "480px", position: "relative",
                        maxHeight: "90vh", overflowY: "auto"
                    }} onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowModal(false)} style={{
                            position: "absolute", top: "1rem", right: "1rem",
                            background: "none", border: "none", fontSize: "1.2rem", cursor: "pointer"
                        }}>✕</button>

                        {success ? (
                            <div style={{ textAlign: "center", padding: "2rem 0" }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: "50%",
                                    background: "#e8f5e9", color: "#2e7d32",
                                    fontSize: "1.5rem", display: "flex",
                                    alignItems: "center", justifyContent: "center", margin: "0 auto 1rem"
                                }}>✓</div>
                                <h2 style={{ marginBottom: "0.5rem" }}>Booking Confirmed!</h2>
                                <p style={{ color: "#666", marginBottom: "1.5rem" }}>Thank you!</p>
                                <button onClick={() => { setShowModal(false); setSuccess(false); }} style={{
                                    background: "#1a1a1a", color: "#fff", border: "none",
                                    borderRadius: "8px", padding: "0.75rem 2rem", cursor: "pointer", fontSize: "0.95rem"
                                }}>Close</button>
                            </div>
                        ) : (
                            <>
                                <h2 style={{ marginBottom: "0.25rem", fontSize: "1.4rem" }}>{room.name}</h2>
                                {room.price && <p style={{ color: "#b8965a", marginBottom: "1.5rem", fontSize: "1.1rem" }}>€{room.price} / night</p>}

                                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                            <label style={{ fontSize: "0.82rem", fontWeight: 500 }}>Check In</label>
                                            <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange}
                                                min={new Date().toISOString().split("T")[0]} required
                                                style={{ padding: "0.6rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.9rem" }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                            <label style={{ fontSize: "0.82rem", fontWeight: 500 }}>Check Out</label>
                                            <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange}
                                                min={form.checkIn || new Date().toISOString().split("T")[0]} required
                                                style={{ padding: "0.6rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.9rem" }} />
                                        </div>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                        <label style={{ fontSize: "0.82rem", fontWeight: 500 }}>Number of guests</label>
                                        <select name="guestsCount" value={form.guestsCount} onChange={handleChange}
                                            style={{ padding: "0.6rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.9rem" }}>
                                            {[1, 2, 3, 4].map((n) => (
                                                <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                        <label style={{ fontSize: "0.82rem", fontWeight: 500 }}>Notes <span style={{ color: "#aaa", fontWeight: 400 }}>(optional)</span></label>
                                        <textarea name="notes" value={form.notes} onChange={handleChange} rows={3}
                                            placeholder="e.g. preferred floor..."
                                            style={{ padding: "0.6rem", border: "1px solid #ddd", borderRadius: "8px", fontSize: "0.9rem", resize: "vertical", fontFamily: "inherit" }} />
                                    </div>

                                    {error && <p style={{ color: "#c0392b", background: "#fdf0ef", padding: "0.6rem", borderRadius: "8px", fontSize: "0.85rem" }}>{error}</p>}

                                    <button type="submit" disabled={loading} style={{
                                        background: "#1a1a1a", color: "#fff", border: "none",
                                        borderRadius: "8px", padding: "0.85rem", fontSize: "0.95rem",
                                        fontWeight: 500, cursor: loading ? "not-allowed" : "pointer",
                                        opacity: loading ? 0.7 : 1
                                    }}>
                                        {loading ? "Sending..." : "Confirm Booking"}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}