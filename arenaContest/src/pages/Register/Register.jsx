import { useForm } from "react-hook-form";
import Container from "../../components/Container/Container";
import { Link } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <div className="mb-12 rounded-xl flex flex-col justify-center h-[85vh]">
        <h2 className="text-4xl lg:text-5xl font-bold text-primary text-center my-10">
          Please Register
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="px-5 md:px-0 w-full md:w-3/4 lg:w-2/6 mx-auto"
        >
          <div className="flex flex-col">
            <span className="text-lg font-medium">Name</span>
            <input
              {...register("name", { required: true })}
              type="text"
              name="name"
              placeholder="Enter your name"
              className="px-4 py-3 rounded-xl text-lg font-medium outline-none border-2 border-primary"
            />
            {errors.name && (
              <span className="text-center text-red-500 mt-2 text-lg font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col my-3">
            <span className="text-lg font-medium">Image URL</span>
            <input
              {...register("image", { required: true })}
              type="text"
              name="image"
              placeholder="Enter your image URL"
              className="px-4 py-3 rounded-xl text-lg font-medium outline-none border-2 border-primary"
            />
            {errors.image && (
              <span className="text-center text-red-500 mt-2 text-lg font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-medium">Email</span>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-xl text-lg font-medium outline-none border-2 border-primary"
            />
            {errors.email && (
              <span className="text-center text-red-500 mt-2 text-lg font-medium">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col my-3">
            <span className="text-lg font-medium">Password</span>
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
              className="px-4 py-3 rounded-xl text-lg font-medium outline-none border-2 border-primary"
            />
            {errors.password?.type === "required" && (
              <span className="text-center text-red-500 mt-2 text-lg font-medium">
                This fiend is required
              </span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-center text-red-500 mt-2 text-lg font-medium">
                Password length must be 6 or more
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-center text-red-500 mt-2 text-lg font-medium">
                Password length should not be more then 20
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-center text-red-500 mt-2 text-lg font-medium">
                Password should contains one upper case, one lower case , one
                number, and one special character
              </span>
            )}
          </div>
          <div className="form-control mt-6 ">
            <button className="bg-primary text-white w-full text-lg font-semibold py-3 rounded-xl border-2 border-primary">
              Register
            </button>
          </div>
        </form>
        <p className="text-center my-5 text-[#706F6F] font-medium">
          Already have an account?{" "}
          <Link className="font-bold text-primary" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </Container>
  );
}
