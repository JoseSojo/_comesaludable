
interface Props {
    click?: () => void;
    text: string;
    type?: "submit" | "button";
}

export default function Button ({ text,click,type="button" }: Props) {

    return (
        <button type={type} onClick={click} className="px-5 py-2 bg-emerald-400 hover:bg-emerald-600 hover:text-white rounded-md">{text}</button>
    )
}
