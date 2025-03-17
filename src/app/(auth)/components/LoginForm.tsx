'use client';
import { Button } from '@/components/ui/button';
import { Form, FormMessage } from '@/components/ui/form';
import { FormFieldCommon } from '@/components/ui/form-field-common';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Props = {
    switchForm: (form: string) => void;
};

const loginZod = z.object({
    email: z.string().email(),
    password: z.string()
});

type LoginZod = z.infer<typeof loginZod>;
const LoginForm = ({
    switchForm
}: Props) => {
    const [error, setError] = useState<string | null>(null);
    const route = useRouter();

    const form = useForm<LoginZod>({
        resolver: zodResolver(loginZod),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: LoginZod) => {
        try {
            const response = await signIn("spring-credential", {
                email: data.email,
                password: data.password,
                redirect: false, // ยืนยันว่ามี redirect: false,
            });
            console.log({ response });
            // ตรวจสอบว่าการยืนยันตัวตนสำเร็จหรือไม่
            if (response?.ok) {
                // ตัวอย่าง: redirect ไปหน้าอื่นถ้าจำเป็น
                route.push('/');
            }
            // จัดการข้อผิดพลาดและแสดง toast อย่างเหมาะสม
            if (response?.error) {
                setError(response.error ?? "Internal Server Error");
                console.log(response.error);
            }
        } catch (error) {
            setError("Internal Server Error");
            console.log({ error });
        }
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                    <motion.div
                        transition={{
                            delay: .3,
                            duration: .4
                        }}
                        className="flex flex-col items-center text-center">
                        <h1 className="text-2xl font-bold">Sign in to App</h1>
                    </motion.div>
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
                        <div className="flex items-center">
                            <Link
                                href="#"
                                className="ml-auto text-sm underline-offset-2 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>

                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                    <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                        <span className="relative z-10 bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                    <div className="text-center text-sm">
                        Don't have an account?{""}
                        <Button variant={"outline"} onClick={() => switchForm("register")} className="underline underline-offset-4">
                            Sign up
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};

export default LoginForm;