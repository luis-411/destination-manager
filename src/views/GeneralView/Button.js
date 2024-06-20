const Button = ({handleButton, children, className = ''}) => {
    return (
      <div
        onClick={() => handleButton()}
        className={`px-4 ${className}`}
        style={{
          cursor: "pointer",
          position: "relative",
          color: "black",
          height: "2.3rem",
          minWidth: "11.5rem",
          background: "white",
          borderRadius: "0.8rem",
          marginRight: "1rem"
      }}>
           {children}
      </div>
    );
}


export default Button;