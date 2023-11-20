// select component for selecting time slots

export default function Select({ agents }) {
  return (
    <div className="">
      <select
        className="form-select  form-select-sm  bg-dark text-white  d-block s"
        aria-label="Default select example"
      >
        <option selected className="form-select bg-dark">
          <h6 className="">Choose</h6>
        </option>
        <option value="1">
          <a className="nav-link">
            <h6 className="text-white">{agents.slot}</h6>
          </a>
        </option>
        <option value="2">
          <a className="nav-link">
            <h6 className="text-white"> {agents.slot2} </h6>
          </a>
        </option>
        <option value="3">
          <a className="nav-link">
            <h6 className="text-white"> {agents.slot3} </h6>
          </a>
        </option>
        <option value="4">
          <a className="nav-link">
            <h6 className="text-white"> {agents.slot4} </h6>
          </a>
        </option>
      </select>
    </div>
  );
}
