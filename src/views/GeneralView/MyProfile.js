import Button from "./Button";


const LoginForm = ({ isOpen, setIsPopupOpen,logout }) => {
    return (
        <div style={{ zIndex: "999999", position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: isOpen ? "flex" : "none", justifyContent: "center", alignItems: "center" }}>
            <div style={{ width: "60%", height: "90%", backgroundColor: "white", padding: "2rem", borderRadius: "1rem", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)" }}>
                <h1 style={{ color: "black", textAlign: "start" }}>Profile</h1>
                <div style={{display:"flex",justifyContent:"space-evenly",width:"30rem"}}>
                    <Button handleButton={() => setIsPopupOpen(false)}>
                        <span style={{ userSelect: "none", position: "absolute", left: "40%", top: "25%" }}>Exit</span>
                    </Button>
                    <Button handleButton={() => {setIsPopupOpen(false); logout()}}>
                        <span style={{ userSelect: "none", position: "absolute", left: "32%", top: "25%" }}>Log out</span>
                    </Button>
                </div>


            </div>
        </div >
    );
}



export default LoginForm;