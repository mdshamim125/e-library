import Logo from "@/assets/icons/Logo";
import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container p-6 mx-auto">
        <div className="lg:flex">
          {/* Brand Info */}
          <div className="w-full -mx-6 lg:w-2/5">
            <div className="px-6">
              <Logo />

              <p className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
                E-Library – your digital gateway to knowledge. Borrow, read, and
                explore books anytime, anywhere.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="mt-6 lg:mt-0 lg:flex-1">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* Quick Links */}
              <div>
                <h3 className="text-gray-700 uppercase dark:text-white font-semibold">
                  Quick Links
                </h3>
                <Link
                  to="/"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Home
                </Link>
                <Link
                  to="/books"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Books
                </Link>
                <Link
                  to="/about"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Contact
                </Link>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-gray-700 uppercase dark:text-white font-semibold">
                  Resources
                </h3>
                <Link
                  to="/faq"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  FAQ
                </Link>
                <Link
                  to="/terms"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/privacy"
                  className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  Privacy Policy
                </Link>
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-gray-700 uppercase dark:text-white font-semibold">
                  Categories
                </h3>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Programming
                </span>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Computer Science
                </span>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                  DevOps
                </span>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Software Engineering
                </span>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-gray-700 uppercase dark:text-white font-semibold">
                  Contact
                </h3>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                  +880 123 456 789
                </span>
                <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400">
                  support@elibrary.com
                </span>
              </div>
            </div>
          </div>
        </div>

        <hr className="h-px my-6 bg-gray-200 border-none dark:bg-gray-700" />

        {/* Copyright */}
        <div>
          <p className="text-center text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} E-Library — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
