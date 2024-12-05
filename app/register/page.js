// register page
'use client';
import axios from 'axios';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaFacebook, FaGoogle } from 'react-icons/fa';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrengthError, setPasswordStrengthError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordError('Passwords must match.');
      } else if (
        name === 'password' &&
        formData.confirmPassword !== '' &&
        value !== formData.confirmPassword
      ) {
        setPasswordError('Passwords must match.');
      } else {
        setPasswordError('');
      }

      if (name === 'password') {
        const passwordStrengthMessage = validatePasswordStrength(value);
        setPasswordStrengthError(passwordStrengthMessage);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords must match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/users',
        formData
      );

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token);

        if (response.data.redirectTo) {
          router.push(response.data.redirectTo);
        }

        setSuccessMessage('Registration successful!');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Internal server error');
    }
  };
  const handleGoogleRegister = () => {
    const googleOAuthURL = 'http://localhost:3001/auth/google/register';
    window.open(
      googleOAuthURL,
      'Google OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };

  const handleFacebookRegister = () => {
    const facebookOAuthURL = 'http://localhost:3001/auth/facebook/register';

    window.open(
      facebookOAuthURL,
      'Facebook OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };

  return (
    <div className="container">
      <div className="text-center">
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
            name="name"
            value={formData.name}
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
            className={`form-control m-2 fw-bold ${
              passwordError || passwordStrengthError ? 'is-invalid' : ''
            }`}
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          <input
            className={`form-control m-2 fw-bold ${
              passwordError ? 'is-invalid' : ''
            }`}
            required
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {passwordError && (
            <p className="text-danger fw-bold">{passwordError}</p>
          )}
          {passwordStrengthError && (
            <p className="text-danger fw-bold">{passwordStrengthError}</p>
          )}
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
          <button className="w-100 btn btn-md" type="submit">
            Register
          </button>
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

{
  /*
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

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrengthError, setPasswordStrengthError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'password' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && value !== formData.password) {
        setPasswordError('Passwords must match.');
      } else if (
        name === 'password' &&
        formData.confirmPassword !== '' &&
        value !== formData.confirmPassword
      ) {
        setPasswordError('Passwords must match.');
      } else {
        setPasswordError('');
      }

      if (name === 'password') {
        const passwordStrengthMessage = validatePasswordStrength(value);
        setPasswordStrengthError(passwordStrengthMessage);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords must match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:3001/users',
        formData
      );

      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token);

        if (response.data.redirectTo) {
          router.push(response.data.redirectTo);
        }

        setSuccessMessage('Registration successful!');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setErrorMessage('Internal server error');
    }
  };

  // Oauth
  const handleGoogleRegister = () => {
    const googleOAuthURL = 'http://localhost:3001/auth/google/register';
    window.open(
      googleOAuthURL,
      'Google OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };

  const handleFacebookRegister = () => {
    const facebookOAuthURL = 'http://localhost:3001/auth/facebook/register';

    window.open(
      facebookOAuthURL,
      'Facebook OAuth',
      'align-item-center',
      'width=300,height=300'
    );
  };

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
            name="name"
            value={formData.name}
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
            className={`form-control m-2 fw-bold ${
              passwordError || passwordStrengthError ? 'is-invalid' : ''
            }`}
            required
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
          />
          <input
            className={`form-control m-2 fw-bold ${
              passwordError ? 'is-invalid' : ''
            }`}
            required
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
          />
          {passwordError && (
            <p className="text-danger fw-bold">{passwordError}</p>
          )}
          {passwordStrengthError && (
            <p className="text-danger fw-bold">{passwordStrengthError}</p>
          )}

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

          {passwordError && (
            <p className="text-danger fw-bold">{passwordError}</p>
          )}

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
*/
}
