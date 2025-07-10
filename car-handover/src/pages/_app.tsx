import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { cars as mockCars } from "@/mockery/carMockery/CarMockData";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const carsInStorage = localStorage.getItem("cars");
      if (!carsInStorage) {
        localStorage.setItem("cars", JSON.stringify(mockCars));
      }
    }
  }, []);
  return <Component {...pageProps} />;
}
