import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { FormFieldCommon } from '@/components/ui/form-field-common'
import { cn, delay } from '@/lib/utils'
import { register } from '@/server-action/auth.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
    switchForm: (form: string) => void;
}

const loginZod = z.object({
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Password is not match",
    path: ["confirmPassword"]
});

type LoginZod = z.infer<typeof loginZod>;
const RegisterForm = ({
    switchForm
}: Props) => {

    const [error, setError] = useState<string | null>(null);
    const route = useRouter();

    const form = useForm<LoginZod>({
        resolver: zodResolver(loginZod),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: ""
        }
    });

    const onSubmit = async (data: LoginZod) => {
        try {
            await register(data.email, data.password);
            toast.success("Create authen success")
            await delay(2000);
            switchForm("login")
        } catch (error) {
            setError("Internal Server Error");
            console.log({ error });
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <div
                        className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Sign up to App</h1>
                    </div>
                    {error && (
                        <p
                            data-slot="error-message"
                            className={cn("text-destructive-foreground  rounded-sm bg-destructive-foreground/10 border-0  p-2.5 text-base")}
                        >
                            {error}
                        </p>
                    )}
                    <div className="grid gap-2">
                        <FormFieldCommon
                            label='Email'
                            control={form.control}
                            name='email'
                            placeholder='x@example.com'
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormFieldCommon
                            label='Password'
                            control={form.control}
                            name='password'
                            type='password'
                            placeholder='Enter password'
                        />
                    </div>
                    <div className="grid gap-2">
                        <FormFieldCommon
                            label='Confirm Password'
                            control={form.control}
                            name='confirmPassword'
                            type='password'
                            placeholder='Confirm password'
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                    <div className="text-center text-sm">
                        Already have an account?{""}
                        <Button type="button" variant={"outline"} onClick={() => switchForm("login")} className="underline underline-offset-4">
                            Sign in
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default RegisterForm