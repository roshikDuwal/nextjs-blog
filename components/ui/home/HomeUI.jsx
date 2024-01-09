"use client";
import BlogElement from "@/components/shared/BlogElement";
import { Base_Url } from "@/constants/Base_Url";
import { Button, Flex } from "@chakra-ui/react";

import React, { useState } from "react";

const HomeUI = ({ getTrendyData, getLatestData, getPopularData }) => {
  const [trendy, setTrendy] = useState(true);
  const [latest, setLatest] = useState(false);
  const [popular, setPopular] = useState(false);

  return (
    <>
      <div className="lg:w-1/3 md:w-1/2 sm:w-full pl-2 ">
        <Flex
          gap={5}
          mt={{ base: "12px", md: "0px" }}
          alignItems={"center"}
          justifyContent={"center"}
          width={"100%"}
          height={"10px"}
        >
          <button
            onClick={() => {
              setTrendy(true);
              setLatest(false);
              setPopular(false);
            }}
            className={`px-6 py-2 shadow-xl uppercase  ${
              trendy ? "bg-blue text-white" : "bg-white text-darkblue"
            }`}
            style={{ fontSize: "12px" }}
          >
            Trendy
          </button>

          <button
            onClick={() => {
              setTrendy(false);
              setLatest(true);
              setPopular(false);
            }}
            className={`px-6 py-2 shadow-xl uppercase  ${
              latest ? "bg-blue text-white" : "bg-white text-darkblue"
            }`}
            style={{ fontSize: "12px" }}
          >
            Latest
          </button>
          <button
            onClick={() => {
              setTrendy(false);
              setLatest(false);
              setPopular(true);
            }}
            className={`px-6 py-2 shadow-xl uppercase ${
              popular ? "bg-blue text-white" : "bg-white text-darkblue"
            }`}
            style={{ fontSize: "12px" }}
          >
            Popular
          </button>
        </Flex>

        {trendy && (
          <div>
            <div className="p-2  w-full  flex flex-col lg:gap-2 md:gap-1">
              {getTrendyData &&
                getTrendyData.map((elem) => (
                  <BlogElement key={elem.id} elem={elem} />
                ))}
            </div>
          </div>
        )}

        {latest && (
          <div>
            <div className="p-2  w-full flex flex-col gap-2">
              {getLatestData &&
                getLatestData.map((elem) => (
                  <BlogElement key={elem.id} elem={elem} />
                ))}
            </div>
          </div>
        )}

        {popular && (
          <div>
            <div className="p-2  w-full">
              {getPopularData &&
                getPopularData.map((elem) => (
                  <BlogElement key={elem.id} elem={elem} />
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomeUI;
