export const Inputbox = ({ label, placeholder, inputType, onChange }) => {
    return (
        <div>
            <div className="text-sm font-medium text-left py-2">
                {label}
            </div>
            <input
                type={inputType}
                placeholder={placeholder}
                className="w-full border rounded px-2 py-1 border-slate-200"
                onChange={onChange}
            />
        </div>
    )


}