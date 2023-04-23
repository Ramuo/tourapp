import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { login, reset } from '../features/auth/authSlice';
import {toast} from 'react-toastify';
import {
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardFooter,
    MDBBtn,
    MDBIcon,
    MDBSpinner,
    MDBValidation
} from 'mdb-react-ui-kit';

function LoginPage() {
     //STATE
     const [formData, setFormData] = useState({
        email: '',
        password: '',
        
    });

    const {email, password} = formData;

    // Data from global state
    const {user, isLoading, isSuccess, isError, message} = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    

    useEffect(() => {
        if(isError){
            toast.error(message);
        };

        //Redirect when user logged in
        if(isSuccess || user){
            navigate('/');
            toast.success('Connecté');
        }

        //Reset
        return () => {
            dispatch(reset());
        };
    }, [user, isSuccess, isError, message, navigate, dispatch]);

    //FUNCTIONS:
    //To submit the rgistering form
    const handleSubmit = (e) => {
        e.preventDefault();

        //Get deta from the form
        const  userData = {
            email,
            password
        };

        dispatch(login(userData))
    };

    //Onchage formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    //RENDERED ELEMENTS:
    return (
    <div
    style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "450px",
        alignContent: "center",
        marginTop: "120px"
    }}
    >
        <MDBCard alignment="center">
            <MDBIcon fas icon="user-circle" className='fa-2x'/>
            <h5>Connexion</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                    <div className="col-md-12">
                        <MDBInput
                        label="Email"
                        type="email"
                        id='email'
                        name='email'
                        value={email}
                        onChange={onChange}
                        required
                        validation="Votre adresse email"
                        />
                    </div>
                    <div className="col-md-12">
                        <MDBInput
                        label="Mot de passe"
                        type="password"
                        id='password'
                        name='password'
                        value={password}
                        onChange={onChange}
                        required
                        validation="Votre mot de passe"
                        />
                    </div>
                    <div className="col-12">
                        <MDBBtn style={{width: "100%"}} className='mt-2'>
                            {/* {isLoading && (
                                <MDBSpinner
                                size= "sm"
                                role= "status"
                                tag= "span"
                                className='me-2'
                                />
                            )} */}
                            Envoyer
                        </MDBBtn>
                    </div>
                </MDBValidation>
            </MDBCardBody>
            <MDBCardFooter>
                <Link to='/register'>
                    <p>
                        Vous n'avez pas encore de compte ? {' '} Créér un compte
                    </p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
    )
}

export default LoginPage;