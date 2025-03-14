import { create } from "zustand";

interface StoreProductOption {
    productOptions: ProductOption[];
    setProductOption: (productOptions: ProductOption[]) => void;
}
export const useStoreProductOption = create<StoreProductOption>()(
    (set, get) => ({
        productOptions: [],
        setProductOption(productOptions) {
            set({ productOptions })
        },
    })
)