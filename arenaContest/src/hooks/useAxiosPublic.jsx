import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://b8a12-server-side-tanvir0908.vercel.app",
});
export default function useAxiosPublic() {
  return axiosPublic;
}
