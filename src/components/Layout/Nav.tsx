"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../UI/button";
import { AlignRight } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../UI/sheet";

const Nav = () => {
  const [showNav, setShowNav] = useState(true);
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollY && currentScrollY > 50) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full transition-transform duration-500 ${showNav ? "translate-y-0" : "-translate-y-full"
        } bg-black border-b-2 border-Primary2 z-50`}
    >
      <div className="container px-8 sm:h-[100px] h-[80px] text-white mx-auto flex items-center justify-between border-x-2 border-Primary2">
        <span className="text-4xl lg:text-5xl">KO</span>
        <nav className="h-full hidden sm:flex">
          <ul className="flex items-end h-full">
            <li
              className="hover:bg-Primary1 cursor-pointer px-8 py-6 border-Primary2 border-t-2 border-x-2 rounded-tl-xl"
              onClick={() => scrollToSection("Home")}
            >
              Home
            </li>
            <li
              className="hover:bg-Primary1 cursor-pointer px-8 py-6 border-Primary2 border-t-2 border-r-2"
              onClick={() => scrollToSection("About_Me")}
            >
              About Me
            </li>
            <li
              className="hover:bg-Primary1 cursor-pointer px-8 py-6 border-Primary2 border-t-2 border-r-2"
              onClick={() => scrollToSection("Portfolio")}
            >
              Portfolio
            </li>
            <li
              className="hover:bg-Primary1 cursor-pointer px-8 py-6 border-Primary2 border-t-2 border-r-2 rounded-tr-xl"
              onClick={() => scrollToSection("Services")}
            >
              Services
            </li>
          </ul>
        </nav>
        <Button className="h-12 px-5 hidden sm:flex">Contact Me</Button>
        <div className="sm:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <AlignRight />
            </SheetTrigger>
            <SheetContent side="left" className="bg-bgPrimary border-r border-r-Primary2 flex flex-col justify-between">
              <SheetHeader>
                <SheetTitle className="text-white">My Portfolio</SheetTitle>
                <SheetDescription>
                  Make changes to your profile here. Click save when youre done.
                </SheetDescription>
                <div className="flex flex-col gap-4 py-4">
                  {['Home', 'About_Me', 'Services', 'Portfolio'].map(item => (
                    <span
                      key={item}
                      onClick={() => {
                        setOpen(false);
                        scrollToSection(item);
                      }}
                      className="text-start w-full"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </SheetHeader>
              <SheetFooter>
                <span className='font-thin text-Primary3 text-[0.7rem] text-center mt-3'>
                  © 2024 Damien Braun Photography. All rights reserved.
                </span>
                <Button type="submit">Descargar CV</Button>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Nav;
