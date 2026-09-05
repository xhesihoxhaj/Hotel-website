import { useState } from "react";

const photos = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
  "https://images.unsplash.com/photo-1560347876-aeef00ee58a1?w=800&q=80",
];

export default function HotelGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <section style={{ padding: "60px 20px", background: "#faf7f4" }}>

      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "13px", letterSpacing: "3px", color: "#a08060", marginBottom: "8px" }}>
          EXPLORE
        </p>
        <h2 style={{ fontSize: "32px", fontWeight: "400", color: "#3d2b1f", fontFamily: "Georgia, serif", margin: 0, marginTop:60 }}>
          Our Gallery
        </h2>
        <div style={{ width: "40px", height: "2px", background: "#c9a87c", margin: "16px auto 0" }} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "12px",
        maxWidth: "1100px",
        margin: "0 auto"
      }}>
        {photos.map((photo, i) => (
          <div
            key={i}
            onClick={() => setSelected(photo)}
            style={{
              overflow: "hidden",
              borderRadius: "8px",
              cursor: "pointer",
              aspectRatio: "4/3",
            }}
          >
            <img
              src={photo}
              alt={`Hotel ${i + 1}`}
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "transform 0.3s ease",
                filter: "sepia(15%) brightness(0.97)"
              }}
              onMouseOver={e => e.target.style.transform = "scale(1.04)"}
              onMouseOut={e => e.target.style.transform = "scale(1)"}
            />
          </div>
        ))}
      </div>

      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(30,20,10,0.92)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 9999, cursor: "pointer"
          }}
        >
          <img
            src={selected}
            alt="Selected"
            style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain", borderRadius: "8px" }}
          />
          <button
            onClick={() => setSelected(null)}
            style={{
              position: "fixed", top: "20px", right: "24px",
              background: "none", border: "none",
              color: "#fff", fontSize: "28px", cursor: "pointer"
            }}
          >✕</button>
        </div>
      )}

    </section>
  );
}