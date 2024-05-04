import { useState } from 'react';
import { ReactComponent as ProfileSVG } from '../../images/profile.svg';

const LoginButton = ({ isLoading, isAuthenticated, logout, loginWithRedirect,setIsPopupOpen }) => {
    const logIn = !isLoading && !isAuthenticated;
    const [log, setLog] = useState(logIn ? "Sign in" : "Profile");
    const handleLog = () => {
        if (logIn) {
            loginWithRedirect();
            setLog("Sign out");

        }
        else {
            logout();
            setLog("Sign in")
        }
    }
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "end", position: "relative", width: "100%", height: "5rem", marginBottom: "1rem" }}>
            <div onClick={() => logIn?handleLog():setIsPopupOpen(true)} style={{ cursor: "pointer", position: "relative", width: "10rem", height: "3rem", background: "#0d6efd", borderRadius: "2rem", right: "0%", marginRight: "1rem" }}>
                <span style={{userSelect:"none",position: "absolute", left: "25%", top: "25%" }}>{log}</span>
                <ProfileSVG style={{ position: "absolute", right: "10%", top: "20%" }} width={"30px"} height={"30px"} />
            </div>
        </div>

    );
}





export default LoginButton;