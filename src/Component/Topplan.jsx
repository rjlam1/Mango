import { FaTint, FaSun, FaHandScissors, FaBug, FaHands} from "react-icons/fa";


const TopPlantCareMistakes = () => {
  const mistakes = [
    {
      icon: <FaTint className="text-3xl text-red-500" />,
      title: "Overwatering",
      description: "Too much water suffocates roots and promotes root rot.",
    },
    {
      icon: <FaSun className="text-3xl text-yellow-400" />,
      title: "Wrong Lighting",
      description: "Placing shade-loving plants in direct sun can burn leaves.",
    },
    {
      icon: <FaHands className="text-3xl text-green-500" />,
      title: "Neglecting Pruning",
      description: "Dead leaves or stems can drain energy and spread disease.",
    },
    {
      icon: <FaBug className="text-3xl text-orange-500" />,
      title: "Ignoring Pests",
      description: "Small pests can damage or kill plants if left untreated.",
    },
  ];

  return (
    <section className="px-4 py-16 bg-lime-50">
      <div className="mx-auto text-center ">
        <h2 className="mb-6 text-3xl font-bold text-green-700">Top Plant Care Mistakes</h2>
        <p className="mb-10 text-gray-500">Avoid these common issues to keep your plants healthy and thriving.</p>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {mistakes.map((item, idx) => (
            <div key={idx} className="p-6 transition-transform bg-white shadow-lg rounded-xl hover:scale-105">
              <div className="mb-4">{item.icon}</div>
              <h3 className="mb-2 text-lg font-semibold text-gray-400">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopPlantCareMistakes;
