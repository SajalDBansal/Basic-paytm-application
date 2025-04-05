import { useEffect, useState } from "react"
import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"

export const Dashboard = () => {
    const [balance, setBalance] = useState(123);

    useEffect(() => {
        const token = localStorage.getItem("token");
        fetch("http://localhost:8080/api/v1/account/balance", {
            headers: {
                "authorization": token
            }
        }).then(async (res) => {
            const data = await res.json();
            setBalance(data.balance);
        })
    }, []);

    return <div>
        <Appbar />
        <div className="m-8">
            <Balance value={balance} />
            <Users />
        </div>
    </div>
}