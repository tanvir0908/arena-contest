import { useForm } from "react-hook-form";
import Container from "../../components/Container/Container";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

export default function Register() {
  // page start from the top
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  //   import create user and logout user from AuthProvider
  const { createUser, logoutUser } = useContext(AuthContext);

  // navigate user to the login page
  const navigate = useNavigate();

  const axiosPublic = useAxiosPublic();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // submit function
  const onSubmit = (data) => {
    // Create user
    createUser(data?.email, data?.password)
      .then((result) => {
        // Add username and picture to the firebase
        updateProfile(result.user, {
          displayName: data?.name,
          photoURL: data?.photo,
        });

        // store users information into database
        const newUser = {
          name: data?.name,
          photo: data?.photo,
          email: data?.email,
          password: data?.password,
          role: "admin",
        };

        // store users information into database
        axiosPublic.post("/users", newUser).then((res) => {
          if (res.data.insertedId) {
            toast.success("User created successfully");
          }
        });

        logoutUser()
          .then(() => {
            navigate("/login");
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        console.log(error);
        toast.error("Registration failed");
      });
  };

  return (
    <Container>
      <div className="mb-12 rounded-xl flex flex-col justify-center h-[85vh]">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center my-10">
          Please Register
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 md:px-0 w-full md:w-3/4 lg:w-2/6 mx-auto"
        >
          <div className="flex flex-col">
            <span className="font-medium">Name</span>
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
            />
            {errors.name && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col my-3">
            <span className=" font-medium">Photo URL</span>
            <input
              {...register("photo", { required: true })}
              type="text"
              name="photo"
              placeholder="Enter your photo URL"
              className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
            />
            {errors.photo && (
              <span className="text-center text-red-500 mt-2  font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className=" font-medium">Email</span>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-xl font-medium outline-none border-2 border-primary"
            />
            {errors.email && (
              <span className="text-center text-red-500 mt-2  font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col my-3">
            <span className=" font-medium">Password</span>
            <input
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 6,
                pattern:
                  /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}/,
              })}
              type="password"
              name="password"
              placeholder="Enter your password"
              className="px-4 py-3 rounded-xl  font-medium outline-none border-2 border-primary"
            />
            {errors.password?.type === "required" && (
              <span className="text-center text-red-500 mt-2 font-medium">
                This fiend is required
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-center text-red-500 mt-2 font-medium">
                Password length must be 6 or more
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-center text-red-500 mt-2 font-medium">
                Password length should not be more then 20
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-center text-red-500 mt-2 font-medium">
                Password should contains one upper case, one lower case , one
                number, and one special character
              </span>
            )}
          </div>
          <div className="form-control mt-6 ">
            <button className="bg-primary text-white w-full font-semibold py-3 rounded-xl border-2 border-primary">
              Register
            </button>
          </div>
        </form>
        <p className="text-center my-5 text-gray-500 font-medium">
          Already have an account?{" "}
          <Link className="font-bold text-primary" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </Container>
  );
}
