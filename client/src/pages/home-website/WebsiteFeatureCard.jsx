/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const features = [
  {
    id: 1,
    title: "All Courses",
    description: "Curabitur id eros vehicula, tincidunt libero eu, lobortis mi."
  },
  {
    id: 2,
    title: "Live Class",
    description: "In mollis eros a posuere imperdiet."
  },
  {
    id: 3,
    title: "Appointments",
    description: "Donec maximus elementum ex. Cras convallis ex rhoncus."
  }
];

const FeatureCard = ({ feature, isVisible }) => {
  return (
    <div
      className={`bg-white h-40 rounded-lg shadow-lg p-6 transition-all duration-700 transform hover:scale-105 ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-20"
      }`}
    >
      <div className="text-center">
        <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
        <p className="text-gray-600">
          {feature.description}
        </p>
      </div>
    </div>
  );
};

export default function FeaturesSection() {
  const [visibleFeatures, setVisibleFeatures] = useState({});
  
  useEffect(() => {
    const observers = {};
    const features = document.querySelectorAll('.feature-card');
    
    features.forEach((feature, index) => {
      observers[index] = new IntersectionObserver(
        ([entry]) => {
          setVisibleFeatures(prev => ({
            ...prev,
            [index]: entry.isIntersecting
          }));
        },
        {
          threshold: 0.3,
          rootMargin: '0px'
        }
      );
      
      observers[index].observe(feature);
    });
    
    return () => {
      features.forEach((feature, index) => {
        if (observers[index]) {
          observers[index].disconnect();
        }
      });
    };
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={feature.id} className="feature-card">
              <FeatureCard 
                feature={feature} 
                isVisible={visibleFeatures[index]} 
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}