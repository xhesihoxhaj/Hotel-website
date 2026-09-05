import { Table, Button } from "react-bootstrap";

const RoomTable = ({ rooms, onEdit, onDelete }) => {
    return (
        <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark text-center">
                <tr>
                    <th>ID</th>
                    <th>Emri</th>
                    <th>Pershkrimi</th>
                    <th>Cmimi</th>
                    <th>Tipi</th>
                    <th>Kapaciteti</th>
                    <th>Disponueshem</th>
                    <th>Imazhi</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>

            <tbody className="text-center align-middle">
                {rooms.map((room) => (
                    <tr key={room.id}>
                        <td>{room.id}</td>

                        <td className="fw-semibold">
                            {room.name}
                        </td>

                        <td className="text-muted">
                            {room.description}
                        </td>

                        <td>${room.price}</td>

                        <td>{room.room_type}</td>

                        <td>{room.capacity}</td>

                        <td>
                            {room.available ? "✅" : "❌"}
                        </td>

                        <td>
                            {room.images && room.images.length > 0 && (
                                <img
                                    src={`http://localhost:3000${Array.isArray(room.images) ? room.images[0] : room.images.split(',')[0]}`}
                                    alt={room.name}
                                    style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }}
                                />
                            )}
                        
                        </td>

                        <td>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => onEdit(room)}
                            >
                                Edit
                            </Button>
                        </td>

                        <td>
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => onDelete(room.id)}
                            >
                                Delete
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default RoomTable;