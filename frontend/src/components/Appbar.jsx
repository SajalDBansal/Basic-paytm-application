import { UserIcon } from "./UserIcon"
import { Signbutton } from "./SignButton"
import { useNavigate } from "react-router-dom";

export const Appbar = () => {
    const navigate = useNavigate();

    const signout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    }

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 font-bold text-xl">
                Paytm App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello
                </div>
                <button
                    className="flex flex-col justify-center mr-4 border h-8 bg-gray-800 text-white rounded-lg mt-3 px-3 py-2 cursor-pointer hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 text-small"
                    onClick={signout}
                >
                    Logout
                </button>
                <UserIcon name={"User"} />


            </div>

        </div>
    )
}