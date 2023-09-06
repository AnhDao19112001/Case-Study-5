import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <div id="header" className="fixed-top">
        <ul id="nav" style={{display: 'inline-block'}}>
          <li>
            <NavLink to="/">
              <img src="img/logo@2x.png" alt="" height="40px" />
            </NavLink>
          </li>
          <li>
            <NavLink to="/facility">Dịch vụ</NavLink>
          </li>
          <li>
            <NavLink to="/customer">Khách hàng</NavLink>
          </li>
          <li>
            <NavLink to="/login">Đăng nhập</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Header;
