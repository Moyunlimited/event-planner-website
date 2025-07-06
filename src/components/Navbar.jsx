import { Link } from "react-scroll";
import { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form } from "react-bootstrap";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("/api/is_admin", { withCredentials: true })
      .then((res) => setIsAdmin(res.data.admin))
      .catch(() => setIsAdmin(false));
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "/api/login",
        { email, password },
        { withCredentials: true }
      );
      if (res.status === 200) {
        setIsAdmin(true);
        setShowModal(false);
        window.location.reload();
      }
    } catch {
      alert("Wrong credentials");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setIsAdmin(false);
      window.location.reload();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="logo mx-4">
          <img src="/logo1.png" alt="Francis Catering" style={{ height: "85px" }} />
        </div>

        {/* Mobile toggle button */}
        <div
          className="mobile-toggle d-md-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>

        <ul className={`nav-links ${isMobileMenuOpen ? "open" : ""}`}>
          <li>
            <Link to="hero" smooth duration={500} onClick={() => setIsMobileMenuOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link to="services" smooth duration={500} onClick={() => setIsMobileMenuOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link to="gallery" smooth duration={500} onClick={() => setIsMobileMenuOpen(false)}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="about" smooth duration={500} onClick={() => setIsMobileMenuOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link to="contact" smooth duration={500} onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>
          </li>

          {!isAdmin ? (
            <li>
              <button
                className="mx-3 btn btn-outline-light btn-sm"
                onClick={() => setShowModal(true)}
              >
                Admin Login
              </button>
            </li>
          ) : (
            <li>
              <button
                className="btn btn-danger btn-sm mx-4"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Admin Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center fs-5">🔐 Admin Login</Modal.Title>
        </Modal.Header>

        <Modal.Body className="pt-1">
          <Form>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label className="fw-semibold">Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                className="rounded-3 shadow-sm"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-4">
              <Form.Label className="fw-semibold">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="rounded-3 shadow-sm"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="dark" onClick={handleLogin} className="rounded-3 py-2">
                Login
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;
