"use client";
import Link from "next/link";
import { Divide, Menu, Search, X } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { SignedOut } from "@clerk/nextjs";

import { NavUser } from "./NavUser";
import SignInButton from "./SignInButton";
import SignupButton from "./SignupButton";
import GetStartedButton from "./GetStartedButton";
import { ember, emberLight } from "../lib/fonts";
import { Product } from "@/types/product";
const menuItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About Us", href: "/" },
];

export const Header = () => {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Product[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  const isCompact = isScrolled || isSearch;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  React.useEffect(() => {
    if (isSearch && searchInputRef) {
      searchInputRef.current?.focus();
    }
  }, [isSearch]);
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target as Node) &&
        isSearch &&
        searchResults.length === 0
      ) {
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSearch, searchResults]);
  const handleSearchClick = () => {
    setIsSearch(true);
  };
  const handleSearchClose = () => {
    setIsSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  };
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("searching for: " + searchQuery.trim());
    }
  };
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearch) {
        handleSearchClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isSearch]);
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const results = await response.json();
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };
  React.useEffect(() => {
    if (!isSearch) return;

    const timeoutId = setTimeout(() => {
      performSearch(searchQuery);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchQuery, isSearch]);
  return (
    <header>
      <nav
        data-state={menuState && "active"}
        className="fixed z-20 w-full px-2 "
      >
        <div
          className={cn(
            "mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12 transform ",
            isCompact &&
              "bg-background/50 max-w-4xl rounded-2xl border backdrop-blur-lg lg:px-5 rounded-md"
          )}
        >
          {isSearch ? (
            <div ref={searchContainerRef} className="relative">
              <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex items-center flex-1 w-full"
                >
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-12 pr-4  bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </form>
                <button
                  onClick={handleSearchClose}
                  aria-label="Close"
                  className="cursor-pointer transform hidden md:inline"
                >
                  <X className="size-5" />
                </button>
              </div>

              {(searchQuery.trim() || isLoading) &&
                searchResults.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-0 bg-background border border-border rounded-b-sm shadow-lg z-30 max-h-96 overflow-y-auto">
                    <div className="p-2">
                      {searchResults.map((result) => (
                        <Link
                          key={result.id}
                          href={`/product/${result.id}`}
                          onClick={handleSearchClose}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent/50 transition-colors duration-150 cursor-pointer"
                        >
                          <div className={` ${ember}  text-foregound truncate`}>
                            {result.brand} {result.name}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          ) : (
            <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
              <div className="flex w-full justify-between lg:w-auto">
                <Link
                  href="/"
                  aria-label="home"
                  className="flex items-center space-x-2"
                >
                  <img src="/logo.png" className="size-10 " />{" "}
                  <span
                    className={cn(
                      " ml-2 text-lg transition-all duration-300",
                      isCompact && "hidden"
                    )}
                  >
                    Handla
                  </span>
                </Link>

                <button
                  onClick={() => setMenuState(!menuState)}
                  aria-label={menuState == true ? "Close Menu" : "Open Menu"}
                  className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden"
                >
                  <Menu className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                  <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                </button>
              </div>

              <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                <ul className="flex gap-8 text-sm">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="text-muted-foreground hover:text-accent-foreground block duration-150"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                <div className="lg:hidden">
                  <ul className="space-y-6 text-base">
                    <div className="relative flex-1 w-full">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground size-5" />
                      <input
                        onClick={handleSearchClick}
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="w-full pl-12 pr-4  bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    {menuItems.map((item, index) => (
                      <li key={index}>
                        <Link
                          href={item.href}
                          className="text-muted-foreground hover:text-accent-foreground block duration-150"
                        >
                          <span>{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {!isSearch ? (
                  <button
                    onClick={handleSearchClick}
                    aria-label="Search"
                    className="cursor-pointer transform hidden md:inline"
                  >
                    <Search className="size-5" />
                  </button>
                ) : (
                  <button
                    onClick={handleSearchClose}
                    aria-label="Close"
                    className="cursor-pointer transform "
                  >
                    <X className="size-5" />
                  </button>
                )}
                <NavUser isScrolled={isCompact} />
                  <SignedOut>
                    <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                      <SignInButton isCompact={isCompact} />
                      <SignupButton isCompact={isCompact} />
                      <GetStartedButton isCompact={isCompact} />
                    </div>
                  </SignedOut>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};
