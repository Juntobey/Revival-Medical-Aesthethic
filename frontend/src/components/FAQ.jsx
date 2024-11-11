import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Icons for expand/collapse

const faqs = [
  {
    question: "What treatments do you offer?",
    answer:
      "We offer a variety of treatments including anti-aging solutions, Botox, PRP, and hair loss treatments. Each treatment is designed to address specific needs and enhance your natural beauty. For detailed information, please visit our treatment information page.",
  },
  {
    question: "Header 2",
    answer:
      "This is an answer to a frequently asked question. filler words/letters zcnscewnueurnchreit cscnroirnitutnvs odsntcuiuernijnmsocisrutn sc nijfvnv",
  },
  {
    question: "Header 3",
    answer:
      "This is an answer to a frequently asked question. filler words/letters zcnscewnueurnchreit cscnroirnitutnvs odsntcuiuernijnmsocisrutn sc nijfvnv",
  },
  {
    question: "Header 4",
    answer:
      "This is an answer to a frequently asked question. filler words/letters zcnscewnueurnchreit cscnroirnitutnvs odsntcuiuernijnmsocisrutn sc nijfvnv",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="relative py-16 shadow-lg">
      {/* This div contains the background with 50% opacity */}
      <div className="absolute inset-0 bg-[#FAFAFA] opacity-50"></div>

      {/* Content of FAQ (fully opaque) */}
      <div className="container mx-auto relative z-10">
        <h2 className="text-center text-h1 font-headers text-darkgreen mb-12">
          Frequently Asked Questions (FAQs)
        </h2>

        <div className=" p-8 rounded-lg  shadow-inner">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-300 mb-4"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center cursor-pointer p-4 rounded-lg bg-fafafa shadow-sm">
                <h3
                  className={`text-2xl font-headers text-darkgreen font-semibold ${
                    activeIndex === index ? "" : ""
                  }`}
                >
                  {faq.question}
                </h3>
                <span>
                  {activeIndex === index ? (
                    <FaChevronUp className="text-darkgreen text-2xl" />
                  ) : (
                    <FaChevronDown className="text-darkgreen text-2xl" />
                  )}
                </span>
              </div>
              {activeIndex === index && (
                <div className="p-4">
                  <p className="text-p font-paragraph  text-darkgreen">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
