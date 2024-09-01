function AuthInput({ handleInputChange, value, config }) {
  return (
    <div className="input-container">
      <label>{config.label}</label>
      <input
        type={config.type}
        required
        name={config.key}
        onChange={handleInputChange}
        placeholder={config.placeholder}
        value={value}
      />
    </div>
  );
}

export default AuthInput;
