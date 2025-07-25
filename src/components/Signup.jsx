import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.trim().length > 5) {
      if (password !== confirm) {
        setError('Password do not match!');
        return;
      } else {
        setError('');
        await signup();
      }
    } else {
      alert('Password should be minimum 6 characters long');
    }
  };

  async function signup() {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2R6CqvtCPts67hiewAs0OXvYjQKeIG64',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Authentication Failed');
      }
      const data = await response.json();
      console.log(data);
      toast.success('Signup is successful!🎉');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="container signup-container">
      <div className="card shadow-lg p-4">
        <h2 className="text-center mb-4 text-primary">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3 fw-semibold">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mb-3 fw-semibold">
            <label>Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group mb-3 fw-semibold">
            <label>Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-control ${error ? 'is-invalid' : ''}`}
              placeholder="Re-enter password"
              value={confirm}
              required
              onChange={(e) => setConfirm(e.target.value)}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <div className="form-check mb-3 ">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setShowPassword(!showPassword)}
              id="togglePassword"
            />
            <label className="form-check-label" htmlFor="togglePassword">
              Show Password
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">Have an account? </span>
          <Link
            to="/"
            className="text-decoration-none fw-semibold text-primary"
          >
            Login
          </Link>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Signup;
