// register form
'use client';
import Link from 'next/link';

const Form = () => {
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

        <form className="form text-center">
          <input
            className="form-control m-2 fw-bold"
            required
            type="text" // Use text input for full name
            name="fullName" // Match the name attribute to the field in formData
            placeholder="Enter Full Name" // Update the placeholder
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="email"
            name="email"
            placeholder="Enter Email"
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="password"
            name="password"
            placeholder="Enter Password"
          />
          <input
            className="form-control m-2 fw-bold"
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />

          <div className="container">
            <button className="w-100 btn btn-md" type="submit">
              Register
            </button>
          </div>

          <p> test</p>

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
