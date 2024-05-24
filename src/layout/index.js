import { Container } from "@mui/material"; // Import Container component from MUI library
import Navbar from "../components/Navbar"; // Import Navbar component

/**
 * Layout component
 * Wraps the application with a common layout structure.
 * Includes the Navbar at the top and a Container for main content.
 *
 * @param {Object} props - React props
 * @param {React.ReactNode} props.children - The content to be displayed within the layout
 */
const Layout = ({ children }) => {
  return (
    <div>
      {/* Render the Navbar component */}
      <Navbar />
      {/* Main content container with top margin */}
      <Container sx={{ marginTop: 2 }}>{children}</Container>
    </div>
  );
};

export default Layout; // Export the Layout component
