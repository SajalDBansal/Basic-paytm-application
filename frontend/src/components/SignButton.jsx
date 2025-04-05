export const Signbutton = ({ label, onClick }) => {

    return (
        <button className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-3 mb-2 cursor-pointer" onClick={onClick}>
            {label}
        </button>

    )
}