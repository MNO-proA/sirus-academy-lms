/* eslint-disable react/prop-types */

import { useEffect, useState} from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "AWS CLOUD",
    description:
      "Our AWS Solutions Architect - Course is intended for every individual who want to learn and become AWS Solutions Engineer...",
    image: "images/aws-cloud.png",
    authorImage: "/author1.png",
    isPaid: true,
  },
  {
    id: 2,
    title: "Cloud (Microsoft Azure Admin)",
    description:
      "Microsoft Azure Administration course teaches IT Professionals how to manage Azure subscriptions, secure identities...",
    image: "images/azure-cloud.jpg",
    authorImage: "/author2.png",
    isPaid: false,
  },
  {
    id: 3,
    title: "DEVOPS",
    description:
      "DevOps training program will provide you with in-depth knowledge of various DevOps tools, including Git, Jenkins, Docker...",
    image: "images/DevOps-Lifecycle.jpg",
    authorImage: "/author3.png",
    isPaid: true,
  },
  {
    id: 4,
    title: "AZURE DEVOPS",
    description:
      "Our AWS Solutions Architect - Course is intended for every individual that wants to learn and become AWS Solutions Engineer...",
    image: "images/azure-devops.png",
    authorImage: "/author4.png",
    isPaid: false,
  },
  {
    id: 5,
    title: "AWS DEVOPS",
    description:
      "The course covers the fundamental concepts of compute and security that learners and professionals will need to know when ...",
    image: "images/aws-devops.png",
    authorImage: "/author5.png",
    isPaid: true,
  },
];

const CourseCard = ({ course, isVisible }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-700 transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
      }`}
    >
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h4 className="text-xl font-bold mb-2">{course.title}</h4>
        <p className="text-gray-600 mb-4">{course.description}</p>
        <div className="flex items-center justify-between">
        <button
      onClick={() => navigate("/auth")}
      className="px-6 py-2 rounded border border-[#B1771D] text-[#B1771D] transition-colors duration-300 hover:bg-[#B1771D] hover:text-white"
    >
      View More <ChevronRight className="inline" />
    </button>
        </div>
      </div>
    </div>
  );
};

export default function CoursesSection() {
  const [visibleCards, setVisibleCards] = useState({});

  useEffect(() => {
    const observers = {};
    const cards = document.querySelectorAll(".course-card");

    cards.forEach((card, index) => {
      observers[index] = new IntersectionObserver(
        ([entry]) => {
          setVisibleCards((prev) => ({
            ...prev,
            [index]: entry.isIntersecting,
          }));
        },
        {
          threshold: 0.2,
          rootMargin: "0px",
        }
      );

      observers[index].observe(card);
    });

    return () => {
      cards.forEach((card, index) => {
        if (observers[index]) {
          observers[index].disconnect();
        }
      });
    };
  }, []);

  return (
    <section id="section4" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Choose Your Course
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div key={course.id} className="course-card">
              <CourseCard course={course} isVisible={visibleCards[index]} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
