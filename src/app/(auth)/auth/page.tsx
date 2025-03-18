import React from 'react'
import AuthFormComponent from '../components/AuthFormComponent'
import { Metadata } from 'next';

type Props = {}
export const metadata: Metadata = {
    title: "Authentication",
    description: "Generated by create next app",
};
const SignInPage = (props: Props) => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <AuthFormComponent />
            </div>
        </div>
    )
}

export default SignInPage