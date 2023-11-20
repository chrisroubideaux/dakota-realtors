// profile page

import Nav from '@/components/nav/Nav';

import Footer from '@/components/misc/Footer';

export default function Profile({}) {
  return (
    <>
      <div className="layout">
        <div className="container-fluid pt-5">
          <Nav />
          <div className="container-fluid pt-5">
            {/* sidebar */}
            <div className="row">
              <aside className="col-lg-3 col-md-4 border-end pb-5 mt-n5">
                <div className="position-sticky top-0">
                  <div className="text-center pt-5">
                    <div className="d-table position-relative mx-auto mt-2 mt-lg-4 pt-5 mb-3">
                      {/* test image */}
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
            {/* main content */}
            <div className="col-lg-9 col-md-8">
              <div>
                <h2>test</h2>

                {/* Render other user fields here */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
