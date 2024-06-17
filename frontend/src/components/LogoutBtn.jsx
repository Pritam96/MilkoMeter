import { useNavigate } from "react-router-dom";
import Button from "./UIComponents/Button";
import { useDispatch } from "react-redux";
import { removeCredentials } from "../store/authSlice";
import axios from "axios";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await axios.get("api/auth/logout");
      dispatch(removeCredentials());
      navigate("/");
    } catch (err) {
      console.log(err?.response?.data?.message || "Something went wrong!");
    }
  };
  return (
    <Button
      bgColor="hover:bg-blue-100"
      textColor="text-white hover:text-black"
      className="inline-block px-6 py-2 duration-200 rounded-full"
      onClick={logoutHandler}
    >
      Logout
    </Button>
  );
};

export default LogoutBtn;
