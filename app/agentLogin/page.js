// Agent login page 'use client';
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

  // Add the handleChange function here
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/agents/agents/login',
        formData
      );

      if (response.status === 200) {
        const { token, agent, redirectTo } = response.data;

        localStorage.setItem('authToken', token);
        localStorage.setItem('agentId', agent._id);

        window.location.href = redirectTo;
      } else {
        const data = response.data;
        setError(data.message);
      }
    } catch (err) {
      console.error(err);
      setError('Internal server error');
    }
  };

  //  Google Oauth
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3001/agents/auth/google/login';
  };

  const handleFacebookLogin = () => {
    const facebookOAuthURL = 'http://localhost:3001/agents/auth/facebook/login';

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
            <input
              type="checkbox"
              className="form-check-input"
              id="isAgent"
              checked={formData.isAgent || false}
              onChange={(e) =>
                setFormData({ ...formData, isAgent: e.target.checked })
              }
            />
            <label className="form-check-label" htmlFor="isAgent">
              Login as Agent
            </label>
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
