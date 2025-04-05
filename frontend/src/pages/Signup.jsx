import { Heading } from "../components/Heading"
import { SubHeading } from "../components/Subheading"
import { Inputbox } from "../components/Inputbox"
import { Signbutton } from "../components/SignButton"
import { ButtonWarning } from "../components/ButtonWarning"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios";

export const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSignUpButtonClick = async () => {
        const response = await axios.post("http://localhost:8080/api/v1/user/signup", {
            username, firstName, lastName, password
        });
        localStorage.setItem("token", "Bearer " + response.data.token);
        navigate("/dashboard");
    }



    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign Up"} />
                <SubHeading label={"Enter your information to create an account"} />
                <Inputbox
                    label={"First Name"}
                    placeholder={"John"}
                    inputType={"text"}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Inputbox
                    label={"Last Name"}
                    placeholder={"Doe"}
                    inputType={"text"}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Inputbox
                    label={"Email"}
                    placeholder={"xxx@email.com"}
                    inputType={"email"}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Inputbox
                    label={"Password"}
                    placeholder={"123456"}
                    inputType={"password"}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Signbutton
                    label={"Sign Up"}
                    onClick={onSignUpButtonClick}
                />
                <ButtonWarning label={"Already have an account?"} buttonText={"Login"} to={"/signin"} />
            </div>
        </div>
    </div>
}


