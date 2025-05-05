import React from "react";
import { Instagram, Facebook, Linkedin, Mails } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" mt-7 bg-green bg-primary text-secondary">
      <div className=" flex items-center justify-between p-4">
        <div className="w-1/2 flex items-center justify-center flex-col gap-4">
          <h3 className="text-lg text-trirdary font-semibold">Follow Me :</h3>
          <div className="flex md:gap-5 gap-1 items-center w-full text-green justify-center">
            <Link
              href="https://www.instagram.com/hndksjy/"
              target="_blank"
              className="flex flex-col justify-center items-center gap-2"
            >
              <div className="w-[35px] h-[35px] bg-trirdary flex items-center justify-center rounded-md hover:bg-green hover:text-primary hover:scale-125 transition-all duration-300 ">
                <Instagram size={25} className="hover:scale-120" />
              </div>
              <p className="text-trirdary text-xs md:text-lg">Instagram</p>
            </Link>
            <Link
              href="https://www.facebook.com/hndksnjy"
              target="_blank"
              className="flex flex-col justify-center items-center gap-2"
            >
              <div className="w-[35px] h-[35px] bg-trirdary flex items-center justify-center rounded-md hover:bg-green hover:text-primary hover:scale-125 transition-all duration-300 ">
                <Facebook size={25} className="hover:scale-120" />
              </div>
              <p className="text-trirdary text-xs md:text-lg">Facebook</p>
            </Link>
            <Link
              href="https://www.linkedin.com/in/handika-sanjaya-354575231/"
              target="_blank"
              className="flex flex-col justify-center items-center gap-2"
            >
              <div className="w-[35px] h-[35px] bg-trirdary flex items-center justify-center rounded-md hover:bg-green hover:text-primary hover:scale-125 transition-all duration-300 ">
                <Linkedin size={25} className="hover:scale-120" />
              </div>
              <p className="text-trirdary text-xs md:text-lg">LinkedIn</p>
            </Link>
          </div>
        </div>
        <div className="w-[100px] h-[2px] rotate-90 bg-trirdary"></div>
        <div className="w-1/2 flex items-center justify-center flex-col gap-4">
          <h3 className="text-lg text-trirdary font-semibold">Kontak Saya :</h3>
          <div className="flex md:gap-10 gap-3 items-center w-full text-green justify-center">
            <Link
              href={"mailto:handikasanjaya61@gmail.com"}
              target="_blank"
              className="flex flex-col justify-center items-center gap-2"
            >
              <div className="w-[35px] h-[35px] bg-trirdary flex items-center justify-center rounded-md hover:bg-green hover:text-primary hover:scale-125 transition-all duration-300 ">
                <Mails size={25} className="hover:scale-120" />
              </div>
              <p className="text-trirdary text-xs md:text-lg">Email</p>
            </Link>
            <Link
              href={"https://wa.me/+6281284978523"}
              target="_blank"
              className="flex flex-col justify-center items-center gap-2"
            >
              <div className="w-[35px] h-[35px] bg-trirdary flex items-center justify-center rounded-md hover:bg-green hover:text-primary hover:scale-125 transition-all duration-300 ">
                <FaWhatsapp size={25} className="hover:scale-120" />
              </div>
              <p className="text-trirdary text-xs md:text-lg">WhatsApp</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="w-[80%] h-[2px] bg-trirdary"></div>
      </div>
      <div className="flex items-center justify-center p-4 text-trirdary">
        <p className="text-base">
          &copy; {new Date().getFullYear()} Handika Sanjaya. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
