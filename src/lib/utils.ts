import { clsx, type ClassValue } from "clsx"
import { Children } from "react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
const EachElement = <T,>({ of, render }: { of: T[], render: (item: T, index: number) => React.ReactNode }) => Children.toArray(of.map(render));

export const delay = async (duration: number) => new Promise(resolve => setTimeout(resolve, duration));
export const products: Product[] = Array.from({ length: 10 }, (_, index) => {
  return ({
    id: index + 1,
    name: "Men's Sasual T-Shirt",
    description: "Comfortable and stylish t-shirt for everyday wear",
    price: 29.99,
    currency: "USD",
    mainImage: "https://example.com/main-image.jpg",
    options: [
      {
        id: 1, name: "Color",
        choices: [
          { id: 1, value: "Red", "image": "https://example.com/images/red.jpg" },
          { id: 2, value: "Blue", "image": "https://example.com/images/blue.jpg" },
          { id: 3, value: "Green", "image": "https://example.com/images/green.jpg" },
        ]
      },
      {
        "id": 2,
        "name": "Size",
        "choices": [
          {
            "id": 4,
            "value": "S"
          },
          {
            "id": 5,
            "value": "M"
          },
          {
            "id": 6,
            "value": "L"
          }
        ]
      }

    ],
    variants: [
      {
        "id": 1001,
        "sku": "T001-RED-S",
        "price": 29.99,
        "stock": 100,
        "selectedOptions": [
          {
            "optionId": 1,
            "choiceValue": "Red"
          },
          {
            "optionId": 2,
            "choiceValue": "S"
          }
        ],
        "images": [
          {
            "url": "https://example.com/images/red-s.jpg"
          }
        ]
      },
      {
        "id": 1002,
        "sku": "T001-BLUE-M",
        "price": 29.99,
        "stock": 50,
        "selectedOptions": [
          {
            "optionId": 1,
            "choiceValue": "Blue"
          },
          {
            "optionId": 2,
            "choiceValue": "M"
          }
        ],
        "images": [
          {
            "url": "https://example.com/images/blue-m.jpg"
          }
        ]
      }
    ]
  })
});

const dataProduct = {
  "product": {
    "id": 101,
    "name": "Men's Casual T-Shirt",
    "description": "Comfortable and stylish t-shirt for everyday wear",
    "price": 29.99,
    "currency": "USD",
    "main_image": "https://example.com/main-image.jpg",
    "options": [
      {
        "id": 1,
        "name": "Color",
        "choices": [
          {
            "id": 1,
            "value": "Red",
            "image": "https://example.com/images/red.jpg"
          },
          {
            "id": 2,
            "value": "Blue",
            "image": "https://example.com/images/blue.jpg"
          },
          {
            "id": 3,
            "value": "Black",
            "image": "https://example.com/images/black.jpg"
          }
        ]
      },
      {
        "id": 2,
        "name": "Size",
        "choices": [
          {
            "id": 4,
            "value": "S"
          },
          {
            "id": 5,
            "value": "M"
          },
          {
            "id": 6,
            "value": "L"
          }
        ]
      }
    ],
    "variants": [
      {
        "id": 1001,
        "sku": "T001-RED-S",
        "price": 29.99,
        "stock": 100,
        "selected_options": [
          {
            "option_id": 1,
            "choice_value": "Red"
          },
          {
            "option_id": 2,
            "choice_value": "S"
          }
        ],
        "images": [
          {
            "url": "https://example.com/images/red-s.jpg"
          }
        ]
      },
      {
        "id": 1002,
        "sku": "T001-BLUE-M",
        "price": 29.99,
        "stock": 50,
        "selected_options": [
          {
            "option_id": 1,
            "choice_value": "Blue"
          },
          {
            "option_id": 2,
            "choice_value": "M"
          }
        ],
        "images": [
          {
            "url": "https://example.com/images/blue-m.jpg"
          }
        ]
      }
    ]
  }
}
