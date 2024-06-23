import { useNavigate } from "react-router-dom";
import Button from "./UIComponents/Button";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const LogoutBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    dispatch(logout());
    navigate("/");
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
