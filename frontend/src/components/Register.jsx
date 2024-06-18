import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Input from "./UIComponents/Input";
import Button from "./UIComponents/Button";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register as authRegister } from "../store/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [navigate, user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async (data) => {
    dispatch(authRegister(data));
  };

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-center text-2xl font-bold leading-tight text-black">
          Register to create account
        </h2>
        <p className="mt-2 text-center text-base text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-black transition-all duration-200 hover:underline"
          >
            Login here
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div>
            <Input
              label="Username"
              {...register("username", {
                required: "Please provide a username",
                minLength: {
                  value: 5,
                  message: "Username must be at least 6 characters",
                },
                maxLength: {
                  value: 32,
                  message: "Username must be at most 32 characters",
                },
              })}
              className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <div className="h-3">
              {errors.username && (
                <p className="text-red-600 text-sm text-center">
                  {errors.username.message}
                </p>
              )}
            </div>

            <Input
              label="Email"
              {...register("email", {
                required: "Please provide an email",
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
                required: "Please provide a password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                maxLength: {
                  value: 32,
                  message: "Password must be at most 32 characters",
                },
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

            <div>
              <Button
                type="submit"
                className="inline-flex w-full items-center justify-center mt-5 rounded-lg"
              >
                Create Account
              </Button>
            </div>
            <div className="h-3 p-2">
              {isError && (
                <p className="text-red-600 text-md text-center">
                  {isError.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
