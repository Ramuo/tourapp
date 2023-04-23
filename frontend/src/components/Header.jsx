import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch} from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBadge,
  MDBBtn,
  MDBNavbarBrand,
  MDBNavbarLink,
} from "mdb-react-ui-kit";




function Header() {
    //STATE
    const [show, setShow] = useState(false);

    const {user} = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();



    //FUNCTIONS:
    const onLogout = () => {
        dispatch(logout());
        dispatch(reset());
        navigate('/');
    }




    //RENDERED ELEMENTS:
    return (
        <MDBNavbar
        fixed= "top"
        expand= "lg"
        style={{backgroundColor: "#f0e6ea"}}
        >
            <MDBContainer>
                <MDBNavbarBrand
                href='/' 
                style={{color: "#606080", fontWeight: "600", fontsize: "22px"}}
                >
                    Tourpedia
                </MDBNavbarBrand>
                <MDBNavbarToggler
                type= "button"
                aria-expanded="false"
                onClick={() => setShow(!show)}
                style={{color: "#606080"}}
                >
                    <MDBIcon icon="bars" fas/>
                </MDBNavbarToggler>
                <MDBCollapse
                show={show} navbar
                >
                    <MDBNavbarNav
                    right fullWidth={false}
                    className="mb-2 mb-lg-0"
                    >
                        <MDBNavbarItem>
                            <MDBNavbarLink
                            href="/"
                            >
                                <p className="header-text">Accueil</p>
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        
                        {user ? (
                            <>
                                <MDBNavbarItem>
                                    <MDBNavbarLink
                                    href="/addTour"
                                    >
                                        <p className="header-text">Destination</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>

                                <MDBNavbarItem>
                                    <MDBNavbarLink
                                    href="/dasboard"
                                    >
                                        <p className="header-text">Tableau de bord</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>

                                <MDBNavbarItem>
                                    <MDBNavbarLink
                                    href="/login"
                                    onClick={onLogout}
                                    >
                                        <p className="header-text">Déconnexion: {user.name}</p>
                                    </MDBNavbarLink>
                                </MDBNavbarItem>
                            </>
                        ) : (
                            <MDBNavbarItem>
                                <MDBNavbarLink
                                href="/login"
                                >
                                    <p className="header-text">Connexion</p>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        )}
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBContainer>
        </MDBNavbar>
    )
}

export default Header;