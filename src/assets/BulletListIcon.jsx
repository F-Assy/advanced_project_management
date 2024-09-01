const BulletListIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* First bullet */}
    <circle cx="3" cy="3" r="1.2" fill="currentColor" />
    <line
      x1="6"
      y1="3"
      x2="16"
      y2="3"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Second bullet */}
    <circle cx="3" cy="7.5" r="1.2" fill="currentColor" />
    <line
      x1="6"
      y1="7.5"
      x2="16"
      y2="7.5"
      stroke="currentColor"
      strokeWidth="1.5"
    />

    {/* Third bullet */}
    <circle cx="3" cy="12" r="1.2" fill="currentColor" />
    <line
      x1="6"
      y1="12"
      x2="16"
      y2="12"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export default BulletListIcon;
