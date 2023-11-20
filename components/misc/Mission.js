// mission component
import Image from 'next/image';

function Mission() {
  return (
    <div className="container-fluid">
      <div className="row featurette pt-5">
        <div className="col-md-7">
          <h3 className=" fw-normal display-5">Our main mission</h3>
          <p className="fw-normal fs-5">
            Our Mission at dakota realty is to help people find their dream
            home. We strive to provide the best service possible to our
            customers. We are a small company that is dedicated to helping
            people find their dream home. We are a small company that is
            dedicated to helping people find their dream home. Contact us today
            to get started on your journey to finding your dream home. We love
            being part of such a wonderful community.
          </p>
        </div>
        <div className="col-md-5 pt-2">
          <img
            className="img-fluid image"
            src="https://images.pexels.com/photos/101808/pexels-photo-101808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width="500"
            height="500"
            alt="Test"
          />
        </div>
      </div>
      <hr className="hr mt-5" />
      <div className="row featurette pt-5">
        <div className="col-md-7 order-md-2">
          <h3 className=" fw-normal display-5">Best in the business</h3>
          <p className="fw-normal fs-5">
            Come and see wh ywe are the best reality company in town. We have a
            team of experts that will help you find the perfect home for you and
            your family. We have been in business for over 20 years and have
            helped thousands of people find their dream home. Our agents are
            always available to answer any questions you may have about buying
            or selling a home. You can also use our website to search for homes
            in your area by price range, number of bedrooms/bathrooms, square
            ft.
          </p>
        </div>
        <div className="col-md-5 order-md-1">
          <img
            className="img-fluid image"
            src="https://images.pexels.com/photos/7641835/pexels-photo-7641835.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            width="500"
            height="500"
            alt="Test"
          />
        </div>
      </div>
      <hr className="hr mt-5" />
      <div className="row featurette pt-5 mt-5">
        <div className="col-md-7">
          <h3 className="ml-5 fw-normal display-5">Striving for the best</h3>
          <p className="fw-normal fs-5">
            Here at dakota realty we are always striving to be the best in the
            business. We are always looking for ways to improve our business and
            help our customers. We truly want to provide people with the best
            experience possible while making one of the biggest decisions of
            their life. We have a team of dedicated team of realtors that are
            always ready to help you find your dream home and start your new
            journey.
          </p>
        </div>
        <div className="col-md-5">
          <img
            className="img-fluid image"
            src="https://images.pexels.com/photos/3785419/pexels-photo-3785419.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Test"
            width="500"
            height="500"
          />
        </div>
      </div>
    </div>
  );
}

export default Mission;
