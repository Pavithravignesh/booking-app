interface SearchableDropdownProps<T> {
    options: T[];
    value: T | null;
    onChange: (value: T | null) => void;
    placeholder?: string;
    getOptionLabel: (option: T) => string;
    getOptionValue: (option: T) => string;
}

export default function SearchableDropdown<T>({ 
    options, 
    value, 
    onChange, 
    placeholder,
    getOptionLabel,
    getOptionValue 
}: SearchableDropdownProps<T>) {
    return (
        <select 
            value={value ? getOptionValue(value) : ''}
            onChange={(e) => {
                const selected = options.find(opt => getOptionValue(opt) === e.target.value) || null;
                onChange(selected);
            }}
            className="w-full p-2 border rounded"
        >
            <option value="">{placeholder}</option>
            {options.map((option) => (
                <option key={getOptionValue(option)} value={getOptionValue(option)}>
                    {getOptionLabel(option)}
                </option>
            ))}
        </select>
    );
} 