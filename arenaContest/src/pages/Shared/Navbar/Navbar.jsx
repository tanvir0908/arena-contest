import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { HiMenu } from "react-icons/hi";
import logo from "../../../assets/logo.png";
import Button from "../../../components/Button/Button";
import Container from "../../../components/Container/Container";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(false);

  const user = null;
  // const user = {
  //   name: "Tanvir Hasan Emon",
  //   email: "tanvir@gmail.com",
  //   photo:
  //     "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg",
  // };

  const handleOpen = () => {
    setIsOpen(!isOpen);
    setProfile(false);
  };

  return (
    <Container>
      <div className="my-5 items-center flex justify-between">
        {/* website logo */}
        <div>
          <Link to={"/"} className="flex items-center gap-2">
            <img className="w-10 md:w-12" src={logo} alt="" />
            <p className="text-2xl md:text-3xl font-bold">ArenaContext</p>
          </Link>
        </div>
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
            to={"/allFoodItems"}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-primary"
                : "mx-5 xl:mx-16 hover:text-primary transition"
            }
          >
            All Food Items
          </NavLink>
          <NavLink
            to={"/blog"}
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-primary"
                : "hover:text-primary transition"
            }
          >
            Blog
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
                src={user.photo}
                alt=""
              />
              {profile && (
                <div className="absolute mt-1 md:mt-3 top-12 right-10 md:right-14 lg:right-0  w-[15rem] shadow-md rounded-xl  z-10 bg-secondary">
                  <div className="flex flex-col">
                    <p className="rounded-t-xl text-center px-6 py-4 font-medium">
                      {user?.name}
                    </p>
                    <NavLink
                      onClick={() => setProfile(false)}
                      to={"/addNewFood"}
                      className={"px-6 text-center py-4 font-medium"}
                    >
                      Dashboard
                    </NavLink>
                    <button className="bg-primary text-white font-semibold px-6 py-4 rounded-b-xl">
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
              <NavLink to={"/allFoodItems"} className={"px-6 py-4 font-medium"}>
                All Food Items
              </NavLink>
              <NavLink to={"/blog"} className={"px-6 py-4 font-medium"}>
                Blog
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}
