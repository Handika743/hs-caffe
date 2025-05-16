"use client";
import React from "react";
import Image from "next/image";

const LoadingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent">
      <div className="coffee-shake">
        <Image
          src="/kopsuren-removebg.png"
          alt="Loading Coffee"
          width={150}
          height={150}
          priority
        />
      </div>

      <style jsx>{`
        .coffee-shake {
          animation: shake 0.6s infinite;
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-10px);
          }
          75% {
            transform: translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingPage;
