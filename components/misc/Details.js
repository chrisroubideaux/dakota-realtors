// details component
import {
  FaCalendarDay,
  FaCommentDollar,
  FaHouseUser,
  FaUsersCog,
} from 'react-icons/fa';

function Details() {
  return (
    <div className="container pt-5 mt-5">
      <div className="container ">
        <h2 className=" display-3 text-center">Why Choose Us?</h2>
      </div>
      <div className="row row-cols-1 row-cols-md-2 align-items-md-center g-5 pt-5 mt-5 h-100">
        <div className="d-flex flex-column align-items-start gap-2 pt-3">
          <h3 className="fw-bold">
            We got you covered with the best realtors in the business.
          </h3>
          <p className=" fw-semibold">
            Come and see why we are the best realty company in town. We have a
            team of experts who will help you find the perfect home for you and
            your family. We have been in business for over 20 years and have
            helped thousands of people find their dream homes. Our agents are
            always available to answer any questions you may have about buying
            or selling a home. You can also use our website to search for homes
            in your area by price range, number of bedrooms/bathrooms, square
            footage, and more! Whether you&rsquo;re looking for a new place to
            live or want to sell your current property, we can help! Contact one
            of our experienced agents today! We look forward to working with you
            soon!
          </p>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 g-4">
          <div className="d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex bg-gradient fs-4 rounded-3">
              <FaCommentDollar className="bi social-icons me-2 fs-5" />
            </div>
            <h4 className="fw-semibold mb-0">Sell with confidance</h4>
            <p className="fw-semibold">
              With our team of experts, you can sell your home with confidence
              and know you got the best price for your property.
            </p>
          </div>

          <div className="d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex  bg-gradient fs-4 rounded-3">
              <FaCalendarDay className="bi social-icons me-2 fs-5" />
            </div>
            <h4 className="fw-semibold mb-0">Open House</h4>
            <p className="fw-semibold">
              We have an open house every Saturday from 10 am to 2 pm at our
              selected properties. Check our calendar for more details
            </p>
          </div>

          <div className="d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex bg-gradient fs-4 rounded-3">
              <FaUsersCog className="bi social-icons me-2 fs-5" />
            </div>
            <h4 className="fw-semibold mb-0">Meet our team</h4>
            <p className=" fw-semibold">
              Meet our dream team of experts who will help you find the perfect
              home. Check our calendar for more details on all our properties.
            </p>
          </div>

          <div className="d-flex flex-column gap-2">
            <div className="feature-icon-small d-inline-flex bg-gradient fs-4 rounded-3">
              <FaHouseUser className="bi social-icons me-2 fs-5" />
            </div>
            <h4 className="fw-semibold mb-0">Our Mission</h4>
            <p className=" fw-semibold">
              Our mission goes beyond providing you with the best real estate.
              We truly believe in the power of relationships.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
