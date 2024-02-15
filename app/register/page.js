// register page
'use client';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaGoogle,
} from 'react-icons/fa';

// metadata

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  // success and error messages
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  // Handle form data change
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
        'https://midwest-realtors-95d2cdb37007.herokuapp.com/register',
        formData
      );

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token);

        // Check if redirectTo is present in the response
        if (response.data.redirectTo) {
          router.push(response.data.redirectTo);
        }

        setSuccessMessage('Registration successful!.');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Internal server error');
    }
  };

  // Google registration function
  const handleGoogleRegister = () => {
    // Define the Google OAuth registration URL
    const googleOAuthURL =
      'https://midwest-realtors-95d2cdb37007.herokuapp.com/auth/google/register';

    // Open the Google OAuth URL in a popup window
    window.open(
      googleOAuthURL,
      'Google OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };
  // Facebook registration function
  const handleFacebookRegister = () => {
    // Define the Facebook OAuth registration URL
    const facebookOAuthURL =
      'https://midwest-realtors-95d2cdb37007.herokuapp.com/auth/facebook/register';

    // Open the Facebook OAuth URL in a popup window
    window.open(
      facebookOAuthURL,
      'Facebook OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };

  {
    /*

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/auth/register',
        formData
      );

      if (response.status === 201) {
        // Registration successful, display success message and redirect
        setSuccessMessage(response.data.message);
        // Check if redirectTo is present in the response
        if (response.data.redirectTo) {
          router.push(response.data.redirectTo); // Redirect to the specified URL
        }
      } else {
        // Registration failed, display error message
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error during registration:', error);
      setErrorMessage('Internal server error');
    }
  };

  */
  }

  return (
    <div className="container">
      <div className="text-center ">
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
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter Full Name"
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />

          <div className="container">
            <button className="w-100 btn btn-md" type="submit">
              Register
            </button>
            <h6 className="text-muted pt-3">or register with</h6>
            <ul className="nav justify-content-center list-unstyled d-flex pt-2 ">
              <li className="ms-3">
                <button
                  className="text-muted bg-transparent border-0"
                  onClick={handleFacebookRegister}
                >
                  <FaFacebook className="social-icons m-2" />
                </button>
              </li>
              <li className="ms-3">
                <button
                  className="text-muted bg-transparent border-0"
                  onClick={handleGoogleRegister}
                >
                  <FaGoogle className="social-icons m-2" />
                </button>
              </li>
            </ul>
          </div>

          {errorMessage && <p className="text-danger">{errorMessage}</p>}
          {successMessage && <p className="text-success">{successMessage}</p>}

          <p className="pt-1 fw-bold">Already have an account?</p>
          <Link className="btn btn lg w-75" href="/login">
            Login
          </Link>
          <p className="pt-1 text-muted">&copy; Dakota Realtors, 2024</p>
        </form>
      </div>
    </div>
  );
};

export default Register;
