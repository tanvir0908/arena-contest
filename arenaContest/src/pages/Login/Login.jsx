import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../../components/Container/Container";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function Login() {
  // page start from the top
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const [loginError, setLoginError] = useState(null);

  const axiosPublic = useAxiosPublic();

  const location = useLocation();
  const navigate = useNavigate();

  // import loginUser and google login from authContext
  const { loginUser, googleLogin } = useContext(AuthContext);

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // submit form
  const onSubmit = (data) => {
    setLoginError(null);
    loginUser(data.email, data.password)
      .then((result) => {
        navigate(location?.state ? location.state : "/");
        console.log(result.user);

        //Success message
        toast.success("Logged in successfully");
      })
      .catch(() => {
        //Error message
        toast.error("Login failed");
        setLoginError("Invalid email and password");
      });
  };

  const loginWithGoogle = () => {
    googleLogin()
      .then((result) => {
        // store users information into database
        const newUser = {
          name: result.user.displayName,
          photo: result.user.photoURL,
          email: result.user.email,
          role: "user",
        };
        // store users information into database
        axiosPublic.post("/users", newUser).then((res) => {
          console.log(res.data);
        });

        //Success message
        toast.success("Logged in successfully");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <div className="flex flex-col mb-12 justify-center pb-20 rounded-xl h-[85vh]">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center my-10">
          Please Login
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 md:px-0 w-full md:w-3/4 lg:w-2/6 mx-auto"
        >
          <div className="flex flex-col">
            <span className=" font-medium">Email</span>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-xl outline-none border-2 border-primary  font-medium"
            />
            {errors.email && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col my-3">
            <span className=" font-medium">Password</span>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="px-4 py-3 rounded-xl  font-medium outline-none border-2 border-primary"
            />
            {errors.password && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This field is required
              </span>
            )}
          </div>
          <p className="text-center text-red-500 mt-5  font-medium">
            {loginError}
          </p>
          <div className="form-control mt-6 ">
            <button className="bg-primary border-2 border-primary text-white w-full  font-semibold py-3 rounded-xl">
              Login
            </button>
          </div>
        </form>
        <p className="text-center my-5 text-[#706F6F] font-medium">
          Do not have an account?{" "}
          <Link className="font-bold text-primary" to={"/register"}>
            Register
          </Link>
        </p>
        <div className="flex justify-center items-center">
          <button
            onClick={loginWithGoogle}
            className="flex text-primary items-center px-5 py-2 rounded-lg gap-2  font-medium border-2 border-primary"
          >
            <FcGoogle className="text-3xl" />
            Login with Google
          </button>
        </div>
      </div>
    </Container>
  );
}
