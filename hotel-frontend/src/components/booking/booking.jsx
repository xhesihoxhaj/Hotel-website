import { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import "./booking.css";

export default function BookingModal({ room, onClose }) {
    const [form, setForm] = useState({
        checkIn: "",
        checkOut: "",
        guestsCount: 1,
        notes: "",
    });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (!form.checkIn || !form.checkOut) {
            setError("Ju lutem zgjidhni datat.");
            return;
        }
        if (new Date(form.checkOut) <= new Date(form.checkIn)) {
            setError("Data e largimit duhet të jetë pas datës së mbërritjes.");
            return;
        }

        setLoading(true);
        try {
            await axios.post(
                "http://localhost:3000/booking",
                {
                    roomId: room.id,
                    checkIn: form.checkIn,
                    checkOut: form.checkOut,
                    guestsCount: Number(form.guestsCount),
                    notes: form.notes,
                }
            );
            setSuccess(true);
        } catch (err) {
            if (err.response?.status === 400) {
                setError("Dhoma nuk është e disponueshme për datat e zgjedhura.");
            } else {
                setError("Diçka shkoi gabim. Provoni përsëri.");
            }
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&#x2715;</button>

                {success ? (
                    <div className="modal-success">
                        <div className="success-icon">✓</div>
                        <h2>Rezervimi u krye!</h2>
                        <p>Do të merrni një konfirmim së shpejti.</p>
                        <button className="submit-btn" onClick={onClose}>Mbyll</button>
                    </div>
                ) : (
                    <>
                        <div className="modal-header">
                            <p className="modal-sub">Rezervo</p>
                            <h2 className="modal-title">{room.name}</h2>
                            {room.price && (
                                <p className="modal-price">€{room.price} <span>/ natë</span></p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="booking-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Mbërritja</label>
                                    <input
                                        type="date"
                                        name="checkIn"
                                        value={form.checkIn}
                                        onChange={handleChange}
                                        min={new Date().toISOString().split("T")[0]}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Largimi</label>
                                    <input
                                        type="date"
                                        name="checkOut"
                                        value={form.checkOut}
                                        onChange={handleChange}
                                        min={form.checkIn || new Date().toISOString().split("T")[0]}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Numri i personave</label>
                                <select name="guestsCount" value={form.guestsCount} onChange={handleChange}>
                                    {[1, 2, 3, 4].map((n) => (
                                        <option key={n} value={n}>{n} {n === 1 ? "person" : "persona"}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Shënime <span className="optional">(opsionale)</span></label>
                                <textarea
                                    name="notes"
                                    value={form.notes}
                                    onChange={handleChange}
                                    placeholder="p.sh. kati i preferuar, kërkesa speciale..."
                                    rows={3}
                                />
                            </div>

                            {error && <p className="form-error">{error}</p>}

                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? "Duke dërguar..." : "Konfirmo Rezervimin"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}