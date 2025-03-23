"use client";

import { useSession, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useStoreModal from "@/stores/store-modal";

const AuthSessionProvider = () => {
    const { data: session, status } = useSession();
    const storeModal = useStoreModal();
    const router = useRouter();
    const pathName = usePathname();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (!session && !pathName.startsWith("/auth") && !isModalOpen) {
            setIsModalOpen(true);

            // เรียก signOut() ของ next-auth ก่อน
            signOut({ redirect: false }).then(() => {
                storeModal.openModal("Session Expired", {
                    content: (
                        <div className="flex flex-col gap-5">
                            <h1>Your session has expired. Please log in again.</h1>
                            <Button
                                className="ml-auto"
                                onClick={() => {
                                    storeModal.closeModal();
                                    router.push("/auth"); // ไปหน้า Login
                                }}
                            >
                                OK
                            </Button>
                        </div>
                    ),
                });
            });
        }
    }, [session, pathName, status, isModalOpen]);

    return null;
};

export default AuthSessionProvider;
