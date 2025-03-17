'use client';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { AnimatePresence, motion } from 'framer-motion';
type Props = {};

const AuthFormComponent = ({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) => {
    const [form, setForm] = useState<string>("login");
    const [isAnimating, setIsAnimating] = useState(false); // ป้องกันการเปลี่ยนก่อนจบ animation

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card className="overflow-hidden py-0">
                <CardContent className="p-0">
                    <div className="relative w-full h-full">
                        <AnimatePresence mode="wait">
                            <div className="relative flex flex-row">
                                {/* Form Section */}
                                <div className={`relative  w-[70%]  ${form === "register" ? 'order-1' : 'order-2'}`}>
                                    <motion.div
                                        key="login"
                                        initial={{ x: form === "register" ? "-60%" : "0%" }}
                                        animate={{ x: form === "register" ? "0" : "-60%", }}
                                        exit={{ x: "100%", }}
                                        transition={{ duration: 1, ease: "easeInOut" }}
                                        onAnimationComplete={() => setIsAnimating(false)}
                                        className="  w-full h-full p-6 md:p-8 z-10"
                                    >
                                        {!isAnimating && form === "login" ? (
                                            <LoginForm switchForm={() => {
                                                setIsAnimating(true);
                                                setForm("register");
                                            }} />
                                        ) : (
                                            <RegisterForm switchForm={() => {
                                                setIsAnimating(true);
                                                setForm("login");
                                            }} />
                                        )}
                                    </motion.div>

                                </div>

                                {/* Background Section */}
                                <motion.div
                                    key={form}
                                    initial={{ x: form === "register" ? "175%" : "0%" }}
                                    animate={{ x: form === "register" ? "0" : "175%", }}
                                    // exit={{ x: form === "login" ? "0" : "-100%",  }}
                                    transition={{ duration: 1, ease: "easeInOut" }}
                                    className={`inset-1 z-10 relative hidden md:block w-[40%]  !bg-red-400  `}
                                />
                            </div>
                        </AnimatePresence>

                    </div>
                </CardContent>
            </Card>
            <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
                By clicking continue, you agree to our <Link href="#">Terms of Service</Link>{" "}
                and <Link href="#">Privacy Policy</Link>.
            </div>
        </div >
    );
};

export default AuthFormComponent;