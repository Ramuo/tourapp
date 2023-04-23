import {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import {toast} from 'react-toastify';
// import {GoogleLogin} from 'react-google-login';
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






function RegisterPage() {
     // State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const {name, email, password, password2} = formData;

  //Let's dispatch the register action from auth/authSlice
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Let's select pieces of our state (global state) from auth/authSlice
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth);
    

    useEffect(()=> {
        if(isError){
          toast.error(message);
        }
        // Redirect if it is a success when logged in
        if(isSuccess || user){
          navigate('/');
          toast.success('Créé avec succès')
        }
    
        dispatch(reset());
    
    }, [isError, isSuccess, user, message, navigate, dispatch]);
    

    //FUNCTIONS:
    //To submit the rgistering form
    const handleSubmit = (e) => {
        e.preventDefault();

        //Check if password & password2 match
        if(password !== password2){
            toast.error("Le mot de passe ne correspond pas")
        }else{
            const userData = {
                name,
                email,
                password
            };
            dispatch(register(userData));
        }
    };

    //Onchage formData
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    //Google success and failure
    // const googleSuccess = (resp) => {
    //     console.log(resp);
    // };

    // const googleFailure = (err) => {
    //     toast.error(err)
    // };


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
            <h5>S'inscrire</h5>
            <MDBCardBody>
                <MDBValidation onSubmit={handleSubmit} noValidate className='row g-3'>
                    <div className="col-md-12">
                        <MDBInput
                        label="Nom"
                        type="text"
                        id='name'
                        name='name'
                        value={name}
                        onChange={onChange}
                        required
                        validation="Votre nom"
                        />
                    </div>
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
                    <div className="col-md-12">
                        <MDBInput
                        label="Confirmer le mot de passe"
                        type="password"
                        id='password2'
                        name='password2'
                        value={password2}
                        onChange={onChange}
                        required
                        validation="Confirmer votre mot de passe"
                        />
                    </div>
                    <div className="col-12">
                        <MDBBtn style={{width: "100%"}} className='mt-2'>
                            {isLoading && (
                                <MDBSpinner
                                size= "sm"
                                role= "status"
                                tag= "span"
                                className='me-2'
                                />
                            )}
                            Envoyer
                        </MDBBtn>
                    </div>
                </MDBValidation>
                {/* <br />
                <GoogleLogin
                clientId="977441319517-14s4up6eakoll6821mjvg10vkdjlt1pt.apps.googleusercontent.com"
                render={(renderProps) => (
                    <MDBBtn
                    style={{width: "100%"}} 
                    color='danger'
                    onClick={(renderProps.onClick)}
                    disabled={renderProps.disabled}
                    >
                        <MDBIcon className='me-2' fab icon='google'/> S'inscrire avec Google
                    </MDBBtn>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                cookiePolicy='single_host_origin'
                /> */}
            </MDBCardBody>
            <MDBCardFooter>
                <Link to='/login'>
                    <p>
                        Vous avez déja un compte ? {' '} Créér un compte
                    </p>
                </Link>
            </MDBCardFooter>
        </MDBCard>
    </div>
    )
}

export default RegisterPage