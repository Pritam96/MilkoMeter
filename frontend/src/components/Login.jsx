import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./UIComponents/Input";
import Button from "./UIComponents/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }
    if (isSuccess || user) {
      navigate("/");
    }
    return () => {
      if (isSuccess || isError) {
        dispatch(reset());
      }
    };
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = async (data) => {
    dispatch(login(data));
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Don&#x27;t have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-black transition-all duration-200 hover:underline"
          >
            Create a free account
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div>
            <Input
              label="Email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <div className="h-3">
              {errors.email && (
                <p className="text-red-600 text-sm text-center">
                  {errors.email.message}
                </p>
              )}
            </div>

            <Input
              label="Password"
              {...register("password", {
                required: "Please enter your password",
              })}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />

            <div className="h-3">
              {errors.password && (
                <p className="text-red-600 text-sm text-center">
                  {errors.password.message}
                </p>
              )}
            </div>

            {isLoading ? (
              <p>Loading..</p>
            ) : (
              <div>
                <Button
                  type="submit"
                  className="inline-flex w-full items-center justify-center mt-5 rounded-lg"
                >
                  Login
                </Button>
              </div>
            )}

            <div className="h-3 p-2">
              {isError && (
                <p className="text-red-600 text-md text-center">{message}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
