import "./ContestAdvertisement.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ContestAdvertisement() {
  const reviews = [
    {
      id: 1,
      name: "Tanvir Hasan",
      contestName: "Coding Challenge",
      participants: 100,
      contestPicture:
        "https://bs-uploads.toptal.io/blackfish-uploads/components/seo/content/og_image_file/og_image/1264473/0211_JavaScript-Coding-Challenge_Luke-Social-a70614b9438520ac86c4a5eab56b6ece.png",
      image:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=826&t=st=1699432733~exp=1699433333~hmac=21c468a383663ecb8fa41aa1197d4d0b921652f3a1fecba615ad78d80b76fb9a",
    },
    {
      id: 2,
      name: "Emon Hasan",
      contestName: "Composition Challenge",
      participants: 150,
      contestPicture:
        "https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/bmd-3396.png",
      image:
        "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=826&t=st=1699434830~exp=1699435430~hmac=027447578de0f6362632b256e5db63b1de96d1e57399bb69b8fd560fd618e23b",
    },
    {
      id: 3,
      name: "Robin Hasan",
      participants: 200,
      contestName: "Gaming Competition",
      contestPicture:
        "https://www.gamespace.com/wp-content/uploads/2021/04/Tournaments-780x420.jpg",
      image:
        "https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436180.jpg?w=826&t=st=1699434892~exp=1699435492~hmac=03ca5e8a21c92f9afd9b799faceba6c60091e57ea63a4dabd18ce0a401ff3272",
    },
  ];

  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-20">
      <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center mb-5 mt-10">
        Contests and Winners
      </h2>
      <div className="">
        <Slider {...settings}>
          {reviews.map((partner) => (
            <div
              key={partner.id}
              className="bg-white border-2 border-primary cursor-pointer transition duration-1000 rounded-xl"
            >
              <div className="">
                <img
                  src={partner.contestPicture}
                  className="rounded-xl h-[15rem] w-full object-cover"
                  alt=""
                />
                <h2 className="text-2xl my-5 px-5 font-semibold ">
                  Contest Name:{" "}
                  <span className="text-primary">{partner.contestName}</span>
                </h2>
              </div>
              <div className="flex border-t-2 border-primary rounded-b-xl justify-center items-center gap-5 p-4">
                <div className="">
                  <img className="w-20 rounded-xl" src={partner.image} alt="" />
                </div>
                <div className="flex-1 space-y-2">
                  <h2 className="text-2xl font-semibold">
                    Winner Name:{" "}
                    <span className="text-primary">{partner.name}</span>
                  </h2>
                  <p className="font-lg text-gray-500 font-medium">
                    Total Participants: {partner.participants}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
