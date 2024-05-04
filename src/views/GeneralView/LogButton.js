import { useState } from 'react';
import { ReactComponent as ProfileSVG } from '../../images/profile.svg';
import Button from './Button';
const LoginButton = ({ isLoading, isAuthenticated, logout, loginWithRedirect,setIsPopupOpen }) => {
    const logIn = !isLoading && !isAuthenticated;
    const ProfileStr = "Profile";
    const SignInStr = "Sign in"
    const [logName, setLogName] = useState(logIn ? SignInStr : ProfileStr);
    const handleLog = () => {
        if (logIn) {
            loginWithRedirect();
            setLogName(ProfileStr);

        }
        else {
            setIsPopupOpen(true);
        }
    }
    return (
        <Button handleButton={handleLog}>
            <span style={{userSelect:"none",position: "absolute", left: "25%", top: "25%" }}>{logName}</span>
            <ProfileSVG style={{ position: "absolute", right: "10%", top: "20%" }} width={"30px"} height={"30px"} />
        </Button>

    );
}





export default LoginButton;