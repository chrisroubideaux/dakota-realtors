// Times component

import Image from 'next/image';
export default function Times({ agents }) {
  return (
    <div className="box list-group w-auto m-2">
      <div className="list-group-item list-group-item-action d-flex gap-3 py-3 ">
        <Image
          src={agents.photo || '/fallback-image.jpg'}
          className="small-avatar rounded-circle m-auto mt-2 mx-3 my-3 border-0"
          width={50}
          height={50}
          alt="mls"
        />
        <div className="d-flex gap-2 w-100 justify-content-between mt-3 ">
          <div>
            <h6 className=" mb-0">{agents.appointments}</h6>
          </div>
          <small className="opacity-50 text-nowrap text-white"></small>
        </div>
      </div>
    </div>
  );
}
