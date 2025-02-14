import { useEffect, useState } from "react";
import { Send, Mail, User, MessageSquare, MapPin } from "lucide-react";

const ContactSection = () => {
  const [visibleElements, setVisibleElements] = useState({});

  useEffect(() => {
    const observers = {};
    const elements = document.querySelectorAll(".animate-element");

    elements.forEach((element, index) => {
      observers[index] = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            // Once element becomes visible, keep it visible
            setVisibleElements((prev) => ({
              ...prev,
              [index]: true,
            }));
            // Unobserve after it becomes visible
            observers[index].unobserve(element);
          }
        },
        {
          threshold: 0.2,
          rootMargin: "0px",
        }
      );

      observers[index].observe(element);
    });

    return () => {
      elements.forEach((element, index) => {
        if (observers[index]) {
          observers[index].disconnect();
        }
      });
    };
  }, []);

  const getAnimationClass = (index) => {
    return visibleElements[index]
      ? "opacity-100 translate-y-0"
      : "opacity-0 translate-y-20";
  };

  return (
    <section id="section6" className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="animate-element transition-all duration-700 transform text-center mb-16">
          <h2 className={`text-4xl font-bold mb-4 ${getAnimationClass(0)}`}>
            Let&apos;s Keep In Touch
          </h2>
          <p
            className={`text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${getAnimationClass(
              1
            )}`}
          >
            Have a question or want to work together? We&apos;d love to hear
            from you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left side - Form */}
          <div className="flex flex-col justify-between h-full">
            <form className="space-y-6 bg-white p-8 rounded-xl shadow-lg h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="relative">
                  <User
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-3 text-gray-400"
                    size={20}
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                    required
                  />
                </div>
              </div>
              <div className="relative flex-grow">
                <MessageSquare
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <textarea
                  placeholder="Your message..."
                  rows="6"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none h-full"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#B1771D] hover:bg-[#8d601c] text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Send Message</span>
                <Send size={20} />
              </button>
            </form>
          </div>

          {/* Right side - Map */}
          <div className="flex flex-col justify-between h-full">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex items-start space-x-4">
                <MapPin className="text-blue-600" size={24} />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                  <p className="text-gray-600">Visit us at our office</p>
                </div>
              </div>
            </div>
            <div className="h-full">
              <iframe
                src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full rounded"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
