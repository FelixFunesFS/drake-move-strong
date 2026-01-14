import { Navigate } from "react-router-dom";

// Redirect /classes to /schedule - consolidated into single page
const Classes = () => {
  return <Navigate to="/schedule" replace />;
};

export default Classes;
