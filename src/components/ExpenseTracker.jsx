import { useState } from 'react';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food',
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      formData.amount.trim().length === 0 ||
      formData.description.trim().length === 0
    ) {
      alert('Input fields cannot be empty');
      return;
    }

    setExpenses((prev) => [...prev, formData]);
    setFormData({ amount: '', description: '', category: 'Food' });
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-5 expense-container">
      <Card className="p-4 shadow-lg expense-card mt-0">
        <h3 className="text-center mb-4 text-primary">Expense Tracker</h3>
        <Form onSubmit={submitHandler}>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Label className="fw-semibold">Amount Spent</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                name="amount"
                value={formData.amount}
                onChange={changeHandler}
                required
              />
            </Col>
            <Col md={4}>
              <Form.Label className="fw-semibold">Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                name="description"
                value={formData.description}
                onChange={changeHandler}
                required
              />
            </Col>
            <Col md={4}>
              <Form.Label className="fw-semibold">Category</Form.Label>
              <Form.Select
                name="category"
                value={formData.category}
                onChange={changeHandler}
              >
                <option>Food</option>
                <option>Petrol</option>
                <option>Salary</option>
                <option>Entertainment</option>
                <option>Travel</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Fees</option>
                <option>Membership</option>
                <option>Other</option>
              </Form.Select>
            </Col>
          </Row>
          <div className="d-flex justify-content-center">
            <Button type="submit" variant="primary" className="px-5">
              Add Expense
            </Button>
          </div>
        </Form>
      </Card>

      {expenses.length > 0 && (
        <Card className="mt-4 p-3 shadow-sm">
          <h5 className="mb-3 text-success">Expenses List</h5>
          <ul className="list-group">
            {expenses.map((exp, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  borderLeft: '5px solid #0d6efd',
                  marginBottom: '5px',
                  borderRadius: '5px',
                }}
              >
                <div>
                  <strong>₹{exp.amount}</strong> - {exp.description}
                </div>
                <span className="badge bg-secondary">{exp.category}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </Container>
  );
};

export default ExpenseTracker;
