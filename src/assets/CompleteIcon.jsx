const CompleteIcon = ({ primary }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Filled Green Circle */}
      <circle
        cx="7"
        cy="7"
        r="7"
        fill={`${primary ? "currentColor" : "#008844"}`}
      />

      {/* Transparent Checkmark */}
      <path
        d="M4.2 7L6.3 9.1L9.8 4.9"
        stroke={`${primary ? "#008844" : "white"}`}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CompleteIcon;
