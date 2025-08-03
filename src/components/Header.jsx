import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/authSlice';
import nightModeIcon from '../assets/night-mode_12301305.png';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    history.push('/');
    localStorage.removeItem('token');
  };
  return (
    <>
      <Navbar
        style={{ backgroundColor: '#6a11cb' }}
        variant="dark"
        expand="lg"
        className="py-3 shadow-sm"
      >
        <Container>
          <Navbar.Brand as={Link} to="/home" className="fs-3 fw-bold">
            Expensify
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav" className="justify-content-end">
            <Nav className="me-3">
              <Nav.Link
                as={Link}
                to="/home"
                className="mx-2 fw-bold text-white"
              >
                Home
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/complete-profile"
                className="mx-2 fw-bold text-white"
              >
                Profile
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/home"
                className="mx-2 fw-bold text-white"
              >
                Premium
              </Nav.Link>
              <Nav.Link className="mx-2">
                <button className="bg-transparent border-0 p-0">
                  <img
                    src={nightModeIcon}
                    alt="Theme Toggle"
                    style={{
                      width: '30px',
                      height: '30px',
                      objectFit: 'contain',
                    }}
                  />
                </button>
              </Nav.Link>
            </Nav>

            <Button
              variant="danger"
              className="position-relative text-white"
              onClick={logoutHandler}
            >
              Logout
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
