import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "University Student",
    message:
      "The E-Library has been a game-changer for my studies. I can easily find textbooks and references without spending hours searching elsewhere.",
    image: "https://i.pravatar.cc/100?img=47",
  },
  {
    name: "James Carter",
    role: "Software Engineer",
    message:
      "I love how organized the categories are. The borrowing process is seamless, and I always find books that match my interests in technology.",
    image: "https://i.pravatar.cc/100?img=12",
  },
  {
    name: "Amina Rahman",
    role: "Researcher",
    message:
      "The E-Library is my go-to place for research papers and technical books. The responsive design makes it easy to read even on my phone.",
    image: "https://i.pravatar.cc/100?img=33",
  },
];

export default function Testimonial() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          What Our Readers Say
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className="shadow-lg rounded-2xl bg-white dark:bg-gray-800 transition"
            >
              <CardContent className="p-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-yellow-400"
                />
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                  “{testimonial.message}”
                </p>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {testimonial.role}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
