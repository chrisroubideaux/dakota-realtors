// modal component for booking a tour
import { useState } from 'react';
import Image from 'next/image';
import Calendar from 'react-calendar';
//import properties from '@/data/featured/properties';

export default function Bookings({ homes }) {
  const [value, onChange, onClickTile] = useState(new Date());

  const [date, setDate] = useState(new Date());
  return (
    <>
      <div
        class="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="fw-normal fs-5" id="exampleModalToggleLabel">
                Book your tour
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <a data-bs-target="#exampleModalToggle2" data-bs-toggle="modal">
                <Calendar
                  className="calendar text-center "
                  onChange={onClickTile}
                  value={value}
                  selectRange={true}
                ></Calendar>
              </a>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h6 class=" fs-5" id="exampleModalToggleLabel2">
                Select a time
              </h6>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* time component*/}

              <div className="">
                <div className="list-group-item list-group-item-action d-flex gap-3 py-3 ">
                  <Image
                    src={homes.photo}
                    className=" avatar"
                    width={200}
                    height={100}
                    alt="..."
                  />

                  <div className="d-flex gap-2 w-100 justify-content-between mt-1 ">
                    <div className="">
                      <h6 className="fs-5 me-2">{homes.realtor}</h6>
                      <h6 className="">{homes.name}</h6>
                      <h6 className="">{homes.times}</h6>
                    </div>

                    <small className="opacity-50 text-nowrap">
                      {/* select component */}
                      <h6 className="">{homes.days}</h6>
                      <select>
                        <option value="1">{homes.slot}</option>
                        <option value="2">{homes.slot2}</option>
                        <option value="3">{homes.slot3}</option>
                        <option value="4">{homes.slot4}</option>
                        <option value="5">{homes.slot5}</option>
                        <option value="6">{homes.slot6}</option>
                        <option value="7">{homes.slot7}</option>
                      </select>
                    </small>
                  </div>
                </div>
              </div>
            </div>
            {/* end time component*/}
            <div class="modal-footer">
              <button
                class="btn btn-md"
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
        class="btn btn-md"
        data-bs-target="#exampleModalToggle"
        data-bs-toggle="modal"
      >
        Book a tour
      </button>
    </>
  );
}
