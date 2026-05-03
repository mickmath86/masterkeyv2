import Image from 'next/image';
import React from 'react'

const faqsData = [
  {
    question: "How do I start the home buying process?",
    answer:
      "Our approach combines personalized strategies, data-driven insights, and dedicated support to help you reach your financial goals. Each step is crafted to maximize growth, reduce risk, and build lasting financial confidence.",
    id: "accordion-faq-1",
    expanded: false,
  },
  {
    question: "What costs are involved in buying a home?",
    answer:
      "Our approach combines personalized strategies, data-driven insights, and dedicated support to help you reach your financial goals. Each step is crafted to maximize growth, reduce risk, and build lasting financial confidence.",
    id: "accordion-faq-2",
    expanded: true,
  },
  {
    question: "How long does it take to buy a home?",
    answer:
      "Our approach combines personalized strategies, data-driven insights, and dedicated support to help you reach your financial goals. Each step is crafted to maximize growth, reduce risk, and build lasting financial confidence.",
    id: "accordion-faq-3",
    expanded: false,
  },
  {
    question: "Can I buy a home without a real estate agent?",
    answer:
      "Our approach combines personalized strategies, data-driven insights, and dedicated support to help you reach your financial goals. Each step is crafted to maximize growth, reduce risk, and build lasting financial confidence.",
    id: "accordion-faq-4",
    expanded: false,
  },
  {
    question: "Do I need to sell my current home before buying a new one?",
    answer:
      "Our approach combines personalized strategies, data-driven insights, and dedicated support to help you reach your financial goals. Each step is crafted to maximize growth, reduce risk, and build lasting financial confidence.",
    id: "accordion-faq-5",
    expanded: false,
  },
];

export default function FAQs1() {
  return (
    <div className="tf-container">
      <div className="tf-grid-layout lg-col-2">
        <div className="box-faqs tf-animate-1">
          <div className="thumbs">
            <Image
              src="/assets/images/section/section-faq.jpg"
              width={600}
              height={660}
              alt="section-faq"
            />
          </div>
          <div className="content">
            <h3 className="title text_white mb_12">Get in Touch with Us</h3>
            <p className="text_white text-body-2 mb_20">
              Reach out today for expert real estate advice, personalized support, and a dedicated team ready to guide you every step of the way.
            </p>
            <a href="#" className="tf-btn btn-bg-1 btn-px-28">
              <span>Schedule a Consultation</span>
              <span className="bg-effect"></span>
            </a>
          </div>
        </div>
        <div className="wrap-accordion">
          <div className="heading-section mb_48">
            <span className="sub text-uppercase fw-6 text_secondary-color-2">FAQs</span>
            <h3>Ask Us Anything About Home Buying & Selling</h3>
          </div>
          <ul className="accordion-wrap" id="accordion-faq">
            {faqsData.map((faq) => (
              <li className="accordion-item" key={faq.id}>
                <a
                  href={`#${faq.id}`}
                  className={`accordion-title${faq.expanded ? " " : " collapsed"}`}
                  data-bs-toggle="collapse"
                  aria-expanded={faq.expanded ? "true" : "true"}
                  aria-controls={faq.id}
                >
                  <div className="heading">
                    <h6 className="title">{faq.question}</h6>
                    <span className="icon icon-CaretDown"></span>
                  </div>
                </a>
                <div
                  id={faq.id}
                  className={`collapse${faq.expanded ? " show" : ""}`}
                  data-bs-parent="#accordion-faq"
                >
                  <div className="accordion-faqs-content">
                    <p className="text-body-1">{faq.answer}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
