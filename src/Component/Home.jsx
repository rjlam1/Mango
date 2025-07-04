import TopPlantCareMistakes from "./Topplan";
import BeginnerFriendlyPlants from "./Beginaer";
import NewPlants from "./NewPlant";
import AISection from "./Alsection";
const Home = () => {

  return (
    <div className="min-h-screen text-gray-900 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-gray-100">
      <NewPlants></NewPlants>
      <TopPlantCareMistakes />
      <BeginnerFriendlyPlants />
      <AISection></AISection>
    </div>
  );
};

export default Home;
