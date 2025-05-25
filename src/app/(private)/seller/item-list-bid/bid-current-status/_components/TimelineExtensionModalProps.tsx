"use client";
import { useState } from "react";
import { Calendar, Clock, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LockIcon } from "@/icons";

export default function TimelineExtensionModal() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [lockBidPrice, setLockBidPrice] = useState(false);

  return (
    <div
      style={{
        background:
          "linear-gradient(180deg, rgba(77, 168, 218, 0.14) 0%, rgba(120, 192, 168, 0.14) 85.08%)",
      }}
      className="space-y-3 p-4 rounded-lg"
    >
      {/* Date and Time Inputs */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm text-gray-300">
            Date
          </Label>
          <div className="relative">
            <Input
              id="date"
              type="date"
              placeholder="dd/mm/yyyy"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 pr-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="time" className="text-sm text-gray-300">
            Time
          </Label>
          <div className="relative">
            <Input
              id="time"
              type="time"
              placeholder="Enter Time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 pr-10"
            />
          </div>
        </div>
      </div>

      {/* Or Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-600" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-slate-800 px-2 text-gray-400">Or</span>
        </div>
      </div>

      {/* Lock Bid Price Section */}
      <div className="space-y-2">
        <div className="flex justify-center items-center space-x-2 text-white">
          <LockIcon />
          <span className="text-sm">
            Do you want to lock this highest bid price?
          </span>
        </div>
        <div className="flex">
          <div className="flex items-center space-x-2 w-2/3 bg-white/50 px-2 rounded-r-none rounded-md">
            <Checkbox
              id="lock-bid"
              checked={lockBidPrice}
              onCheckedChange={(checked) => setLockBidPrice(checked as boolean)}
              className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label
              htmlFor="lock-bid"
              className="text-sm text-white cursor-pointer"
            >
              Yes, I want to lock this bid price.
            </Label>
          </div>
          <Button style={{ background: "linear-gradient(180deg, rgba(77, 168, 218, 0.40) 0%, rgba(120, 192, 168, 0.40) 85.08%)" }} className="bg-teal-600 hover:bg-teal-700 text-white px-8 rounded-l-none w-1/3">
            Finished
          </Button>
        </div>
      </div>
    </div>
  );
}
