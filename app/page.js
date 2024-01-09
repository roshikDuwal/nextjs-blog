import Slider from "@/components/shared/Slider";
import Image from "next/image";
import HomeUI from "@/components/ui/home/HomeUI";
import { axiosInstance } from "@/axios/Axios";
import { Flex, Heading, Text } from "@chakra-ui/react";
import NewSlider from "@/components/shared/NewSlider";

async function useGetAllData() {
  try {
    const res = await axiosInstance.get("/api/home", {
      next: { revalidate: 360 },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const getAllData = await useGetAllData();

  const getFeatureInfoData = getAllData?.data?.featured;

  const getLatestData = getAllData?.data?.latestBlog;
  const getTrendyData = getAllData?.data?.trendy;
  const getPopularData = getAllData?.data?.popular;

  const sliderData=[
    {
      id:1,
      img:"/logo.png",
      category:"Technology",
      date:"March 26,2020",
      title:"Hello How Are youu",
      description:"I am fine and how are you"
    },
    {
      id:2,
      img:"/logo.png",
      category:"Technology",
      date:"March 26,2020",
      title:"Hello How Are youu???",
      description:"I am fine and how are you.........."
    },
    {
      id:3,
      img:"/logo.png",
      category:"Technology",
      date:"March 26,2020",
      title:"Hello How Are youu???",
      description:"I am fine and how are you.........."
    }
  ]

  return (
    <>
      <section className="bg-bgcolor xl:px-36 lg:px-4 md:px-4 sm:px-4  shadow-inner ">
        <Slider type="latestnews" getLatestData={getLatestData} />

        <section className="text-gray-600 body-font">
          <div className=" mx-auto flex flex-wrap">
            <div className="flex flex-wrap w-full ">

              <NewSlider sliderData={sliderData}/>

              <HomeUI
                getLatestData={getLatestData}
                getPopularData={getPopularData}
                getTrendyData={getTrendyData}
              />

            </div>
          </div>
        </section>

        <Slider type="feature" getFeatureInfoData={getFeatureInfoData} />
      </section>
    </>
  );
}
