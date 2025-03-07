interface Variant {
    id: number;
    sku: string;
    price: number;
    stock: number;
    selectedOptions: VariantSelectOption[];
    images: {
        url: string
    }[]
}

interface VariantSelectOption {
    optionId: number;
    choiceValue: string;
}

interface VariantItem {
    value: string;
    stock: number;
}


interface OptionChoice {
    id: number;
    value: string;
    image?: string | null;
}
interface Option {
    id: number;
    name: string;
    choices: OptionChoice[]
}


interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    currency: 'USD' | 'THB'
    mainImage: string;
    options: Option[]
    variants: Variant[];
}