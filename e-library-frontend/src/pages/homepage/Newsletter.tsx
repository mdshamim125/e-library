import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    toast.success("Thanks for Subscribing Us");
    setEmail(""); // Clear the input
  };

  return (
    <section className="py-16 bg-yellow-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Stay Updated with Our E-Library
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Subscribe to our newsletter and never miss new book releases, study
          resources, or exclusive offers.
        </p>

        <form
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          onSubmit={handleSubscribe}
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}             // <-- controlled value
            onChange={(e) => setEmail(e.target.value)}  // <-- updates state
            className="flex-1 w-full sm:w-auto"
            required
          />
          <Button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
          >
            Subscribe
          </Button>
        </form>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
