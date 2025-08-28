interface SelectTagInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  tags: Tag[]; // The options prop is now a string array
}

const SelectTagInput: React.FC<SelectTagInputProps> = ({tags, id, name, value, onChange, className}) => {
    return (
        <select 
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={className}
        >
            {tags.map((tag, index) => (
                <option value={tag.id}>{tag.title}</option>
            ))};
        </select>
    );
}

export default SelectTagInput;