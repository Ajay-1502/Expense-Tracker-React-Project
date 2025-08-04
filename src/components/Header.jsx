import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/authSlice';
import { themeActions } from '../store/themeSlice';
import nightModeIcon from '../assets/night-mode_12301305.png';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const expenses = useSelector((state) => state.expense.expenses);

  const toggleTheme = () => {
    dispatch(themeActions.toggleTheme());
  };

  const downloadExpensesHandler = () => {
    if (expenses.length === 0) {
      alert('No expenses found');
      return;
    }

    const header = ['SL.No', 'Amount(Rupees)', 'Category', 'Description'];
    const rows = expenses.map((exp, index) => [
      index + 1,
      exp.amount,
      exp.category,
      exp.description,
    ]);

    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'expenses.csv';

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(link);
  };

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
                <button
                  className="bg-transparent border-0 p-0"
                  onClick={toggleTheme}
                >
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
              <Button
                variant="success"
                className="me-2 text-white"
                onClick={downloadExpensesHandler}
              >
                Download Expenses
              </Button>
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
