import "./Home.css";

import FeaturedProperties from "../components/FeaturedProperties.jsx";
import PropertyCarousel from "./PropertyCarousel.jsx";

const Home = () => {
  return (
    <div className="main-wrapper">
      <PropertyCarousel />
      <FeaturedProperties />
    </div>
  );
};

export default Home;
