// user info
'use client';

const User = (users) => {
  return (
    <>
      <div className="container-fluid pt-5">{/* user info */}</div>
    </>
  );
};

export default User;

{
  /* 
// user info
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    // Add other user fields here as needed
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch user data from the backend
    const fetchUserData = async () => {
      try {
        // Include the JWT token in the headers of your axios request
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage or another storage mechanism
        const response = await axios.get('http://localhost:3001/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userData = response.data;
          setUser(userData); // Update the user state with fetched data
          setLoading(false); // Set loading to false
        } else {
          // Handle error response
          setError('Failed to fetch user data');
          setLoading(false); // Set loading to false
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Internal server error');
        setLoading(false); // Set loading to false
      }
    };

    // Call the fetchUserData function when the component mounts
    fetchUserData();
  }, []);

  return (
    <>
      <div className="container-fluid pt-5">
    
        <div className="row">
          <aside className="col-lg-3 col-md-4 border-end pb-5 mt-n5">
            <div className="position-sticky top-0">
              <div className="text-center pt-5">
                <div className="d-table position-relative mx-auto mt-2 mt-lg-4 pt-5 mb-3">
                 
                  <button className="btn btn-md btn-accent d-block w-75 m-auto mt-3">
                    refresh
                  </button>
                </div>
                <h2 className="fw-bold">Welcome back</h2>
                <p className="fw-normal">Real Estate Agent</p>
              </div>
            </div>
          </aside>
        </div>
      
        <div className="col-lg-9 col-md-8">
          {loading ? (
            <p>Loading user data...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <div>
              <h2>{user.fullName}</h2>
              <p className="dark-text">Email: {user.email}</p>
             
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default User;

*/
}
