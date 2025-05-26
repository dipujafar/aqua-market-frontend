import { Bell } from "lucide-react";
import { Card } from "@/components/ui/card";

const notifications = [
  {
    id: 1,
    message: "Dear Aria, Track your fish from AquaMarket. Link:",
    link: "https://#/",
    timestamp: "Fri, 12:30pm",
  },
  {
    id: 2,
    message: "Dear Aria, Track your fish from AquaMarket. Link:",
    link: "https://#/",
    timestamp: "Fri, 12:30pm",
  },
  {
    id: 3,
    message: "Dear Aria, Track your fish from AquaMarket. Link:",
    link: "https://#/",
    timestamp: "Fri, 12:30pm",
  },
  {
    id: 4,
    message: "Dear Aria, Track your fish from AquaMarket. Link:",
    link: "https://#/",
    timestamp: "Fri, 12:30pm",
  },
  {
    id: 5,
    message: "Dear Aria, Track your fish from AquaMarket. Link:",
    link: "https://#/",
    timestamp: "Fri, 12:30pm",
  },
  {
    id: 6,
    message: "Dear Aria, Track your fish from AquaMarket. Link:",
    link: "https://#/",
    timestamp: "Fri, 12:30pm",
  },
];

export default function NotificationContainer() {
  return (
    <div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            style={{
              background:
                "linear-gradient(104deg, #2E1345 16.28%, #0A2943 100%)",
              boxShadow: "0px 4px 11px 0px rgba(171, 171, 171, 0.11)",
            }}
            key={notification.id}
            className="bg-transparent border-none shadow-none"
          >
            <div className="flex items-start gap-4 p-4 md:p-6">
              <div className="flex-shrink-0">
                <div
                  style={{
                    background:
                      "linear-gradient(180deg, #4DA8DA 0%, #78C0A8 85.08%)",
                  }}
                  className="p-2  rounded "
                >
                  <Bell className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-white text-sm md:text-base leading-relaxed">
                  <span>{notification.message} </span>
                  <a
                    href={notification.link}
                    className="text-teal-300 hover:text-teal-200 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {notification.link}
                  </a>
                </div>
                <div className="text-gray-300 text-xs md:text-sm mt-2">
                  {notification.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
