import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { category } from "../../utils/catoegory";

const CategoryCarousel = () => {
  const [cIdx, setCIdx] = useState(0);
  const itemsToShow = 3;

  const nextSlide = () => {
    if (cIdx < category.length - itemsToShow) {
      setCIdx(cIdx + 1);
    }
  };

  const prevSlide = () => {
    if (cIdx > 0) {
      setCIdx(cIdx - 1);
    }
  };
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="flex overflow-hidden">
        {category.slice(cIdx, cIdx + itemsToShow).map((item, index) => (
          <div key={index} className="flex-none w-1/3 p-2">
            <div className="bg-gray-500 text-white md:text-2xl text-xl p-3 rounded-lg text-center shadow-lg cursor-pointer">
              {item}
            </div>
          </div>
        ))}
      </div>
      {cIdx > 0 && (
        <button onClick={prevSlide} className="nxt-prv left-0 lg:-left-12">
          <FaChevronLeft className="buttons-icon" />
        </button>
      )}

      {cIdx < category.length - itemsToShow && (
        <button onClick={nextSlide} className="nxt-prv right-0 lg:-right-12">
          <FaChevronRight className="buttons-icon" />
        </button>
      )}
    </div>
  );
};

export default CategoryCarousel;
