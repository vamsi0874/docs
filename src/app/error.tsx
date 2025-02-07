"use client"

import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1>Error </h1>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default ErrorPage;