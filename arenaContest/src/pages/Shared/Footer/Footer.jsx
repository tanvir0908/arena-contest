import { BsFacebook } from "react-icons/bs";
import {
  AiFillTwitterCircle,
  AiFillInstagram,
  AiOutlineGoogle,
} from "react-icons/ai";
import Logo from "../../../components/Logo/Logo";

export default function Footer() {
  const handleMessage = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-secondary rounded-t-xl">
      <div className="flex flex-col lg:flex-row mx-10 text-center lg:text-left lg:mx-32 py-20 justify-center items-center gap-[10%]">
        <div className="flex flex-col justify-center gap-5 h-full flex-1">
          <div>
            <div className="text-primary flex items-center gap-2">
              <Logo />
            </div>
            <p className="my-8 text-lg font-medium leading-8 w-full lg:w-3/4">
              Welcome to ArenaContext, the ultimate platform where innovation
              meets recognition! ArenaContext is a dynamic and user-friendly
              Project Contest Creation Platform designed to foster creativity,
              engage communities, and celebrate talent across various domains.
            </p>
          </div>
          <div className="pb-10 space-y-3 text-lg font-medium">
            <h2 className="text-2xl font-semibold text-primary">Address</h2>
            <p>Level-5, 32, Multiplan Center, New Elephant Rd, Dhaka.</p>
            <p>Support: web@h4food.com</p>
            <p>Helpline: 01322901139</p>
            <p>(Available : Sat - Thu, 10:00 AM to 7:00 PM)</p>
          </div>
          <div className="flex items-center mx-auto lg:mx-0 gap-3 xl:gap-5 justify-center md:justify-start">
            <AiOutlineGoogle
              className=" text-primary bg-white p-2 rounded-full"
              size={40}
            />
            <BsFacebook
              className="text-primary bg-white p-2 rounded-full"
              size={38}
            />
            <AiFillInstagram
              size={40}
              className="text-primary bg-white p-2 rounded-full"
            />

            <AiFillTwitterCircle
              size={40}
              className="text-primary bg-white p-2 rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 mt-20 lg:mt-0 w-full md:w-3/4">
          <h2 className="text-2xl font-semibold pb-5 lg:pb-3 text-primary">
            Contact
          </h2>
          <form onSubmit={handleMessage} className="w-full lg:w-2/3">
            <div className="flex flex-col">
              <span className="text-lg font-medium">Name</span>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="px-4 py-3 rounded-xl text-lg font-medium"
                required
              />
            </div>
            <div className="flex flex-col my-3">
              <span className="text-lg font-medium">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-xl text-lg font-medium"
                required
              />
            </div>
            <div className="flex flex-col my-3">
              <span className="text-lg font-medium">Message</span>
              <textarea
                required
                className="px-4 py-3 rounded-xl text-lg font-medium"
                placeholder="Enter your message"
                name="message"
                id=""
                cols="30"
                rows="6"
              ></textarea>
            </div>
            <div className="form-control mt-6 ">
              <button className="bg-primary text-white w-full text-lg font-semibold py-3 rounded-xl">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center font-semibold text-white bg-[#151515] py-3">
        <p>© h4Plus Software Ltd. 2023</p>
      </div>
    </div>
  );
}
