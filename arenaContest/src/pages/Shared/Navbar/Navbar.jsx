import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";
import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Logo from "../../../components/Logo/Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  // const [userInformation, setUserInformation] = useState(null);
  const { user, logoutUser } = useContext(AuthContext);
  // const axiosPublic = useAxiosPublic();

  // useEffect(() => {
  //   axiosPublic(`/users/${user?.email}`).then((res) => {
  //     setUserInformation(res.data);
  //   });
  // }, [axiosPublic, user]);

  // // console.log(userInformation);
  // // console.log(user);
  const handleLogout = () => {
    setProfile(false);
    logoutUser()
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setProfile(false);
  };

  return (
    <Container>
      <div className="my-5 items-center flex justify-between">
        {/* website logo */}
        <Logo />
        {/* nav links */}
        <div className="hidden lg:block font-semibold">
          <NavLink
            to={"/"}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-primary"
                : "hover:text-primary transition"
            }
          >
            Home
          </NavLink>
          <NavLink
            to={"/allContests"}
            className={({ isActive }) =>
              isActive
                ? "mx-5 xl:mx-16 border-b-2 border-primary"
                : "mx-5 xl:mx-16 hover:text-primary transition"
            }
          >
            All Contests
          </NavLink>
        </div>
        {/* navbar end side */}
        <div className="flex gap-2 md:gap-5 items-center relative">
          {/* users profile menu */}
          {user ? (
            <>
              <img
                onClick={() => {
                  setProfile(!profile);
                  setIsOpen(false);
                }}
                className="w-10 md:w-12 h-10 md:h-12 cursor-pointer border-2 border-primary rounded-full object-cover"
                // src={userInformation?.photo}
                src={user?.photoURL}
                alt=""
              />
              {profile && (
                <div className="absolute mt-1 md:mt-3 top-12 right-10 md:right-14 lg:right-0  w-[15rem] shadow-md rounded-xl  z-10 bg-secondary">
                  <div className="flex flex-col">
                    <p className="rounded-t-xl text-center px-6 py-4 font-medium">
                      {/* {userInformation?.name} */}
                      {user?.displayName}
                    </p>
                    <Link
                      onClick={() => setProfile(false)}
                      to={"/dashboard"}
                      className={"px-6 text-center py-4 font-medium"}
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="bg-primary text-white font-semibold px-6 py-4 rounded-b-xl"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <Link to={"/login"}>
              <Button buttonText={"Login"} />
            </Link>
          )}
          <div className="lg:hidden" onClick={handleOpen}>
            {isOpen ? (
              <IoClose className="text-primary text-3xl" />
            ) : (
              <HiMenu className="text-primary text-3xl" />
            )}
          </div>
        </div>
        {/* small device menu */}
        {isOpen && (
          <div className="absolute mt-6 md:mt-8 top-12 border-2 border-primary right-7 md:right-10  w-[50%] md:w-[35%] shadow-md rounded-xl  z-10 bg-secondary">
            <div className="flex flex-col">
              <NavLink
                to={"/"}
                className={"rounded-t-xl px-6 py-4 font-medium"}
              >
                Home
              </NavLink>
              <NavLink to={"/allContests"} className={"px-6 py-4 font-medium"}>
                All Contests
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
