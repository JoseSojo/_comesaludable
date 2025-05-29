import { Dispatch, SetStateAction } from "react";

const StarRating = ({ value = 0, onChange }: { value: number, onChange: Dispatch<SetStateAction<number>> }) => {
    return (
      <div className="flex flex-row-reverse gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <label key={star} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={star}
              className="appearance-none"
              checked={value === star}
              onChange={() => onChange(star)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className={`w-8 h-8 overflow-visible
                ${value >= star ? "fill-[#ffc73a] stroke-[#ffc73a]" : "fill-transparent stroke-[#666]"}
                stroke-[1.5] stroke-linejoin-[bevel]
                transition-all duration-200
                ${value === star ? "animate-yippee" : "animate-idle"}
              `}
            >
              <path
                pathLength="360"
                d="M12,17.27L18.18,21L16.54,13.97L22,9.24
                L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,
                13.97L5.82,21L12,17.27Z"
              />
            </svg>
          </label>
        ))}
        <style>
          {`
            @keyframes idle {
              from {
                stroke-dashoffset: 24;
              }
            }
            .animate-idle {
              stroke-dasharray: 12;
              animation: idle 4s linear infinite;
            }
  
            @keyframes yippee {
              0% {
                transform: scale(1);
                fill-opacity: 0;
                stroke-opacity: 1;
                stroke-dasharray: 10;
                stroke-width: 1px;
                stroke-linejoin: bevel;
              }
              30% {
                transform: scale(0);
                fill-opacity: 0;
                stroke-opacity: 1;
                stroke-dasharray: 10;
                stroke-width: 1px;
                stroke-linejoin: bevel;
              }
              30.1% {
                stroke-dasharray: 0;
                stroke-linejoin: miter;
                stroke-width: 8px;
              }
              60% {
                transform: scale(1.2);
                fill-opacity: 1;
              }
            }
            .animate-yippee {
              stroke-dasharray: 0;
              animation: idle 4s linear infinite, yippee 0.75s backwards;
              stroke-opacity: 0;
              stroke-width: 8px;
              stroke-linejoin: miter;
            }
          `}
        </style>
      </div>
    );
  };
  
  export default StarRating;
  