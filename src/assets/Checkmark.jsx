function Checkmark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="blue" />
          <stop offset="100%" stopColor="violet" />
        </linearGradient>
      </defs>
      <path
        d="M5.5 11.5l-2.5-2.5 1.5-1.5 2.5 2.5 6.5-6.5 1.5 1.5-8 8z"
        fill="url(#gradient1)"
      />
    </svg>
  );
}

export default Checkmark;
