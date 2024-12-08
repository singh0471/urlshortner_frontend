const Filter = ({ label, attribute, value, onFilterChange }) => {
    return (
      <div className="flex flex-col items-start gap-1 text-xs">
        <label htmlFor={attribute} className="font-medium text-gray-600 text-[10px]">
          {label}:
        </label>
        <input
          id={attribute}
          type="text"
          value={value}
          onChange={(e) => onFilterChange(attribute, e.target.value)}
          placeholder={`Filter by ${label}`}
          className="w-28 p-2 text-xs text-black border border-gray-300 rounded-md bg-gray-50 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
        />
      </div>
    );
  };
  
  export default Filter;
  