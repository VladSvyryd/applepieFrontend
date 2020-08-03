const MyCustomSliderComponent = ({ value, onChange }: any) => {
  return (
    <div>
      <input
        className="slider"
        type="range"
        name="foo"
        min="1000"
        max="20000"
        step="1000"
        value={value}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default MyCustomSliderComponent;
