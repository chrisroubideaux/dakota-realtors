// tab component
import Link from 'next/link';

export default function Tab() {
  return (
    <div className="container mt-4" id="properties">
      <h3 className="d-flex">Recently added</h3>
      <div className="d-flex w-100 align-items-center justify-content-between justify-content-lg-start">
        <div>
          <ul className="nav nav-tabs d-none d-md-flex ps-lg-2 mb-0">
            <li className="nav-item pe-1">
              <Link className="nav-link fs-sm mb-2 mb-md-0" href="/apartments/">
                Apartments
              </Link>
            </li>
            <li className="nav-item pe-1">
              <Link className="nav-link fs-sm mb-2 mb-md-0" href="/homes/">
                Homes
              </Link>
            </li>
            <li className="nav-item ">
              <Link
                className="nav-link fs-sm mb-2 mb-md-0"
                href="/commercials/"
              >
                Commercial
              </Link>
            </li>
            <li className="nav-item pe-1">
              <Link className="nav-link fs-sm mb-2 mb-md-0" href="/agents/">
                Agents
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
