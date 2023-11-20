// profile page
'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Nav from '@/components/nav/Nav';
import Footer from '@/components/misc/Footer';

export default function Profile({ params }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve the token from localStorage
    axios
      .get(`http://localhost:3001/users/${params.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setUser(response.data.user);
        } else {
          setError(response.data.message);
        }
      })
      .catch((err) => {
        setError('Failed to fetch user data.');
        console.error(err);
      });
  }, [params.id]);
  return (
    <>
      <div className="layout">
        <Nav />
        <div className="container-fluid pt-5">
          <div className="container-fluid pt-5">
            {/* sidebar */}
            <div className="row">
              <aside className="col-lg-3 col-md-4 border-end pb-5 mt-n5">
                <div className="position-sticky top-0">
                  <div className="text-center pt-5">
                    <div className="d-table position-relative mx-auto mt-2 mt-lg-4 pt-5 mb-3">
                      {/* test image */}
                      <button className="btn btn-md btn-accent d-block w-75 m-auto mt-3">
                        Refresh
                      </button>
                    </div>
                    <h2 className="fw-bold">{user?.fullName}</h2>
                    {user && <p className="fw-normal">{user.fullName}</p>}
                    {/* Display other user information */}
                  </div>
                </div>
              </aside>
            </div>
            {/* main content */}
            <div className="col-lg-9 col-md-8">
              <div>
                {error && <p>Error: {error}</p>}
                {user && (
                  <>
                    <h2>{user.fullName}&apos;s Profile</h2>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

{
  /*
// profile page

import Nav from '@/components/nav/Nav';
import User from '@/components/profile/User';
import Footer from '@/components/misc/Footer';

export default function page() {
  return (
    <>
      <div className="layout">
        <div className="container-fluid pt-5">
          <Nav />
          <User />
        </div>
        <Footer />
      </div>
    </>
  );
}


*/
}
