import { useState } from "react";
import { Heading } from "../components/Heading"
import { Inputbox } from "../components/Inputbox"
import { Signbutton } from "../components/SignButton"
import { UserIcon } from "../components/UserIcon"
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";


export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState();
    const navigate = useNavigate();

    const sendMoney = async () => {
        await axios({
            url: "http://localhost:8080/api/v1/account/transfer",
            method: "POST",
            headers: {
                "authorization": localStorage.getItem("token")
            },
            data: {
                amount: amount,
                to: id
            }
        })
        navigate("/dashboard");
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Send Money"} />
                <div className="p-3 mt-5 flex">
                    <UserIcon name={name} />
                    <h3 className="flex flex-col justify-center text-2xl font-bold">{name}</h3>

                </div>

                <Inputbox label={"Amount (in Rs.)"} placeholder={"Enter Amount"} inputType={"email"} onChange={(e) => setAmount(e.target.value)} />
                <Signbutton label={"Initiate Transfer"} onClick={sendMoney} />

            </div>
        </div>
    </div>
}