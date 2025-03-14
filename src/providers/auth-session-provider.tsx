'use client';
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useStoreModal from "@/stores/store-modal";

const AuthSessionProvider = () => {
    const { data: session, status } = useSession(); // เพิ่ม status
    const storeModal = useStoreModal();
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {
        if (!session && !pathName.startsWith("/auth")) { // ตรวจสอบ status ของ session
            storeModal.openModal("Unauthorize", {
                content: (
                    <div className='flex flex-col gap-5'>
                        <h1>Time out</h1>
                        <Button className="ml-auto" onClick={() => {
                            router.push("/auth");
                            storeModal.closeModal();
                        }}>OK</Button>
                    </div>
                )
            });
        }
    }, [session, pathName]); // เพิ่ม dependencies ที่สำคัญ

    return null;
}

export default AuthSessionProvider;
