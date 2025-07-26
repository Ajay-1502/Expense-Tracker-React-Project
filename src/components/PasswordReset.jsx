import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');

  const submitFormHandler = async (e) => {
    e.preventDefault();
    await resetPassword();
  };

  async function resetPassword() {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC2R6CqvtCPts67hiewAs0OXvYjQKeIG64',
        {
          method: 'POST',
          body: JSON.stringify({
            requestType: 'PASSWORD_RESET',
            email: email,
          }),
          headers: {
            'Content-type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.err.message || 'Password reset failed');
      }
      const data = await response.json();
      console.log(data);
      toast.success('Password reset link is sent to your registered email');
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <div className="container-fluid forgot-container">
      <div className="row justify-content-center align-items-center min-vh-100">
        <div className="col-md-8 d-flex justify-content-center align-items-center">
          <div className="d-flex card-box">
            <div className="right-form bg-dark text-white p-4 rounded-end">
              <h5 className="mb-4 text-center text-danger">
                🔐Expense Tracker
              </h5>
              <p className="text-center mb-3 small">
                Enter the email with which you have registered.
              </p>
              <form onSubmit={submitFormHandler}>
                <input
                  type="email"
                  className="form-control mb-3"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div className="d-grid mb-2">
                  <button type="submit" className="btn btn-danger">
                    Send Password Reset Link
                  </button>
                </div>
                <p className="text-center small mt-2">
                  Already a user?{' '}
                  <Link
                    to="/"
                    className="text-decoration-none text-white fw-bold"
                  >
                    Login
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default PasswordReset;
