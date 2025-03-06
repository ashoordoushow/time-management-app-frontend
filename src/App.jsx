import { Header } from "./Header";
import { TasksPage } from "./TasksPage";
import { Footer } from "./Footer";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Background Video */}
      <video autoPlay loop muted className="video-background">
        <source src="/videos/vecteezy_cybersecurity-and-privacy-concepts-to-protect-data-lock_14441862.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="content">
        <TasksPage />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;

