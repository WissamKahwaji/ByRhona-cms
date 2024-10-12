import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Layout from "./layouts";

function App() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="App">
      <Layout>
        <Outlet />
      </Layout>
    </div>
  );
}

export default App;
