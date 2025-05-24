"use client"

import { useState } from "react"
import { Calendar, Clock, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TimelineExtensionModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function TimelineExtensionModal({ open = true, onOpenChange }: TimelineExtensionModalProps) {
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const [lockBidPrice, setLockBidPrice] = useState(false)

  const handleFinished = () => {
    // Handle form submission logic here
    console.log({ date, time, lockBidPrice })
    onOpenChange?.(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-center text-white font-normal">Do you want to extend your timeline?</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Date and Time Inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date" className="text-sm text-gray-300">
                Date
              </Label>
              <div className="relative">
                <Input
                  id="date"
                  type="text"
                  placeholder="dd/mm/yyyy"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 pr-10"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-sm text-gray-300">
                Time
              </Label>
              <div className="relative">
                <Input
                  id="time"
                  type="text"
                  placeholder="Enter Time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-gray-400 pr-10"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
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
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <Lock className="h-4 w-4" />
              <span className="text-sm">Do you want to lock this highest bid price?</span>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="lock-bid"
                checked={lockBidPrice}
                onCheckedChange={(checked) => setLockBidPrice(checked as boolean)}
                className="border-slate-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
              />
              <Label htmlFor="lock-bid" className="text-sm text-white cursor-pointer">
                Yes, I want to lock this bid price.
              </Label>
            </div>
          </div>

          {/* Finished Button */}
          <div className="flex justify-end pt-4">
            <Button onClick={handleFinished} className="bg-teal-600 hover:bg-teal-700 text-white px-8">
              Finished
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
