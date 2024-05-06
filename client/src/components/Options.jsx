import "./CSS/options.css";

export default function Options({ filter }) {
  function onChange(e) {
    console.log(e.target.value);
    filter(e.target.value);
  }

  return (
    <div className="filter">
      <label htmlFor="category">Category:</label>
      <select
        name="favethings"
        id="category"
        className="dropdown"
        onChange={onChange}
      >
        <option value="0" name="category">
          Select All
        </option>
        <option value="1" name="category">
          Food
        </option>
        <option value="2" name="category">
          Nature
        </option>
        <option value="3" name="category">
          Music
        </option>
        <option value="4" name="category">
          Sports
        </option>
        <option value="5" name="category">
          Tech
        </option>
        <option value="6" name="category">
          Animals
        </option>
      </select>
    </div>
  );
}
