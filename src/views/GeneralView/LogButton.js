import { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../helpers';
import { message } from 'antd';
import { ReactComponent as UserIcon } from '../../images/user.svg';
import { usePersonalInfoModal } from "../Personalnformation/PersonalInformation";
import useBreakpoint from "antd/es/grid/hooks/useBreakpoint";
//import useLoadMe from '../../api/useLoadMe';
import { toImageUrl } from '../../tasks/toImageUrl';
import { useAuthContextSupabase } from '../../context/AuthContextSupabase';
import useSelectedList from '../../api/useSelectedList';
import useRightColumnOpen from './services/useRightColumnOpen';
const logStates = {
    NOT_SIGNED_IN: "Sign in",
    SIGNED_IN: "Personal information"
}

const LoginButton = () => {
    const { user, setUser, signOut } = useAuthContextSupabase();
    const navigate = useNavigate();
    const [logName, setLogName] = useState(logStates.NOT_SIGNED_IN);
    //const [{ data: personalInfo }, fetch] = useLoadMe();
    //const { setIsOpen: setIsInfoModalOpen, isOpen: isInfoModalOpen } = usePersonalInfoModal();
    const breakpoints = useBreakpoint(true)
    const { setSelectedList } = useSelectedList();
    const { setRightColumnOpen } = useRightColumnOpen();

    // useEffect(() => {
    //     if (!isInfoModalOpen && user?.id) {
    //         fetch()
    //     }
    // }, [isInfoModalOpen, user]);

    const handleLogout = () => {
        navigate("/", { replace: true })
        setUser(undefined);
        signOut();
        setSelectedList([]);
        setRightColumnOpen(false);
        //removeToken();
        //message.success(`Logged out successfully!`);
    }

    const handleCTAButton = () => {
        if (!user) {
            navigate("/signin", { replace: true });
        } else {
            //setIsInfoModalOpen(true);
        }
    };


    useEffect(() => {
        if (user) {
            setLogName(logStates.SIGNED_IN);
        } else {
            setLogName(logStates.NOT_SIGNED_IN);
        }
    }, [user]);

    const orderElements = breakpoints.xl
        ? 'flex-row align-items-center py-3'
        : 'flex-column-reverse align-items-start pb-3';

    //const showProfilePhoto = personalInfo?.profilePhoto && logName === logStates.SIGNED_IN;

    return (
        <div
            //className={`w-100 d-flex justify-content-center ${orderElements} gap-2`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 0, margin: 0 }}
        >
            {/* <Button className={'d-flex align-items-center gap-3'} handleButton={handleCTAButton}>
                <div className='rounded-circle' style={{ backgroundColor: showProfilePhoto ? "transparent": '#D9D9D9', width: '1.5rem' }}>
                    {
                       showProfilePhoto ?
                        <img
                            src={toImageUrl(personalInfo.profilePhoto)}
                            style={{ borderRadius: "50%", width: '1.85rem', height: '1.85rem', objectFit: 'cover'}}
                            alt="avatar"></img>
                        :
                        <UserIcon />}
                </div>
                <span className={'fw-bold'} style={{ userSelect: "none", fontSize: '12px' }}>{logName}</span>
            </Button> */}
            {!user && (<Button className={'d-flex align-items-center gap-2'} style={{minWidth: "8rem"}} handleButton={handleCTAButton}>
                <div className='rounded-circle' style={{ backgroundColor: '#D9D9D9', width: '1.5rem' }}>
                    <UserIcon />
                </div>
                <span className={'fw-bold'} style={{ userSelect: "none", fontSize: '12px' }}>{logName}</span>
            </Button>)}
            {user && (
                <button
                    style={{ fontSize: '12px', color: 'white', whiteSpace: 'nowrap' }}
                    className='me-3 btn'
                    onClick={handleLogout}
                >
                    Log out
                </button>
            )}
        </div>
    );
}


export default LoginButton;