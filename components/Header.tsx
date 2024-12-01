"use client";

import {
  ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import Form from "next/form";
import { Button } from "./ui/button";
import { PackageIcon, TrolleyIcon } from "@sanity/icons";
const Header = () => {
  const { user } = useUser();

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (error) {
      console.log("Error:", JSON.stringify(error, null, 2));
    }
  };
  return (
    <header className="flex flex-wrap justify-between items-center px-4 py-2">
      {/* Top row */}
      <div className="flex w-full flex-wrap justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-blue-500 hover:opacity-50 cursor-pointer mx-auto sm:ms-0"
        >
          Shopr
        </Link>
        <Form
          action="/search"
          className="w-full sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0"
        >
          <input
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border w-full max-w-4xl"
            type="text"
            name="query"
            placeholder="Search for products"
          />
          {/* <button type="submit">Search</button> */}
        </Form>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0 flex-1 sm:flex-none">
          <Button asChild>
            {/* TODO: No of items in cart */}

            <Link href="/cart">
              {" "}
              <TrolleyIcon />
              Cart
            </Link>
          </Button>

          {/* User Area */}
          <ClerkLoaded>
            <>
              <SignedIn>
                <Button asChild>
                  <Link href="/orders" className="">
                    <PackageIcon className="w-6 h-6" />
                    <span>Orders</span>
                  </Link>
                </Button>
              </SignedIn>

              {user ? (
                <div className="flex items-center space-x-2">
                  <UserButton />
                  <div className="hidden sm:block text-xs">
                    <p className="text-gray-400">Welcome Back</p>
                    <p className="font-bold">{user.fullName}!</p>
                  </div>
                </div>
              ) : (
                <SignInButton mode="modal" />
              )}
              {user?.passkeys.length === 0 && (
                <Button variant="outline" onClick={createClerkPasskey}>
                  Create passkey
                </Button>
              )}
            </>
          </ClerkLoaded>
        </div>
      </div>
    </header>
  );
};

export default Header;
