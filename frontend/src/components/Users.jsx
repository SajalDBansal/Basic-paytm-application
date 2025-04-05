import { useEffect, useState } from "react"
import { Signbutton } from "./SignButton"
import { UserIcon } from "./UserIcon"
import { useNavigate } from "react-router-dom"

export const Users = () => {

    const [filter, setFilter] = useState(" ");
    const [users, setUsers] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/api/v1/user/bulk?filter=" + filter, {
            headers: {
                "authorization": token
            }
        })
            .then(async (res) => {
                const data = await res.json();
                setUsers(data.user)
            })

    }, [filter]);

    return (
        <div>
            <div className="font-bold text-lg mt-6">
                Users
            </div>
            <div className="my-2">
                <input
                    type="text"
                    placeholder="Search User.."
                    className="w-full border border-slate-200 py-1 rounded px-1"
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
            <div>
                {users.map(user => <User key={user._id} user={user} />)}

            </div>
        </div>
    )
}


function User({ user }) {
    const navigate = useNavigate();

    const navigateToSendMoney = () => {
        name = user.firstName + " " + user.lastName;
        navigate("/send?id=" + user._id + "&name=" + name);
    }

    return (
        <div className="flex justify-between">
            <div className="flex">
                <UserIcon name={user.firstName[0]} />
                <div className="flex flex-col justify-center">
                    {user.firstName} {user.lastName}
                </div>

            </div>
            <div className="flex flex-col justify-center h-full">
                <Signbutton label={"Send Money"} onClick={navigateToSendMoney} />
            </div>

        </div>
    )

}