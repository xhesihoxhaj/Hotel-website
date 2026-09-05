import { useState, useEffect, useCallback } from "react";

const galleryImages = [
  "/images/gallery/photo-1.jpg",
  "/images/gallery/photo-2.jpg",
  "/images/gallery/photo-3.jpg",
  "/images/gallery/photo-4.jpg",
  "/images/gallery/photo-5.jpg",
  "/images/gallery/photo-6.jpg",
  "/images/gallery/photo-7.jpg",
  "/images/gallery/photo-8.jpg",
  "/images/gallery/photo-9.jpg",
  "/images/gallery/photo-10.jpg",
  "/images/gallery/photo-11.jpg",
  "/images/gallery/photo-12.jpg",
];

export default function HotelGallery() {
  const [lightbox, setLightbox] = useState(null); 


  const handleKey = useCallback(
    (e) => {
      if (lightbox === null) return;
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % galleryImages.length);
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    },
    [lightbox]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

 
  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  return (
    <section className="gallery-section">
      {/* ── HEADER ── */}
      <div className="gallery-header">
        <span className="gallery-tag">Our Gallery</span>
        <h2 className="gallery-title">Start here.. New Living.</h2>
      </div>

      {/* ── GRID ── */}
      <div className="gallery-grid">
        {galleryImages.map((src, i) => (
          <div
            key={i}
            className="gallery-item"
            onClick={() => setLightbox(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && setLightbox(i)}
            aria-label={`Shiko foton ${i + 1}`}
          >
            <img src={src} alt={`Hotel foto ${i + 1}`} loading={i < 4 ? "eager" : "lazy"} />
            <div className="gallery-item-overlay">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="11" y1="8" x2="11" y2="14" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div
          className="lightbox-backdrop"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Shiko foton"
        >
          {/* Butoni mbyll */}
          <button
            className="lb-close"
            onClick={() => setLightbox(null)}
            aria-label="Mbyll"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Foto kryesore */}
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryImages[lightbox]}
              alt={`Foto ${lightbox + 1}`}
              className="lb-img"
            />
          </div>

          {/* Butoni majtas */}
          <button
            className="lb-nav lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i - 1 + galleryImages.length) % galleryImages.length);
            }}
            aria-label="Foto e mëparshme"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Butoni djathtas */}
          <button
            className="lb-nav lb-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i + 1) % galleryImages.length);
            }}
            aria-label="Foto e ardhshme"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Counter */}
          <div className="lb-counter">
            {lightbox + 1} / {galleryImages.length}
          </div>
        </div>
      )}

      {/* ── STILET ── */}
      <style>{`
        .gallery-section {
          width: 100%;
          padding: 70px 0 90px;
          background: #fff;
        }

        /* Header */
        .gallery-header {
          text-align: center;
          margin-bottom: 40px;
          padding: 0 20px;
        }
        .gallery-tag {
          display: block;
          font-family: 'Montserrat', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #b8860b;
          margin-bottom: 10px;
        }
        .gallery-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(28px, 4vw, 42px);
          font-weight: 400;
          color: #1a1a1a;
          margin: 0;
          font-style: italic;
        }

        /* Grid — 3 kolona desktop, 2 tablet, 1 mobile */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }
        @media (max-width: 768px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .gallery-grid { grid-template-columns: 1fr; }
        }

        /* Cdo item */
        .gallery-item {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          cursor: pointer;
          background: #f0f0f0;
        }
        .gallery-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s ease;
        }
        .gallery-item:hover img {
          transform: scale(1.06);
        }

        /* Overlay me ikonën e zmadhuara */
        .gallery-item-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s ease;
          opacity: 0;
        }
        .gallery-item:hover .gallery-item-overlay {
          background: rgba(0, 0, 0, 0.35);
          opacity: 1;
        }
        .gallery-item-overlay svg {
          transform: scale(0.7);
          transition: transform 0.3s ease;
        }
        .gallery-item:hover .gallery-item-overlay svg {
          transform: scale(1);
        }

        /* ── LIGHTBOX ── */
        .lightbox-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.92);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: lbFadeIn 0.2s ease;
        }
        @keyframes lbFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .lb-content {
          max-width: 90vw;
          max-height: 85vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lb-img {
          max-width: 90vw;
          max-height: 85vh;
          object-fit: contain;
          border-radius: 2px;
          box-shadow: 0 8px 60px rgba(0,0,0,0.6);
          animation: lbImgIn 0.25s ease;
        }
        @keyframes lbImgIn {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }

        /* Butoni mbyll */
        .lb-close {
          position: fixed;
          top: 20px;
          right: 24px;
          width: 44px;
          height: 44px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10001;
        }
        .lb-close:hover { background: rgba(255,255,255,0.2); }

        /* Butonat nav */
        .lb-nav {
          position: fixed;
          top: 50%;
          transform: translateY(-50%);
          width: 50px;
          height: 50px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
          z-index: 10001;
        }
        .lb-nav:hover { background: rgba(255,255,255,0.2); }
        .lb-prev { left: 20px; }
        .lb-next { right: 20px; }

        /* Counter */
        .lb-counter {
          position: fixed;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-family: 'Montserrat', sans-serif;
          font-size: 13px;
          color: rgba(255,255,255,0.6);
          letter-spacing: 2px;
          z-index: 10001;
        }
      `}</style>
    </section>
  );
}
