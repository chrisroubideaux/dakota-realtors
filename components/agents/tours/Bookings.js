// Component for booking appointments
import { useState } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
//import properties from '@/data/featured/properties';

export default function Bookings({ agents }) {
  const [value, onChange, onClickTile] = useState(new Date());
  const [date, setDate] = useState(new Date());

  return (
    <>
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="fw-normal fs-5" id="exampleModalToggleLabel">
                Book your tour
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <a data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                <Calendar
                  className="calendar text-center "
                  onChange={onClickTile}
                  value={value}
                  selectRange={true}
                ></Calendar>
              </a>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className=" fs-5" id="exampleModalToggleLabel2">
                Select a time
              </h6>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="">
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3 ">
                  <Image
                    src={agents.photo || '/fallback-image.jpg'}
                    className=" avatar"
                    width={200}
                    height={100}
                    alt="mls"
                  />

                  <div className="d-flex gap-2 w-100 justify-content-between mt-1 ">
                    <div className="">
                      <h6 className="fs-5 me-2">{agents.realtor}</h6>
                      <h6 className="">{agents.name}</h6>
                      <h6 className="">{agents.times}</h6>
                    </div>

                    <small className="opacity-50 text-nowrap">
                      <h6 className="">{agents.days}</h6>
                      <select>
                        <option value="1">{agents.slot}</option>
                        <option value="2">{agents.slot2}</option>
                        <option value="3">{agents.slot3}</option>
                        <option value="4">{agents.slot4}</option>
                        <option value="5">{agents.slot5}</option>
                        <option value="6">{agents.slot6}</option>
                        <option value="7">{agents.slot7}</option>
                      </select>
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="btn btn-md"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                back to calendar
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className="btn btn-md"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Book a tour
      </button>
    </>
  );
}
