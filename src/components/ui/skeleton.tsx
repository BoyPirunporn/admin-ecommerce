import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot={"skeleton"} {...props} className="container mt-20 flex gap-x-8 gap-y-16 justify-between flex-wrap animate-pulse ">
      <div className="relative w-full h-[90px] md:h-[150px] lg:h-[200px] xl:h-[250px] mb-5">
        <div className="w-full h-80 bg-gray-100 rounded-md" />
      </div>
      <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="w-full h-80 bg-gray-100 rounded-md" />
        <div className="w-full flex justify-between ">
          <div className="w-36 h-8 bg-gray-100 rounded-md" />
          <div className="w-16 h-8 bg-gray-100 rounded-md  ml-auto" />
          <div className="" />
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-md " />
        <div className="w-1/2 h-4 bg-gray-100 rounded-md " />
        <div className="w-1/2 h-12 bg-gray-100 rounded-2xl " />
      </div>
      <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="w-full h-80 bg-gray-100 rounded-md" />
        <div className="w-full flex justify-between ">
          <div className="w-36 h-8 bg-gray-100 rounded-md" />
          <div className="w-16 h-8 bg-gray-100 rounded-md  ml-auto" />
          <div className="" />
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-md " />
        <div className="w-1/2 h-4 bg-gray-100 rounded-md " />
        <div className="w-1/2 h-12 bg-gray-100 rounded-2xl " />
      </div>
      <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="w-full h-80 bg-gray-100 rounded-md" />
        <div className="w-full flex justify-between ">
          <div className="w-36 h-8 bg-gray-100 rounded-md" />
          <div className="w-16 h-8 bg-gray-100 rounded-md  ml-auto" />
          <div className="" />
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-md " />
        <div className="w-1/2 h-4 bg-gray-100 rounded-md " />
        <div className="w-1/2 h-12 bg-gray-100 rounded-2xl " />
      </div>
      <div className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="w-full h-80 bg-gray-100 rounded-md" />
        <div className="w-full flex justify-between ">
          <div className="w-36 h-8 bg-gray-100 rounded-md" />
          <div className="w-16 h-8 bg-gray-100 rounded-md  ml-auto" />
          <div className="" />
        </div>
        <div className="w-full h-4 bg-gray-100 rounded-md " />
        <div className="w-1/2 h-4 bg-gray-100 rounded-md " />
        <div className="w-1/2 h-12 bg-gray-100 rounded-2xl " />
      </div>
    </div>
  );
}

export { Skeleton };
