export function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <a href="#" style={styles.link}>Home</a>
        <a href="#" style={styles.link}>About</a>
        <a href="#" style={styles.link}>Contact</a>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    padding: "15px",
    textAlign: "center",
    position: "fixed",
    top: "0",
    left: "0", // Ensures it starts at the very left
    width: "100vw", // Makes it take up the full width
    zIndex: "1000", // Ensures it stays above everything
    backdropFilter: "blur(10px)", // Adds a slight blur effect
  },
  nav: {
    display: "flex",
    justifyContent: "center",
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
