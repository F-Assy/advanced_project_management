function LoadingSpinner({ theme }) {
  return (
    <div className={`${theme === "big" ? "big-spinner" : "spinner"} `}></div>
  );
}

export default LoadingSpinner;
