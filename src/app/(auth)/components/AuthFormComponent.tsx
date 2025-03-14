'use client';
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React, { useState } from 'react'
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { AnimatePresence, motion } from 'framer-motion'
type Props = {}

const AuthFormComponent = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) => {
    const [form, setForm] = useState<string>("login");
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden">
                <CardContent className="">
                    <div className="relative w-full h-full">
                        <AnimatePresence mode="wait">
                            <div className="grid p-0 md:grid-cols-2 relative">
                                {/* Form Section */}
                                <div className={`relative w-full ${form === "login" ? 'order-1' : 'order-2'}`}>
                                    {form === "login" ? (
                                        <motion.div
                                            key="login"
                                            initial={{ x: 50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: -50, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="  w-full h-full p-6 md:p-8 z-10"
                                        >
                                            <LoginForm switchForm={(form) => setForm(form)} />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="register"
                                            initial={{ x: -50, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ x: 50, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="  w-full h-full p-6 md:p-8 z-10"
                                        >
                                            <RegisterForm switchForm={(form) => setForm(form)} />
                                        </motion.div>
                                    )}
                                </div>

                                {/* Background Section */}
                                <motion.div
                                    initial={{ x: form === "login" ? -50 : 50, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: form === "login" ? -50 : 50, opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    className={`relative hidden md:block bg-muted ${form === "login" ? 'order-2' : 'order-1'}`}
                                    style={{ zIndex: -1 }} // ให้ background อยู่ด้านล่าง
                                />
                            </div>
                        </AnimatePresence>

                    </div>

                    {/* รูปหรือ Background ด้านข้าง */}

                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
                and <Link href="#">Privacy Policy</Link>.
            </div>
        </div >
    )
}

export default AuthFormComponent