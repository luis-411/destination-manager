import { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { removeToken } from '../../helpers';
import { message } from 'antd';
import { ReactComponent as UserIcon } from '../../images/user.svg';
import {usePersonalInfoModal} from "../Personalnformation/PersonalInformation";

const logStates = {
    NOT_SIGNED_IN: "Sign in",
    SIGNED_IN: "Personal information"
}

const LoginButton = () => {
    const { user, setUser } = useAuthContext();
    const navigate = useNavigate();
    const [logName, setLogName] = useState(logStates.NOT_SIGNED_IN);
    const { setIsOpen: setIsInfoModalOpen } = usePersonalInfoModal();
    const handleLogout = () => {
        navigate("/", { replace: true })
        setUser(undefined);
        removeToken();
        message.success(`Logged out successfully!`);
    }

    const handleCTAButton = () => {
        if (!user) {
            navigate("/signin", { replace: true });
        } else {
            setIsInfoModalOpen(true);
        }
    };


    useEffect(() => {
        if (user) {
            setLogName(logStates.SIGNED_IN);
        } else {
            setLogName(logStates.NOT_SIGNED_IN);
        }
    }, [user]);

    return (
      <div className='w-100 py-3 d-flex align-items-center justify-content-between'>
          <Button className={'d-flex align-items-center gap-3'} handleButton={handleCTAButton}>
              <div className='rounded-circle' style={{ backgroundColor: '#D9D9D9', width: '1.5rem' }}>
                  <UserIcon />
              </div>
              <span className={'fw-bold'} style={{ userSelect: "none", fontSize: '12px' }}>{logName}</span>
          </Button>
          {user && (
            <button style={{fontSize: '12px', color: 'white', whiteSpace: 'nowrap'}} className='me-3 btn' onClick={handleLogout}>
                Log out
            </button>
          )}
      </div>
    );
}


export default LoginButton;