// login page
'use client';
// imports
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

// metadata

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

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
      const response = await axios.post(
        'https://midwest-realtors-95d2cdb37007.herokuapp.com/auth/login',
        formData
      );

      if (response.status === 200) {
        window.location.href = '/user';
      } else {
        const data = response.data;
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Internal server error');
    }
  };

  // Add Google login function
  const handleGoogleLogin = () => {
    // Redirect the user to Google OAuth login
    window.location.href =
      'https://midwest-realtors-95d2cdb37007.herokuapp.com/auth/google/login';
  };

  // Facebook registration function
  const handleFacebookLogin = () => {
    const facebookOAuthURL =
      'https://midwest-realtors-95d2cdb37007.herokuapp.com/auth/facebook/register';

    window.open(
      facebookOAuthURL,
      'Facebook OAuth',
      'align-item-center',
      'width=300,height=300'
    );
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

          <div className="container">
            <button className="w-100 btn btn-md" type="submit">
              Login
            </button>
            <h6 className="text-muted pt-3">or login with</h6>
            <ul className="nav justify-content-center list-unstyled d-flex pt-2 ">
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
          </div>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <p className="pt-1 fw-bold">{"Don't have an account"}</p>
          <Link className="btn btn lg w-75" href="/register">
            Register
          </Link>
          <p className="mt-1 mb-3 text-muted">&copy; Dakota Realtors, 2024</p>
        </form>
      </div>
    </div>
  );
};

export default Login;
