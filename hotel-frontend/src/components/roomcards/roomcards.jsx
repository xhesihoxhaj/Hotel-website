import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const RoomCard = ({ room }) => {
    const [currentImg, setCurrentImg] = useState(0);

    const prev = (e) => {
        e.stopPropagation();
        setCurrentImg((i) => (i - 1 + room.images.length) % room.images.length);
    };

    const next = (e) => {
        e.stopPropagation();
        setCurrentImg((i) => (i + 1) % room.images.length);
    };

    return (
        <>
            <style>{`
                .room-card { border: none !important; border-radius: 2px !important; overflow: hidden; box-shadow: 0 4px 20px rgba(60,40,10,0.10) !important; background: #fff; position: relative; }
                .room-card .card-img-top { height: 230px; object-fit: cover; transition: transform 0.45s ease; display: block; }
                .room-card:hover .card-img-top { transform: scale(1.04); }
                .room-card .img-wrapper { position: relative; height: 230px; overflow: hidden; }
                .room-card .arr-btn { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(44,34,24,0.55) !important; border: none !important; color: #e8d5a8 !important; width: 32px; height: 32px; padding: 0; font-size: 22px; line-height: 1; display: flex; align-items: center; justify-content: center; z-index: 10; border-radius: 0 !important; transition: background 0.2s !important; }
                .room-card .arr-btn:hover { background: rgba(181,151,90,0.85) !important; }
                .room-card .arr-left { left: 8px; }
                .room-card .arr-right { right: 8px; }
                .room-card .dots-wrap { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); display: flex; gap: 5px; }
                .room-card .dot { width: 6px; height: 6px; border-radius: 50%; cursor: pointer; transition: background 0.2s; }
                .room-card .card-body { padding: 18px 20px 0; }
                .room-card .card-title { font-family: Georgia, serif; font-size: 17px; font-weight: 400; color: #2c2218; margin-bottom: 4px; }
                .room-card .room-price { font-size: 14px; color: #b5975a; font-weight: 500; margin: 0; }
                .room-card .overlay { position: absolute; inset: 0; background: rgba(30,20,10,0.82); opacity: 0; transition: opacity 0.35s; display: flex; flex-direction: column; justify-content: space-between; padding: 24px 22px 20px; pointer-events: none; }
                .room-card:hover .overlay { opacity: 1; pointer-events: all; }
                .room-card .overlay-type { font-size: 10px; letter-spacing: 3px; color: #e8d5a8; text-transform: uppercase; margin-bottom: 5px; }
                .room-card .overlay-name { font-family: Georgia, serif; font-size: 19px; color: #fff; margin-bottom: 14px; }
                .room-card .overlay-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; }
                .room-card .detail-label { font-size: 10px; letter-spacing: 2px; color: #e8d5a8; text-transform: uppercase; display: block; }
                .room-card .detail-value { font-size: 13px; color: #fff; }
                .room-card .overlay-desc { font-size: 12px; color: #e8d5a8; line-height: 1.6; border-top: 0.5px solid rgba(232,213,168,0.3); padding-top: 12px; margin-bottom: 16px; }
                .room-card .book-btn { display: block; width: 100%; padding: 11px 0; background: transparent !important; border: 1px solid #e8d5a8 !important; color: #e8d5a8 !important; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; text-align: center; border-radius: 0 !important; transition: background 0.2s, color 0.2s !important; }
                .room-card .book-btn:hover { background: #b5975a !important; border-color: #b5975a !important; color: #fff !important; }
            `}</style>

            <Card className="room-card">
                <div className="img-wrapper">
                    <Card.Img
                        variant="top"
                        src={`http://localhost:3000${room.images[currentImg]}`}
                        alt={room.name}
                    />

                    {room.images.length > 1 && (
                        <>
                            <Button className="arr-btn arr-left" onClick={prev}>&#8249;</Button>
                            <Button className="arr-btn arr-right" onClick={next}>&#8250;</Button>
                            <div className="dots-wrap">
                                {room.images.map((_, i) => (
                                    <div
                                        key={i}
                                        className="dot"
                                        onClick={(e) => { e.stopPropagation(); setCurrentImg(i); }}
                                        style={{ background: i === currentImg ? "#e8d5a8" : "rgba(255,255,255,0.45)" }}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <Card.Body className="card-body">
                    <Card.Title className="card-title">{room.name}</Card.Title>
                    <p className="room-price">${room.price} / natë</p>
                </Card.Body>

                <div className="overlay">
                    <div>
                        <p className="overlay-type">Tipi i dhomës</p>
                        <p className="overlay-name">{room.name}</p>

                        <div className="overlay-grid">
                            {[
                                { label: "Çmimi", value: `$${room.price} / natë` },
                                { label: "Kapaciteti", value: `${room.capacity} persona` },
                                { label: "Madhësia", value: room.size || "—" },
                                { label: "Tipi", value: room.room_type || "Standard" },
                            ].map((d) => (
                                <div key={d.label}>
                                    <span className="detail-label">{d.label}</span>
                                    <span className="detail-value">{d.value}</span>
                                </div>
                            ))}
                        </div>

                        <p className="overlay-desc">{room.description}</p>
                    </div>

                    <Link to={`/rooms/${room.id}`}>
                        <Button className="book-btn">Book</Button>
                    </Link>
                </div>
            </Card>
        </>
    );
};

const RoomsSection = () => {
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        async function getRooms() {
            try {
                const res = await axios.get("http://localhost:3000/rooms/all");
                const selectedIds = [2, 3, 5];
                const filtered = res.data.filter(p => selectedIds.includes(p.id));
    
                setRooms(filtered);
            } catch (err) {
                console.log(err);
            }
        }
        getRooms();
    }, []);

    return (
        <div style={{ background: "#f7f2ea", padding: "80px 0" }}>
            <Container>
                <div className="text-center mb-5">
                    <p style={{ letterSpacing: "4px", color: "#b5975a", fontSize: "12px", textTransform: "uppercase", marginBottom: "8px" }}>
                        EKSPERIENCA JONË
                    </p>
                    <h2 style={{ fontFamily: "Georgia, serif", fontWeight: "400", fontSize: "28px", color: "#2c2218" }}>
                        Dhomat Tona
                    </h2>
                </div>

                <Row>
                    {rooms.map((room) => (
                        <Col md={4} className="mb-4" key={room.id}>
                            <RoomCard room={room} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default RoomsSection;