// Banner component for the apartments page
'use client';
import Iconbar from '@/components/misc/Iconbar';

export default function Banners() {
  return (
    <div className="banner">
      <div className=" pt-5 mt-4">
        <h2 className="text-center pt-5 display-4">Featured Apartments</h2>
        <Iconbar />
        <p className="fw-normal text-center fs-5 pt-4 mt-2 p-5 m-2">
          See why we were voted the #1 Real Estate Company in the region. Check
          out our wide variety of apartments, from cozy studio apartments to
          spacious 3-bedroom homes with all the amenities. Book an appointment
          today with one of our agents or check our calendar for open house
          events. We look forward to meeting you!
        </p>
      </div>
    </div>
  );
}
