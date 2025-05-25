import { Category, Environment, Type } from "@prisma/client";
import { useState } from "react";

export type Option = Type | Category | Environment

type SearchSelectProps = {
  options: Option[];
  placeholder?: string;
  name: string;
  onChange: (selected: Option | null, name: string) => void;
  initial?: Option
};

export default function SearchSelect({ options, placeholder, onChange,name,initial }: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Option | null>(initial ? initial : null);

  const handleSelect = (option: Option) => {
    setSelected(option);
    setQuery(option.name);
    setIsOpen(false);
    onChange(option, name);
  };

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        placeholder={placeholder || "Buscar..."}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        className="w-full px-4 py-2 border dark:text-gray-400 dark:border-gray-400 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
      />
      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto">
          {options.length > 0 ? (
            options.map((option) => (
              <li
                key={option.id}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-300"
                onMouseDown={() => handleSelect(option)} // use onMouseDown to prevent blur
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-500 dark:text-gray-400">Sin resultados</li>
          )}
        </ul>
      )}
    </div>
  );
}
