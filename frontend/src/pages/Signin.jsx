import { Heading } from "../components/Heading"
import { SubHeading } from "../components/Subheading"
import { Inputbox } from "../components/Inputbox"
import { Signbutton } from "../components/SignButton"
import { ButtonWarning } from "../components/ButtonWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSignInButtonClick = async () => {
        const response = await axios.post("http://localhost:8080/api/v1/user/signin", {
            username, password
        });
        localStorage.setItem("token", "Bearer " + response.data.token);
        navigate("/dashboard");
    }

    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign In"} />
                <SubHeading label={"Enter your credentials to access your account"} />
                <Inputbox
                    label={"Email"}
                    placeholder={"xxx.email.com"}
                    inputType={"email"}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Inputbox
                    label={"Password"}
                    placeholder={""}
                    inputType={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Signbutton label={"Sign in"} onClick={onSignInButtonClick} />
                <ButtonWarning label={"Don't have an account?"} buttonText={"Sign Up"} to={"/signup"} />

            </div>
        </div>
    </div>
}