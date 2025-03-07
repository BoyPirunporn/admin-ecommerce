import { create } from 'zustand'

interface StoreModalProps {
    open: boolean;
    openModal: ( title: string, options?: { description?: string;content: React.ReactNode, }) => void;
    closeModal: () => void;
    content: React.ReactNode;
    title: string;
    description?: string | null;
}

const useStoreModal = create<StoreModalProps>()(
    (set) => ({
        open: false,
        openModal: ( title: string, options?: { description?: string; content: React.ReactNode,}) => {
            set({
                content: options?.content,
                title,
                description: options?.description,
                open: true
            });
        },
        closeModal: () => {
            set({ open: false });
        },
        content: null,
        title: "",
        description: ""
    })
);

export default useStoreModal