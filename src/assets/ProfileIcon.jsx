const NoProfileIcon = (props) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="10" cy="6" r="3" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M3.5 10c0-2.5 2.5-4.5 6.5-4.5s6.5 2 6.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      transform="translate(0, 4)"
    />
  </svg>
);

export default NoProfileIcon;
