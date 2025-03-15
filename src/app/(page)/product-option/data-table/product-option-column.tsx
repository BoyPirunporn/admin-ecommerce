
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductOption } from "@/typed";




export const productOptionColumnDef: ColumnDef<ProductOption>[] = [
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
      header: "Option name",
    },
    {
      accessorKey: "productOptionValue",
      header: "Option value",
    },
    {
      accessorKey: "id",
      header: "Action",
      cell: (props) => {
        return <Button><Link href={`/product-option/${props.getValue()}`}>Edit</Link></Button>
      }
    }
  ];