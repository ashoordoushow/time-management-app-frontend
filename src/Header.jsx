export function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        {/* Logo on the Left */}
        <img 
          src="https://media.istockphoto.com/id/1310390634/vector/hourglass-monoline-hipster-vintage-vector-icon-illustration.jpg?s=612x612&w=0&k=20&c=ahhH7Rfv5bVWU94wCBrgCC7eQgMwmL9Tkv_OdACIr3U=" 
          alt="Logo" 
          style={styles.logo} 
        />
        
        {/* Navigation Links */}
        <div style={styles.links}>
          <a href="#" style={styles.link}>Home</a>
          <a href="#" style={styles.link}>About</a>
          <a href="#" style={styles.link}>Contact</a>
        </div>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    padding: "15px",
    position: "fixed",
    top: "0",
    left: "0", // Ensures it starts at the very left
    width: "100vw", // Makes it take up the full width
    zIndex: "1000", // Ensures it stays above everything
    backdropFilter: "blur(10px)", // Adds a slight blur effect
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between", // Logo on left, links on right
    paddingLeft: "20px",
    paddingRight: "20px",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  logo: {
    height: "40px", // Adjust logo size
    width: "auto",
    borderRadius: "5px", // Smooth edges
  },
  links: {
    display: "flex",
    gap: "20px",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    transition: "color 0.3s ease",
  }
};
