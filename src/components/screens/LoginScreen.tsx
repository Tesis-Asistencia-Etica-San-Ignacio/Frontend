import React from "react";
import LoginTemplate from "@/components/templates/LoginTemplate";
import { FormField } from "@/components/molecules/Dynamic-form";

const loginFields: FormField[] = [
    {
        type: "email",
        key: "email",
        placeholder: "Enter your email",
        
    },
    {
        type: "password",
        key: "password",
        placeholder: "Enter your password",
    },
    
    
];

export default function LoginScreen() {
    return <LoginTemplate fields={loginFields} />;
}
