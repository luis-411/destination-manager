import { ReactComponent as XSymbol } from '../../images/x_symbol.svg';
import {useLocation, useNavigate} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

export const AuthPaths = {
  SIGN_IN: '/signin',
  SIGN_UP: '/signup'
}

const AuthForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClose = () =>{
      navigate('/', {replace: true})
    }
    const Component = location.pathname === AuthPaths.SIGN_IN  ? <SignIn /> : <SignUp />;
    const isOpen = Object.values(AuthPaths).includes(location.pathname);

    if (!isOpen) {
      return null;
    }

    return (
        <div style={{ zIndex: "999999", position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: isOpen ? "flex" : "none", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "40%", position: "relative", backgroundColor: "white", padding: "2rem", borderRadius: "1rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                <XSymbol onClick={handleClose} style={{ cursor: "pointer", position: "absolute",right:"2.5rem"}} width={"15px"} height={"15px"} />
                <div style={{ marginTop: "50px" }}>
                    {Component}
                </div>
                <div style={{ display: "flex", justifyContent: "space-evenly", width: "30rem" }}>
                </div>

            </div>
        </div >
    );
}



export default AuthForm;