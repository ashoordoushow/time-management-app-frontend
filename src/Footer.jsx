export function Footer() {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>© {new Date().getFullYear()} Task Priority Breakdown. All Rights Reserved.</p>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black
    padding: "15px",
    textAlign: "center",
    position: "fixed",
    bottom: "0",
    left: "0", // Ensures it starts at the very left
    width: "100vw", // Makes it take up the full width
    zIndex: "1000",
    backdropFilter: "blur(10px)", // Adds smooth blur effect
  },
  text: {
    color: "#fff",
    fontSize: "14px",
  }
};
