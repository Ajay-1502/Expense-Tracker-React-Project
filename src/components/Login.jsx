import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  async function login() {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2R6CqvtCPts67hiewAs0OXvYjQKeIG64',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || 'Login Failed');
      }
      const data = await response.json();
      console.log(data);
      alert('Login Successful 🎉');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="login-bg">
      <div className="login-container card shadow p-4">
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="email"
              placeholder="Email"
              className="form-control custom-input"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mb-3 position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="form-control custom-input"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-2">
            Login
          </button>

          <div className="text-center">
            <a href="#" className="text-decoration-none text-primary">
              Forgot password?
            </a>
          </div>

          <div className="text-center mt-3">
            <small className="text-muted">Don't have an account?</small>
            <a href="#" className="ms-1 text-decoration-none text-success">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
