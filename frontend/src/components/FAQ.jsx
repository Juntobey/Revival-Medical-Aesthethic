import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Icons for expand/collapse

const faqs = [
  {
    question: "What is aesthetics?",
    answer:
      "Aesthetics focuses on enhancing appearance through minimally invasive procedures that improve skin, facial features, and overall body confidence.",
  },
  {
    question: "How does aesthetics better your life?",
    answer:
      "Aesthetic treatments boost self-confidence, address cosmetic concerns, and support mental well-being by helping you feel comfortable and positive about your appearance.",
  },
  {
    question: "What are common aesthetic procedures?",
    answer:
      "Common procedures include Botox, dermal fillers, PRP (Platelet-Rich Plasma) for hair and skin, vampire facials and skin tightening treatments.",
  },
  {
    question: "What is the recovery time?",
    answer:
      "Recovery time varies by treatment; many are minimally invasive with little to no downtime. Some, like PRP, allow you to resume daily activities immediately, while others, like fillers, may require a day or two of rest.",
  },
  {
    question:
      "What are the benefits of drips? (Vitamin B and C, Echinacea, NAD, and Glutathione)",
    answer:
      "These drips support immune function, boost energy, improve skin health, reduce inflammation, and aid in cellular repair, contributing to overall wellness and vitality.",
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
