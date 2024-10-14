import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function RedirectOnRefresh({ children }) {
  const navigate = useNavigate();


  useEffect(() => {
    const userData = sessionStorage.getItem("userData");

    if (
      window.performance.getEntriesByType("navigation")[0].type === "reload" && !userData
    ) {
      navigate("/");
    }
  }, [navigate]);

  return children;
}

export default RedirectOnRefresh;
