export function Header() {
  return (
    <header style={styles.header}>
      <div style={styles.logoContainer}>
        <img 
          src="https://media.istockphoto.com/id/1310390634/vector/hourglass-monoline-hipster-vintage-vector-icon-illustration.jpg?s=612x612&w=0&k=20&c=ahhH7Rfv5bVWU94wCBrgCC7eQgMwmL9Tkv_OdACIr3U=" 
          alt="Logo" 
          style={styles.logo} 
        />
      </div>

      <div style={styles.linkContainer}>
        <a href="#" style={styles.link}>Home</a>
        <a href="#" style={styles.link}>About</a>
        <a href="#" style={styles.link}>Contact</a>
      </div>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    padding: "15px",
    position: "fixed",
    top: "0",
    left: "0",
    width: "100vw",
    zIndex: "1000",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center", 
    justifyContent: "space-between", // Prevents interference between logo & links
  },

  /* ✅ Independent Control for Logo */
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", // ⚠️ Move logo: Change this to 'center' or 'flex-end' to shift position
    flex: "1", // Allows it to take space without affecting links
    paddingLeft: "20px", // Adjust distance from the left
  },

  logo: {
    height: "40px", 
    width: "auto",
  },

  /* ✅ Independent Control for Navigation Links */
  linkContainer: {
    display: "flex",
    gap: "40px", // Adjust spacing between links
    position: "absolute",
    left: "48.5%", // Ensures links have room without pushing logo
    transform: "translateX(-50%)"
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  }
};
