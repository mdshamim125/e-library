import HeroSection from "@/components/modules/homePage/HeroSection";
import RecentBooks from "@/components/modules/homePage/RecentBooks";
import Testimonial from "./Testimonial";
import Newsletter from "./Newsletter";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <RecentBooks />
      <Testimonial />
      <Newsletter />
    </div>
  );
};

export default HomePage;
