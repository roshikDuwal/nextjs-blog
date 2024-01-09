"use client";
import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Link from "next/link";

export default function NewSlider({ sliderData }) {
  return (
    <>
      <div className="lg:w-2/3 md:w-1/2 sm:w-full sm:mb-2 md:mt-0 mt-12 relative ">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className=" w-full"
        >
          {sliderData && sliderData.map((elem, index) => (
            <SwiperSlide
              style={{
                width: "100%",
              }}
              key={index}
            >
              <Link
                // href={`/blogs/${elem.id}`}
                href={`/blogs/`}
                style={{
                  width: "100%",
                }}
              >
                <Image
                  src={elem.img}
                  alt="step"
                  width={1000}
                  height={500}
                  priority
                  className="w-100%"
                />

                <Flex
                  color={"black"}
                  direction={"column"}
                  position={"absolute"}
                  bottom={"26%"}
                  left={"7%"}
                >
                  <Flex gap={"5"} textTransform={"uppercase"}>
                    {" "}
                    <Text fontSize={"18px"} fontWeight={"600"}>
                      {" "}
                     {elem.category}
                    </Text>{" "}
                    / <Text fontSize={"14px"}>{elem.category}</Text>
                  </Flex>
                  <Heading
                    fontSize={"36px"}
                    lineHeight={"46px"}
                    fontWeight={"700"}
                  >
                    {elem.title}
                  </Heading>
                  <Text fontSize={"17px"}>{elem.description}</Text>
                </Flex>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
