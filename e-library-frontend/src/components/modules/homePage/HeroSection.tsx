import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import banner from "@/assets/images/library.jpg";

const HeroSection = () => {
  return (
    <section className="relative md:min-h-screen py-12 md:py-24 rounded-2xl shadow-lg overflow-hidden bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-6 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Welcome to{" "}
            <span className="text-yellow-500 dark:text-yellow-400">
              E-Library
            </span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300">
            Discover thousands of books, explore diverse categories, and borrow
            instantly — anytime, anywhere.
          </p>

          <div className="mt-6 flex gap-4">
            <Link to="/books">
              <Button className="bg-yellow-500 dark:bg-yellow-400 text-black hover:bg-yellow-600 dark:hover:bg-yellow-500 font-semibold px-6 py-3 rounded-lg">
                Explore Books
              </Button>
            </Link>
            <Link to="/about">
              <Button
                variant="outline"
                className="border-gray-700 dark:border-gray-300 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 px-6 py-3 rounded-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Image / Illustration */}
        <div className="hidden md:flex justify-center">
          <img
            src={banner}
            alt="E-Library Banner"
            className="w-full max-w-lg lg:max-w-xl xl:max-w-2xl h-[300px] md:h-[400px] object-cover rounded-xl drop-shadow-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
