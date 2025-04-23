"use client";

import { Menu, Plane } from "lucide-react"; // Using Plane for logo
import Link from "next/link";
import React from "react";

import { Button } from "@/components/ui/button"; // Need Button for Sheet trigger
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const pages = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* Logo/Brand */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Plane className="h-6 w-6" />
          <span className="font-bold sm:inline-block">Gilles Heinesch</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden flex-1 md:flex md:justify-start">
          <NavigationMenu>
            <NavigationMenuList>
              {pages.map((page) => (
                <NavigationMenuItem key={page.name}>
                  <Link href={page.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {page.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader className="mb-4">
                <SheetTitle>
                  <Link href="/">
                    <span className="font-bold">Gilles Heinesch</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-3">
                {pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-foreground hover:bg-muted"
                  >
                    {page.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Placeholder for potential right-side items like theme toggle */}
        {/* <div className="flex flex-1 items-center justify-end space-x-4"></div> */}
      </div>
    </header>
  );
}

export default Header;
