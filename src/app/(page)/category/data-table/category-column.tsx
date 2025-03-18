
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from '@/components/ui/checkbox';
import DropdownAction from "@/components/dropdown-action";
import ImageProvider from "@/providers/ImageProvider";
import { Category } from "@/typed";




export const categoryColumnDef: ColumnDef<Category>[] = [
  {
    id: "select",
    size: 20,
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
    accessorKey: "imageUrl",
    header: "Image",
    cell: ({ row }) => {
      return <div className="relative w-20 h-20">
        <ImageProvider key={row.original.imageUrl as string} src={row.original.imageUrl as string} className="rounded-md" />
      </div>;
    }
  },
  {
    accessorKey: "name",
    header: "Category Name",
    size: 300
  },
  {
    accessorKey: "parent",
    header: "Parent",
    cell: ({ getValue, row, ...props }) => {
      return getValue() === null ? "Main Category" : (getValue() as Category).name;
    }
  },
  {
    accessorKey: "id",
    header: "Action",
    size: 1,
    cell: ({ getValue, row }) => {
      return (
        <DropdownAction
          onDelete={() => onDelete(row.original.id)}
          onEdit={() => onEdit(row.original.id)}
        />
      );
    }
  }
];


const onDelete = async (id: number) => {

};
const onEdit = async (id: number) => {

};