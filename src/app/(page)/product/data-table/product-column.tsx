
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';
import Link from "next/link";
import { Button } from "@/components/ui/button";




export const productColumnDef: ColumnDef<Product>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "mainImage",
    header: "Product Image",
  },
  {
    accessorKey: "price",
    header: "Product Price",
  },
  {
    accessorKey: "productVariants",
    header: "Product Variant",
    cell: (props) => {
      return <p>{(props.getValue() as ProductVariant[]).map(e => e.sku).join(", ")}</p>
    }
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: (props) => {
      return <Button><Link href={`/product/${props.getValue()}`}>Edit</Link></Button>
    }
  }
];