
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product, ProductVariant } from "@/typed";




export const productColumnDef: ColumnDef<Product>[] = [
  {
    id: "select",
    size: 50,
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
    accessorKey: "mainImage",
    header: "Product Image",
    cell: ({ row }) => {
      const url = `${process.env.NEXT_PUBLIC_DOMAIN_IMAGE!}/${row.getValue("mainImage")}`;
      console.log(url);
      return (
        <div className="relative w-18 h-18">
          <Image src={url} fill alt="" className="object-fill rounded-sm" />
        </div>
      );
    }
  },
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey:"category",
    header: "Category"
  },
 
  {
    accessorKey: "price",
    header: "Product Price",
  },
  {
    accessorKey: "productVariants",
    header: "Product Variant",
    cell: (props) => {
      return <p>{(props.getValue() as ProductVariant[]).map(e => e.sku).join(", ")}</p>;
    }
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: (props) => {
      return <Button><Link href={`/product/${props.getValue()}?update=true`}>Edit</Link></Button>;
    }
  }
];