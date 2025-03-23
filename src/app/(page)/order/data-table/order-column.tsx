import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { OrderStatus, PaymentMethod, PaymentStatus } from "@/enum";
import { Order, ShippingAddress } from "@/typed";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import OrderPaymentMethod from "../components/OrderPayMethod";
import OrderPaymentStatus from "../components/OrderPaymentStatus";
import OrderStatusPage from "../components/OrderStatus";


export const orderColumnDef: ColumnDef<Order>[] = [
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
    accessorKey: "orderDate",
    header: "Order date",
    cell: (cell) => {
      const [client, setClient] = useState(false);
      useEffect(() => {
        setClient(true);
      });
      if (!client) return null;
      const date = new Date(cell.getValue() as string);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      };
      const formattedDate: string = date.toLocaleDateString(undefined, options);
      return formattedDate;
    }
  },
  {
    accessorKey: "payment.paymentMethod",
    header: "Payment Method",
    size: 100,
    cell: (cell) => {
      return <OrderPaymentMethod value={cell.getValue() as PaymentMethod} />;
    }
  },
  {
    accessorKey: "payment.paymentStatus",
    header: "Payment Status",
    size: 100,
    cell: (cell) => {
      return <OrderPaymentStatus value={cell.getValue() as PaymentStatus} />;
    }
  },
  {
    accessorKey: "status",
    header: "Order Status",
    size: 100,
    cell: (cell) => {
      return <OrderStatusPage value={cell.getValue() as OrderStatus} />;
    }
  },
  {
    accessorKey: "shippingAddress",
    header: "Address",
    size: 300,
    cell: ({ getValue }) => {
      const address: ShippingAddress = getValue() as ShippingAddress;
      return address.addressLine1 + " " + address.city + " " + address.postalCode + " " + address.country;

    }
  },
  {
    accessorKey: "id",
    header: "Action",
    size: 1,
    cell: (props) => {
      return <Button asChild><Link href={`/product/${props.getValue()}`} className="text-center items-center flex ">Edit</Link></Button>;
    }
  }
];