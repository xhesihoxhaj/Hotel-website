import { Routes, Route } from "react-router-dom"; // hiq BrowserRouter as Router
import Navbar from "./components/navbar/navbar";
import HeroCarousel from "./components/carousel/carousel";
// import About from "./components/aboutUs/aboutUs";
import RoomsSlider from "./components/roomcards/roomcards";
import Rooms from "./pages/Rooms/Rooms";
import Gallery from "./pages/Gallery/Gallery";
import RoomsAdmin from "./admin/room";
import LoginAdmin from "./admin/Login";
import { AuthProvider } from "./context/auth.context";
import About from "./components/aboutUs/aboutUs";
import AboutPage from "./pages/AboutUs/about";
import ContactPage from "./pages/contact/contact";
import Footer from "./components/footer/footer";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import BookingsAdmin from "./admin/bookinadmin";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <HeroCarousel />
            <About />
            <RoomsSlider />
            <Gallery />
          </>
        } />
        <Route path="/rooms" element={<Rooms title="Explore our rooms" />} />
        <Route path="/booking" element={<Rooms title="Book our rooms" />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/rooms" element={<RoomsAdmin />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/bookings" element={<BookingsAdmin />} />

      </Routes>
      <Footer/>
    </AuthProvider>
  );
}

export default App;