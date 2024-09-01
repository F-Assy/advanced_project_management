const InProgressIcon = ({ primary }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Circle with 2px Border */}
      <circle
        cx="7"
        cy="7"
        r="6"
        stroke={`${primary ? "currentColor" : "#5f55ee"}`}
        strokeWidth="1.5"
        fill="transparent"
      />

      {/* Right Half-Filled Semicircle with a Gap from the Border */}
      <path
        d="M7 3
           A4 4 0 0 1 11 7
           A4 4 0 0 1 7 11
           L7 7 Z"
        fill={`${primary ? "currentColor" : "#5f55ee"}`}
      />
    </svg>
  );
};

export default InProgressIcon;
