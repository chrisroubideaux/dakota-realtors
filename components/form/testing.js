// register form
'use client';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: '', // Add a fullName field
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the registration endpoint using Axios
      const response = await axios.post(
        'http://localhost:3001/auth/register',
        formData
      );

      if (response.status === 201) {
        setSuccessMessage('User registered successfully');
        // Redirect to the profile page after successful registration
        window.location.href = '/profile';
      } else {
        const data = response.data;
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Internal server error');
    }
  };

  return (
    <div>
      <div className="text-center py-5">
        <Link href="/" className="nav-item">
          <img
            className="mb-4"
            src="https://pngimg.com/uploads/house/house_PNG55.png"
            alt=""
            width="72"
            height="57"
          />
        </Link>
        <h2 className="fw-bold">Create your Account</h2>

        <form className="form text-center" onSubmit={handleSubmit}>
          <input
            className="form-control m-2 fw-bold"
            required
            type="text" // Use text input for full name
            name="fullName" // Match the name attribute to the field in formData
            placeholder="Enter Full Name" // Update the placeholder
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="password"
            name="password"
            placeholder="Enter Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <div className="container">
            <button className="w-100 btn btn-md" type="submit">
              Register
            </button>
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

          <p className="pt-3 fw-bold">Already have an account?</p>
          <Link className="btn btn lg w-75" href="/login">
            Login
          </Link>
          <p className="mt-5 mb-3 text-muted">&copy; Dakota Realtors, 2023</p>
        </form>
      </div>
    </div>
  );
};

export default Form;
