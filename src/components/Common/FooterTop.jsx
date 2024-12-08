import React from "react";

const FooterTop = () => {
  const incentives = [
    {
      name: "Free shipping",
      imageSrc: "./assets/shipping.svg",
      description:
        "It's not actually free we just price it into the products. Someone's paying for it, and it's not us.",
    },
    {
      name: "10-year warranty",
      imageSrc: "./assets/warranty.svg",
      description:
        "If it breaks in the first 10 years we'll replace it. After that you're on your own though.",
    },
    {
      name: "Exchanges",
      imageSrc: "./assets/exchange.svg",
      description:
        "If you don't like it, trade it to one of your friends for something of theirs. Don't send it here though.",
    },
  ];
  return (
    <div className="footer-top-container">
      <div className="header-text">
        <h2>We built our business on customer service</h2>
      </div>
      <div className="footer-bottom-container">
        {incentives.map((item) => (
          <div key={item?.name} className="text-container">
            <img
              src={item?.imageSrc}
              alt="image"
              className="mx-auto h-16 w-16"
            />
            <div className="text-data">
              <h3>{item?.name}</h3>
              <p>{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterTop;
