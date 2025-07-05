// Login page
'use client';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const Login = () => {
  // Form data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://dakota-realtors.onrender.com/users/login',
        formData
      );

      if (response.status === 200) {
        const { token, user } = response.data;

        // Save data to localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', user._id);
        localStorage.setItem('userRole', user.role);

        // Redirect based on role
        if (user.role === 'admin') {
          window.location.href = `http://https://dakota-realtors.vercel.app/admins/${user._id}`;
        } else if (user.role === 'agent') {
          window.location.href = `https://dakota-realtors.vercel.app/agents/${user._id}`;
        } else {
          window.location.href = `https://dakota-realtors.vercel.app/user/${user._id}`;
        }
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      setError('Internal server error');
    }
  };

  // Google OAuth
  const handleGoogleLogin = () => {
    window.location.href =
      'https://dakota-realtors.onrender.com/auth/google/login';
  };

  // Facebook OAuth
  const handleFacebookLogin = () => {
    const facebookOAuthURL =
      'https://dakota-realtors.onrender.com/auth/facebook/login';
    window.open(facebookOAuthURL, '_self');
  };

  return (
    <div className="container-fluid">
      <div className="text-center py-5">
        <Link href="/" className="nav-item">
          <img
            className="mb-4"
            src="https://pngimg.com/uploads/house/house_PNG55.png"
            alt="Dakota Realtors Logo"
            width="72"
            height="57"
          />
        </Link>
        <h2 className="fw-bold">Login to Your Account</h2>

        <form className="form text-center" onSubmit={handleSubmit}>
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

          <button className="w-100 btn btn-md" type="submit">
            Login
          </button>
          <h6 className="text-muted pt-3">or login with</h6>
          <ul className="nav justify-content-center list-unstyled d-flex pt-2">
            <li className="ms-3">
              <button
                className="text-muted bg-transparent border-0"
                onClick={handleFacebookLogin}
              >
                <FaFacebook className="social-icons m-2" />
              </button>
            </li>
            <li className="ms-3">
              <button
                className="text-muted bg-transparent border-0"
                onClick={handleGoogleLogin}
              >
                <FaGoogle className="social-icons m-2" />
              </button>
            </li>
          </ul>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <p className="pt-1 fw-bold">{"Don't have an account?"}</p>
          <Link className="btn btn-md w-100" href="/register">
            Register
          </Link>
          <p className="mt-1 mb-3 text-muted">&copy; Realty Dakota, 2025</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
