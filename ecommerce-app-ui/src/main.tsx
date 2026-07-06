import { createRoot } from 'react-dom/client'
import "./index.css";
import App from "./App.tsx";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
      theme="colored" />
      <App />
    </Provider>
  </>
)