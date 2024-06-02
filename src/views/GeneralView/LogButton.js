import { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { removeToken } from '../../helpers';
import { message } from 'antd';
import { ReactComponent as UserIcon } from '../../images/user.svg';
const LoginButton = () => {
    const { user, setUser } = useAuthContext();
    const navigate = useNavigate();
    const [logName, setLogName] = useState("Sign in");
    const handleLogin = () => {
        if (!user) {
            navigate("/signin", { replace: true });
        }
    }

    const handleLogout = () => {
        navigate("/", { replace: true })
        setUser(undefined);
        removeToken();
        message.success(`Logged out successfully!`);
    }

    useEffect(() => {
        if (user) {
            setLogName("Personal information");
        }
    }, [user]);

    return (
      <div className='w-100 py-3 d-flex align-items-center justify-content-between'>
          <Button className={'d-flex justify-content-center align-items-center gap-2'} handleButton={handleLogin}>
              <div className='rounded-circle' style={{ backgroundColor: '#D9D9D9', width: '1.5rem' }}>
                  <UserIcon />
              </div>
              <span className={'fw-bold'} style={{ userSelect: "none", fontSize: '12px' }}>{logName}</span>
          </Button>
          {user && <span style={{fontSize: '12px'}} className='me-3' onClick={handleLogout}>Log out</span>}
      </div>
    );
}





export default LoginButton;