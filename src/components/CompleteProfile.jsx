import './CompleteProfile.css';

const CompleteProfile = () => {
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
          <form>
            <div className="mb-3">
              <label className="form-label fw-semibold">🧑 Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter full name"
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
