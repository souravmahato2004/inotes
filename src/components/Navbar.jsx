import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAlert } from '../context/Alert/AlertContext';

export default function Navbar() {
  const {showAlert}=useAlert();
  let location=useLocation();
  const nav=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    showAlert("Logout Successfully!", "info", 1500)
    nav('/login');
  }

  return (
    <>
    <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
    <div className="container-fluid">
        <Link className="navbar-brand" to="/">Inotes</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname=='/'?'active':''}`} aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
            <Link className={`nav-link ${location.pathname=='/about'?'active':''}`} to="/about">About</Link>
            </li>
        </ul>
        {!localStorage.getItem('token')?<form className="d-flex" role="search">
            <Link className="btn btn-outline-warning mx-2" role="button" to="/signup">SignUp</Link>
            <Link className="btn btn-outline-warning mx-2" role="button" to="/login">Login</Link>
        </form>:<button onClick={handleLogout} className='btn btn-outline-warning'>Logout</button>}
        </div>
    </div>
    </nav>
    </>
  )
}
