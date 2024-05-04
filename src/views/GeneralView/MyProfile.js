


const LoginForm = ({isOpen}) => {
    return (
    <div style={{ zIndex:"999999",position: "fixed", top: "0", left: "0", width: "100%", height:"100%",backgroundColor:"rgba(0, 0, 0, 0.5)",display:isOpen?"flex":"none",justifyContent:"center",alignItems:"center"}}>
        <div style={{width:"60%",height:"90%",backgroundColor:"white", padding:"1.5rem",borderRadius:"1rem",boxShadow:"0 2px 4px rgba(0, 0, 0, 0.1)"}}>
            <div>This is a popup</div>
        </div>
    </div >
);
}



export default LoginForm;