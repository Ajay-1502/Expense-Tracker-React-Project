import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/expenseSlice';
import { toast, ToastContainer } from 'react-toastify';
import { Container, Form, Button, Row, Col, Card } from 'react-bootstrap';

const ExpenseTracker = () => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food',
  });

  const expenses = useSelector((state) => state.expense.expenses);
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (
      formData.amount.trim().length === 0 ||
      formData.description.trim().length === 0
    ) {
      toast.error('Input fields cannot be empty');
      return;
    }

    try {
      const response = await fetch(
        'https://expense-tracker-react-f5b85-default-rtdb.firebaseio.com/expenses.json',
        {
          method: 'POST',
          body: JSON.stringify({
            amount: formData.amount,
            description: formData.description,
            category: formData.category,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error.message || 'Failed to send data to backend'
        );
      }

      setFormData({ amount: '', description: '', category: 'Food' });
      fetchExpenses();
    } catch (err) {
      console.log(err.message);
    }
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await fetch(
        ' https://expense-tracker-react-f5b85-default-rtdb.firebaseio.com/expenses.json'
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
      const data = await response.json();

      let expensesReceived = [];
      for (let key in data) {
        expensesReceived.push({
          id: key,
          amount: data[key].amount,
          description: data[key].description,
          category: data[key].category,
        });
      }

      dispatch(expenseActions.expenseList(expensesReceived));
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);

  const deleteExpenseHandler = async (expenseId) => {
    const response = await fetch(
      `https://expense-tracker-react-f5b85-default-rtdb.firebaseio.com/expenses/${expenseId}.json`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    dispatch(
      expenseActions.expenseList(expenses.filter((exp) => exp.id != expenseId))
    );
  };

  const editExpenseHandler = async (
    amount,
    description,
    category,
    expenseId
  ) => {
    setFormData({
      amount: amount,
      description: description,
      category: category,
    });
    await deleteExpenseHandler(expenseId);
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <Container className="mt-4 expense-container">
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
            {expenses.map((exp) => (
              <li
                key={exp.id}
                className="list-group-item d-flex justify-content-between align-items-center"
                style={{
                  borderLeft: '5px solid #0d6efd',
                  marginBottom: '5px',
                  borderRadius: '5px',
                }}
              >
                <div>
                  <strong>₹{exp.amount}</strong> - {exp.description}
                  <span className="badge bg-secondary d-flex justify-content-center align-items-center ">
                    {exp.category}
                  </span>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() =>
                      editExpenseHandler(
                        exp.amount,
                        exp.description,
                        exp.category,
                        exp.id
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteExpenseHandler(exp.id)}
                  >
                    Delete
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
      <ToastContainer postion="top-right" autoClose={3000} />
    </Container>
  );
};

export default ExpenseTracker;
