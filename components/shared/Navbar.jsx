"use client";
import { axiosInstance } from "@/axios/Axios";
import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  background,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

const Navbar = () => {
  const pathname = usePathname();
  const [getCategory, setCategory] = useState([]);

  const getCategoryMenu = async () => {
    try {
      const res = await axiosInstance.get("/api/categories-menu");
      setCategory(res.data.categories);
    } catch (error) {}
  };

  useEffect(() => {
    getCategoryMenu();
  }, []);

  const menuStyle = {
    background: "transparent",
  };

  return (
    <>
      <header className="text-gray-600 body-font lg:px-28 md:px-0" style={{backgroundColor:"ffffff"}}>
        <div className="container mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
          <Link
            href={"/"}
            className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
          >
            <Image
              src={"/logo.png"}
              alt="logo"
              width={1000}
              height={1000}
              className="w-16"
            />
            <span className="ml-3 text-xl font-bold">SAMSARA BLOG</span>
          </Link>
          <div className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <div className=" flex items-center justify-center border-2  h-16 w-auto rounded-xl  px-6  ">
              {" "}
              Adveriste Here
            </div>
          </div>
        </div>

        <div className="container mx-auto flex flex-wrap justify-around p-2 flex-col md:flex-row items-center">
          <nav className="flex title-font font-medium items-center mb-4 md:mb-0">
            <Link
              href={"/"}
              className={`${
                pathname === "/"
                  ? "mr-5    text-red"
                  : "mr-5 hover:text-gray-900"
              } transition-all duration-300 hover:text-red`}
            >
              Home
            </Link>

            <Menu px={2}>
              <MenuButton
                style={menuStyle}
                as={Button}
                rightIcon={<IoIosArrowDown />}
                className="mr-5 title-font font-medium  transition-all duration-300 hover:text-red"
              >
                <p className="font-medium"> Category</p>
              </MenuButton>

              <MenuList>
                {getCategory &&
                  getCategory.map((elem, index) => (
                    <Link key={index} href={`/category/${elem.title}`}>
                      <MenuItem className=" title-font font-medium transition-all duration-300 hover:text-red hover:bg-white">
                        {" "}
                        {elem.title}
                      </MenuItem>
                    </Link>
                  ))}
              </MenuList>
            </Menu>

            <Link
              href={"/about"}
              className={`${
                pathname === "/about"
                  ? "mr-5   text-red"
                  : "mr-5 hover:text-gray-900"
              } transition-all duration-300 hover:text-red`}
            >
              About Us
            </Link>
            <Link
              href={"/contact"}
              className={`${
                pathname === "/contact"
                  ? "mr-5   text-red"
                  : "mr-5 hover:text-gray-900"
              } transition-all duration-300 hover:text-red`}
            >
              Contact Us
            </Link>
          </nav>

          <div className="flex ml-2 items-center rounded-full bg-gray-100 p-2 md:px-5">
            <IoSearchSharp className="h-6 text-gray-600" />
            <input
              className="hidden md:inline-flex ml-2 items-center bg-transparent outline-none placeholder-gray-500"
              type="text"
              placeholder="Search Blog"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
