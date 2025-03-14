
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';
import Link from "next/link";
import { Button } from "@/components/ui/button";




export const categoryColumnDef: ColumnDef<{
  id: number;
  name: string;
}>[] = [
    {
      id: "select",
      size:20,
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
      header: "Category Name",
      size:200
    },
    {
      accessorKey: "id",
      header: "Action",
      size:1,
      cell: (props) => {
        return <Button asChild><Link href={`/product/${props.getValue()}`} className="text-center items-center flex ">Edit</Link></Button>
      }
    }
  ];