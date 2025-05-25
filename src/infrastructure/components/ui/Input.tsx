
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ ...props }) {

    return (
        <input
            {...props}
            className={`w-full border dark:text-gray-50 dark:border-gray-50 border-gray-300 rounded px-3 py-2 outline-none focus:outline-none ${props.className || ''}`}
        />
    )
}
