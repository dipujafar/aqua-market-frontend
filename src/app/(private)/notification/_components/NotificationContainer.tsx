"use client";

import * as React from "react";
import {
  Bell,
  MoreHorizontal,
  Trash2,
  Link as LinkIcon,
  CheckCircle2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useDeleteManyNotificationsMutation,
  useDeleteMyNotificationMutation,
  useGetMyNotificationsQuery,
  useNotificationMarkAsReadMutation,
} from "@/redux/api/userApi";
import { UINotification } from "@/types/notification.type";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import PaginationSection from "@/components/shared/PaginationSection";
import { useSearchParams } from "next/navigation";

// -------------------------------------------------------------
// Utilities
// -------------------------------------------------------------
function formatTimestamp(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return iso;
  }
}

function coalesceMessage(n: UINotification) {
  return n.message || n.data?.message || "Notification";
}

function coalesceLink(n: UINotification) {
  return n.link || n.data?.link || null;
}

// -------------------------------------------------------------
// Component
// -------------------------------------------------------------
export default function NotificationContainer() {
  const searchParams = useSearchParams();
  const limit = searchParams.get("limit") || 10;
  const page = searchParams.get("page") || 1;

  const { data, isLoading } = useGetMyNotificationsQuery({
    page,
    limit,
  });
  // console.log("data", data);

  const [deleteNotification, { isLoading: isDeleting }] =
    useDeleteMyNotificationMutation();
  const [deleteManyNotification] = useDeleteManyNotificationsMutation();
  const [markAsRead] = useNotificationMarkAsReadMutation();

  const apiItems: UINotification[] = React.useMemo(() => {
    const raw = data?.data?.data ?? [];
    return raw as UINotification[];
  }, [data]);

  // Local list so UI feels instant (optimistic). Replace with RTK mutations if desired.
  const [items, setItems] = React.useState<UINotification[]>([]);
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    setItems(apiItems);
    setSelected(new Set());
  }, [apiItems]);

  const allChecked = items.length > 0 && selected.size === items.length;
  const someChecked = selected.size > 0 && selected.size < items.length;

  const toggleSelectAll = () => {
    setSelected((prev) => {
      if (prev.size === items.length) return new Set();
      return new Set(items.map((n) => n._id));
    });
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // --- Actions (replace with your RTK Query mutations) ----------------------
  const handleDeleteOne = async (id: string) => {
    if (isDeleting) return;
    try {
      const res = await deleteNotification(id).unwrap();
      // console.log("res__", res);

      if (res.success) {
        toast.success(res.message);
        setItems((list) => list.filter((n) => n._id !== id));
        setSelected((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    } catch (error) {
      console.error("Failed to delete notification:", error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleDeleteSelected = async () => {
    if (selected.size === 0) return;

    const ids = Array.from(selected);

    try {
      const res = await deleteManyNotification(ids).unwrap();

      if (res.success) {
        toast.success(res.message);
        setItems((list) => list.filter((n) => !selected.has(n._id)));
        setSelected(new Set());
      }
    } catch (error) {
      console.error("Failed to delete notifications:", error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleMarkReadToggle = async (id: string) => {
    try {
      const res = await markAsRead({ id, isRead: true }).unwrap();
      if (res.success) {
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Failed to mark notification as read:", error);
      toast.error(getErrorMessage(error));
    }
  };

  // -----------------------------------------------------------
  // Render
  // -----------------------------------------------------------
  return (
    <div id="notification" className="space-y-4">
      {/* Header / Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="size-9 grid place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-cyan-600 text-white shadow-md shadow-indigo-500/20">
              <Bell className="size-5" />
            </div>
          </div>
          <div>
            <h2 className="text-base md:text-lg font-semibold leading-none">
              Notifications
            </h2>
            <p className="text-xs text-muted-foreground">
              {data?.data?.meta?.total} total
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Select All */}
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md border bg-background">
            <Checkbox
              checked={allChecked}
              onCheckedChange={toggleSelectAll}
              className={
                someChecked
                  ? "data-[state=indeterminate]:opacity-100 cursor-pointer"
                  : " cursor-pointer"
              }
              aria-label="Select all notifications"
            />
            <span className="text-sm text-black">Select all</span>
            <Separator orientation="vertical" className="mx-2 h-4" />
            <span className="text-xs text-muted-foreground">
              {selected.size} selected
            </span>
          </div>

          <Button
            variant="destructive"
            size="sm"
            disabled={selected.size === 0}
            onClick={handleDeleteSelected}
            className="gap-2"
          >
            <Trash2 className="size-4" /> Delete selected
          </Button>
        </div>
      </div>

      <div className="p-3 md:p-4 space-y-3">
        {isLoading ? (
          <div className="grid gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-xl bg-muted/60"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <Card className="bg-transparent border-none shadow-none">
            <CardContent className="p-8 text-center text-white/80">
              No notifications yet.
            </CardContent>
          </Card>
        ) : (
          items.map((n) => {
            const message = coalesceMessage(n);
            const link = coalesceLink(n);
            const ts = formatTimestamp(n.createdAt || n.updatedAt);

            return (
              <Card
                key={n._id}
                className="group overflow-hidden border-white/10 bg-gradient-to-br from-[#2E1345] to-[#0A2943] text-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
              >
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-start gap-3 md:gap-4">
                    {/* Checkbox */}
                    <div className="pt-1">
                      <Checkbox
                        checked={selected.has(n._id)}
                        onCheckedChange={() => toggleOne(n._id)}
                        aria-label="Select notification"
                        className="border-white/30 cursor-pointer data-[state=checked]:bg-white data-[state=checked]:text-[#2E1345]"
                      />
                    </div>

                    {/* Icon */}
                    <div className="flex-shrink-0">
                      <div className="grid size-10 place-items-center rounded-lg bg-gradient-to-b from-sky-400 to-emerald-400 text-white shadow-md cursor-pointer">
                        <Bell className="size-5" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2">
                            {!n.isRead && (
                              <Badge
                                variant="secondary"
                                className="bg-white/15 text-white"
                              >
                                New
                              </Badge>
                            )}
                            <span className="text-xs text-white/70">{ts}</span>
                          </div>

                          <p className="text-sm md:text-[15px] leading-relaxed">
                            {message}
                            {link && (
                              <a
                                href={link}
                                target="_blank"
                                rel="noreferrer noopener"
                                className="ml-1 inline-flex items-center gap-1 underline decoration-sky-300/80 underline-offset-4 hover:opacity-90 break-all"
                              >
                                <LinkIcon className="size-3.5" />
                                {link}
                              </a>
                            )}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1.5">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Delete notification"
                            onClick={() => handleDeleteOne(n._id)}
                            className="text-white/80 hover:bg-white/10 hover:text-white cursor-pointer"
                          >
                            <Trash2 className="size-4" />
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                aria-label="More options"
                                className="text-white/80 hover:bg-white/10 hover:text-white"
                              >
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="min-w-44"
                            >
                              <DropdownMenuItem
                                onClick={() => handleMarkReadToggle(n._id)}
                              >
                                <CheckCircle2 className="mr-2 size-4" />
                                {n.isRead ? "Mark as unread" : "Mark as read"}
                              </DropdownMenuItem>
                              {link && (
                                <DropdownMenuItem asChild>
                                  <a
                                    href={link}
                                    target="_blank"
                                    rel="noreferrer noopener"
                                  >
                                    <LinkIcon className="mr-2 size-4" /> Open
                                    link
                                  </a>
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                onClick={() => handleDeleteOne(n._id)}
                              >
                                <Trash2 className="mr-2 size-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
      <PaginationSection
        id="notification"
        setName="page"
        totalItems={data?.data?.meta?.total}
      />
    </div>
  );
}
