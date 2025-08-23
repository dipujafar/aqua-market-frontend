"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ClaimIcon, FilterIcon } from "@/icons";
import { findStatusColor } from "@/utils/findStatusColor";
import { useState } from "react";
import { ClaimSendDialog } from "./ClaimSendDialog";
import PaginationSection from "@/components/shared/PaginationSection";
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";
import Link from "next/link";
import { useGetMyOrdersQuery } from "@/redux/api/userApi";
import { IOrder } from "@/types/order.types";
import moment from "moment";
import ViewOrderItem from "./ViewOrderItem";
import { useSearchParams } from "next/navigation";

const OrderListTable = () => {
  const [openClaimForm, setOpenClaimForm] = useState(false);

  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const limit = Number(searchParams.get("limit") || 10);

  const { data: myOrders } = useGetMyOrdersQuery({ page, limit });
  const orders = myOrders?.data?.data;
  // console.log("myOrders", myOrders?.data);

  return (
    <>
      <div
        id="order-pagination"
        className="md:mb-5 mb-3 flex justify-between items-center"
      >
        <h5 className="md:text-2xl font-light truncate">My Order History</h5>
      </div>
      <div className="col-span-2  rounded-md border md:p-5 px-2 ">
        <Table className="lg:text-lg w-full overflow-x-auto">
          <TableHeader className="  text-white">
            <TableRow className="border-none !text-white hover:bg-transparent">
              <TableHead className="text-white ">Fishes</TableHead>
              <TableHead className="text-white  text-center ">
                Subtotal
              </TableHead>
              <TableHead className="text-white   text-center">
                Quantity
              </TableHead>
              <TableHead className="text-white    text-center">
                Discount
              </TableHead>
              <TableHead className="text-white ">Total</TableHead>
              <StatusHeader />
              <TableHead className="text-white text-center ">Date</TableHead>
              <TableHead className="text-white text-center ">
                DOA Claim
              </TableHead>
              <TableHead className="text-white text-center ">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((data: IOrder) => (
              <TableRow key={data?._id} className="hover:bg-transparent ">
                <TableCell className="font-medium min-w-fit">
                  <ViewOrderItem items={data?.items} />
                </TableCell>
                <TableCell className="text-center ">
                  ${data?.totalPrice?.toFixed(2)}
                </TableCell>
                <TableCell className="text-center ">
                  {data?.items?.length}
                </TableCell>
                <TableCell className="text-center ">{10}%</TableCell>
                <TableCell>
                  $
                  {data?.totalPrice &&
                    (data?.totalPrice * data?.items?.length * (1 - 10 / 100)).toFixed(2)}
                </TableCell>
                <TableCell
                  style={{ color: findStatusColor(data?.status as string) }}
                  className={`capitalize`}
                >
                  {data?.status}
                </TableCell>
                <TableCell className="text-center text-sm">
                  <span>
                    {moment(data?.createdAt).format("MMMM Do YYYY, h:mm A")}
                  </span>
                </TableCell>
                <TableCell
                  onClick={() => setOpenClaimForm(true)}
                  className="text-center text-sm "
                >
                  <ClaimIcon className="w-fit mx-auto cursor-pointer" />
                </TableCell>
                <TableCell className="text-center text-sm ">
                  <Link
                    href={`/user/order-list/1`}
                    className="flex items-center justify-center"
                  >
                    <Eye size={20} />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <PaginationSection
        id="order-pagination"
        className="mt-5"
        setName="page"
        totalItems={myOrders?.data?.meta?.total}
      />

      {/* claim send form dialog */}
      <ClaimSendDialog
        open={openClaimForm}
        setOpen={setOpenClaimForm}
      ></ClaimSendDialog>
    </>
  );
};

export default OrderListTable;

const statuses = [
  {
    name: "Pending",
    color: "#FFD700",
    value: "pending",
  },
  {
    name: "Delivered",
    color: "#78C0A8",
    value: "delivered",
  },
  {
    name: "In Progress",
    color: "#A78BFA",
    value: "in_progress",
  },
  {
    name: "On The Why",
    color: "#60A5FA",
    value: "on_the_why",
  },
  {
    name: "Canceled",
    color: "#F87171",
    value: "canceled",
  },
];

const StatusHeader = () => {
  return (
    <TableHead className="text-white  flex justify-center items-center md:gap-x-2 gap-x-1">
      Status{" "}
      <Select>
        <SelectTrigger
          //  @ts-ignore
          iconShow={false}
          className="p-0 py-0 border-none h-fit mt-0 m-0 cursor-pointer focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          <FilterIcon className="lg:size-3 size-2.5"></FilterIcon>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {statuses?.map((status, idx) => (
              <SelectItem key={idx} value={status?.value}>
                <SelectLabel className="flex items-center gap-x-1">
                  <div
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: status?.color }}
                  ></div>
                  {status?.name}
                </SelectLabel>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </TableHead>
  );
};
