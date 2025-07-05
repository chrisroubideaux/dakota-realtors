// about page
import Nav from '@/components/nav/Nav';
import Mission from '@/components/misc/Mission';
import Footer from '@/components/misc/Footer';

function About() {
  return (
    <>
      <div className="layout h-100">
        <Nav />
        <div className="about mt-1">
          <div className="containter text-center py-5 ">
            <h1 className="display-3 py-3 mt-5">Our Mission</h1>
            <h4 className="fw-normal text-white ">
              Connecting you with the best realtors in the area
            </h4>
          </div>
        </div>
        <div className="container py-5 my-5 ">
          <h2 className="text-center fw-bold py-5 display-3">About</h2>
          <hr className="hr text-center" />
          <Mission />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default About;
