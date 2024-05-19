




const Button = ({handleButton, children}) => {

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "end", position: "relative", width: "100%", height: "5rem", marginBottom: "1rem" }}>
            <div onClick={() => handleButton()} style={{ cursor: "pointer", position: "relative", width: "10rem", height: "3rem", background: "#0d6efd", borderRadius: "2rem", right: "0%", marginRight: "1rem" }}>
                 {children}
            </div>
        </div>

    );
}


export default Button;