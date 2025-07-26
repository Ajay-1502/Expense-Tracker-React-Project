import { useState } from 'react';
import './CompleteProfile.css';

const CompleteProfile = () => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  async function formSubmitHandler(e) {
    e.preventDefault();
    if (name.trim().length > 0 && imageUrl.trim().length > 0) {
      await updateProfileDetails();
    } else {
      alert('Fields cannot be empty');
    }
  }

  async function updateProfileDetails() {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC2R6CqvtCPts67hiewAs0OXvYjQKeIG64',
        {
          method: 'POST',
          body: JSON.stringify({
            idToken: localStorage.getItem('token'),
            displayName: name,
            photoUrl: imageUrl,
            returnSecureToken: true,
          }),
          header: {
            'Content-type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error.message || 'Failed to update your profile'
        );
      }
      const data = await response.json();
      console.log(data);
      alert('Your Profile is updated successfully');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="update-profile-container mt-0">
      <div className="alert alert-info d-flex justify-content-between align-items-center banner-box ">
        <p className="mb-0">
          🚀{' '}
          <strong>
            {' '}
            Complete profile improves your experience on the platform
          </strong>
        </p>
        <p className="btn btn-link p-0 complete-link">Complete Now</p>
      </div>

      <div className="card shadow-lg profile-card mt-3">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Update Profile</h2>
          <form onSubmit={formSubmitHandler}>
            <div className="mb-3">
              <label className="form-label fw-semibold">🧑 Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                🌐 Profile Photo URL
              </label>
              <input
                type="url"
                className="form-control"
                placeholder="Enter image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>

            <div className="d-flex justify-content-end gap-2 mt-4">
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;
