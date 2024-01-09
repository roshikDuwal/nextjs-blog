import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Text,
} from "@chakra-ui/react";
import HomeUI from "@/components/ui/home/HomeUI";
import Image from "next/image";
import { axiosInstance } from "@/axios/Axios";
import { Base_Url } from "@/constants/Base_Url";
import Link from "next/link";
import HTMLReactParser from "html-react-parser";

async function BlogPage(slug) {
  try {
    const res = await axiosInstance.get(`/api/${slug}`);
    return res.data.categories;
  } catch (error) {
    throw new Error(error);
  }
}

async function GetAllData() {
  try {
    const res = await axiosInstance.get("/api/home", {
      next: { revalidate: 360 },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
}

export default async function page({ params: { slug } }) {
  const getCategoriesData = await BlogPage(slug);
  const getAllData = await GetAllData();

  const getLatestData = getAllData?.data?.latestBlog;
  const getTrendyData = getAllData?.data?.trendy;
  const getPopularData = getAllData?.data?.popular;

  return (
    <>
      {getCategoriesData && (
        <section className="bg-bgcolor xl:px-36 lg:px-4 md:px-4 sm:px-4  shadow-inner">
          <div className="container  mx-auto flex flex-wrap">
            <Breadcrumb ml={4} my={5} fontSize={"0.9rem"} color={"gray"}>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">Category</BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem isCurrentPage>
                <BreadcrumbLink href="#">
                  {getCategoriesData[0].title}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>

            <div className="flex flex-wrap w-full  ">
              <div className="lg:w-2/3 md:w-1/2 ">
                <Flex direction={"column"}>
                  <Text pl={5} mt={5} fontSize={"1.5rem"}>
                    {`Category:${getCategoriesData[0].title}`}
                  </Text>

                  <Flex direction={"column"}>
                    {getCategoriesData[0].blogs.map((elem, index) => (
                      <section
                        key={elem.slug}
                        className="text-gray-600 body-font overflow-hidden"
                      >
                        <div className="container mx-auto">
                          <div className="ml-8 mt-16 flex flex-wrap">
                            <Image
                              alt="ecommerce"
                              className="lg:w-1/2  h-64 w-full object-cover object-center rounded"
                              src={`${Base_Url}/uploads/blog/${elem.image}`}
                              width={400}
                              height={400}
                            />

                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                              <Flex gap={2}>
                                <h2 className="text-blue lg:text-sm md:text-xs tracking-wider">
                                  {getCategoriesData[0].title.toUpperCase()}
                                </h2>
                                <h2 className="text-sm title-font  tracking-widest">
                                  /
                                </h2>

                                <h2 className="font-thin text-gray-900 ml-4 lg:text-sm md:text-xs tracking-wide">
                                  {
                                    new Date(elem.created_at)
                                      .toISOString()
                                      .split("T")[0]
                                  }
                                </h2>
                              </Flex>

                              <h1 className="text-gray-900 text-3xl title-font font-bold lg:text-xl md:text-md tracking-wide">
                                {elem.title.charAt(0).toUpperCase() +
                                  elem.title.slice(1)}
                              </h1>

                              <div
                                className="leading-relaxed"
                                style={{ transition: "capitalize" }}
                              >
                                {HTMLReactParser(elem.description.slice(0, 99))}
                              </div>

                              <div className="mt-3">
                                <Link
                                  href={`/blogs/${elem.slug}`}
                                  className=" border-black border-2 text-black py-2 px-6 focus:outline-none transition-all duration-300 hover:bg-primary hover:text-blue hover:transition-all duration-200 hover:border-blue"
                                >
                                  Read More
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </section>
                    ))}
                  </Flex>
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
