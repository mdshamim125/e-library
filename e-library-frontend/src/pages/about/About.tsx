import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaBook, FaUsers, FaLaptop } from "react-icons/fa";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">About E-Library</h1>
      <p className="text-center text-lg text-gray-700 mb-12">
        E-Library is your digital gateway to knowledge, learning, and
        exploration. Our platform provides seamless access to a wide range of
        books, empowering readers to discover, borrow, and enjoy their favorite
        titles anytime, anywhere.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex items-center gap-2">
            <FaBook className="text-blue-500 w-6 h-6" />
            <CardTitle>Vast Collection</CardTitle>
          </CardHeader>
          <CardContent>
            Explore thousands of books across categories including fiction,
            non-fiction, academic, and professional resources.
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex items-center gap-2">
            <FaUsers className="text-green-500 w-6 h-6" />
            <CardTitle>User-Friendly Interface</CardTitle>
          </CardHeader>
          <CardContent>
            Navigate easily and find your desired books with just a few clicks,
            making reading simple and enjoyable.
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex items-center gap-2">
            <FaLaptop className="text-purple-500 w-6 h-6" />
            <CardTitle>Accessible Anywhere</CardTitle>
          </CardHeader>
          <CardContent>
            Borrow books digitally and read them conveniently on desktop,
            tablet, or mobile, anytime, anywhere.
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
        <p className="text-gray-700 mb-8">
          To make learning accessible to everyone by providing a simple,
          intuitive, and efficient digital library experience.
        </p>

        <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
        <p className="text-gray-700">
          We envision a world where knowledge is limitless and accessible to
          all. E-Library is committed to building a digital community of curious
          minds, lifelong learners, and book enthusiasts.
        </p>
      </div>
    </div>
  );
};

export default About;
