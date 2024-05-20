import { useEffect, useState } from 'react';
import { ReactComponent as ProfileSVG } from '../../images/profile.svg';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { removeToken } from '../../helpers';
import { message } from 'antd';
const LoginButton = () => {
    const { user,setUser } = useAuthContext();
    const navigate = useNavigate();
    const [logName, setLogName] = useState("Sign in");
    const handleLog = () => {
        if (!user) {
            navigate("/signin", { replace: true });
        }
        else {
            navigate("/", { replace: true })
            setUser(undefined);
            removeToken();
            message.success(`Logged out successfully!`);
        }

    }
    useEffect(() => {
        if (user){
            setLogName("Sign out");
        }
        else{
            setLogName("Sign in");
        }      
        
    }, [user])
    return (
        <Button handleButton={handleLog}>
            <span style={{ userSelect: "none", position: "absolute", left: "25%", top: "25%" }}>{logName}</span>
            <ProfileSVG style={{ position: "absolute", right: "10%", top: "20%" }} width={"30px"} height={"30px"} />
        </Button>

    );
}





export default LoginButton;