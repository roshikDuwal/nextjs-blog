import { axiosInstance } from "@/axios/Axios";
import HomeUI from "@/components/ui/home/HomeUI";
import { Base_Url } from "@/constants/Base_Url";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import HTMLReactParser from "html-react-parser";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function useGetSingleBlogData(slug) {
  try {
    const res = await axiosInstance.get(`/api/blog/${slug}`);
    return res.data;
  } catch (error) {
    throw new Error(error);
  }
}

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

export default async function ({ params: { slug } }) {
  const getSingleBlogData = await useGetSingleBlogData(slug);
  const getAllData = await useGetAllData();

  const getLatestData = getAllData?.data?.latestBlog;
  const getTrendyData = getAllData?.data?.trendy;
  const getPopularData = getAllData?.data?.popular;

  const { blog } = getSingleBlogData;

  const options = { year: "numeric", month: "long", day: "numeric" };

  const date = new Date(blog[0].created_at);

  return (
    <>
      {blog && getLatestData && getPopularData && getTrendyData && (
        <section className="bg-bgcolor xl:px-36 lg:px-4 md:px-4 sm:px-4  shadow-inner ">
          <div className="container  mx-auto flex flex-wrap">
            <Breadcrumb my={5} fontSize={"0.9rem"} color={"gray"}>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink>Blog</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink>
                  {blog[0].title.charAt(0).toUpperCase() +
                    blog[0].title.slice(1)}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <div className="flex flex-wrap w-full ">
              <div className="lg:w-2/3 md:w-1/2 ">
                <Flex direction={"column"}>
                  <Text
                    mt={5}
                    textTransform={"uppercase"}
                    className=" text-primary"
                    fontSize={"1.5rem"}
                  >
                    Entertainment
                  </Text>

                  <Heading my={5}>{blog[0].title.toUpperCase()}</Heading>

                  <Image
                    className=" object-cover object-center rounded-lg md:mt-0 mt-12"
                    style={{
                      width: "90%",
                    }}
                    src={`${Base_Url}/uploads/blog/${blog[0].image}`}
                    alt="step"
                    width={1000}
                    height={500}
                    priority
                  />

                  <Flex justifyContent={"space-between"} my={5}>
                    <Flex gap={2}>
                      <Text fontWeight={"700"}>Source:</Text>
                      <Flex direction={"column"}>
                        <Text>{blog[0].source.toUpperCase()}</Text>
                        <Text>
                          {date.toLocaleDateString(undefined, options)}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex gap={2} alignItems={"center"}>
                      {/* <Link
                        className=" border-2 border-gray px-3 py-3 m-1    shadow-2xl"
                        title="scroll left "
                        href={"/"}
                      >
                        Link
                      </Link> */}
                    </Flex>
                  </Flex>

                  <Box my={5} className=" text-gray capitalize" >
                    {HTMLReactParser(blog[0].description)}
                  </Box>
                </Flex>
              </div>

              <HomeUI
                getLatestData={getLatestData}
                getPopularData={getPopularData}
                getTrendyData={getTrendyData}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
