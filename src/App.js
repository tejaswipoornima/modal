import React, { useState } from 'react';
import './XModal.css'; // Import your CSS file for modal styling

function XModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dob: '',
    phone: '',
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    dob: '',
    phone: '',
  });

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setErrors({
      username: '',
      email: '',
      dob: '',
      phone: '',
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, dob, phone } = formData;
    let valid = true;
    let newErrors = { username: '', email: '', dob: '', phone: '' };

    if (!username) {
      newErrors.username = 'Please fill out this field.';
      valid = false;
    }
    if (!email.includes('@')) {
      newErrors.email = 'Invalid email. Please check your email address.';
      valid = false;
    }
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      newErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
      valid = false;
    }
    if (new Date(dob) > new Date()) {
      newErrors.dob = 'Invalid date of birth. Please enter a valid date.';
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
    } else {
      alert('Form submitted successfully!');
      setFormData({
        username: '',
        email: '',
        dob: '',
        phone: '',
      });
      handleClose();
    }
  };

  const handleClickOutside = (e) => {
    if (e.target.className === 'modal') {
      handleClose();
    }
  };

  return (
    <div className="modal-app">
      <button onClick={handleOpen}>Open Form</button>
      {isOpen && (
        <div className="modal" onClick={handleClickOutside}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && <div className="error">{errors.username}</div>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  value={formData.dob}
                  onChange={handleChange}
                />
                {errors.dob && <div className="error">{errors.dob}</div>}
              </div>
              <div>
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default XModal;
