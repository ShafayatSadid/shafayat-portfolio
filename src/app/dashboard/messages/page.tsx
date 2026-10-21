// src/app/dashboard/messages/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getMessages, deleteMessage } from "@/lib/api";
import { Contact } from "@/types/contact";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2, Mail, Calendar, User } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function MessagesListPage() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMessages = async () => {
    try {
      const data = await getMessages();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchMessages();
    })();
  }, []);

  const confirmDelete = async () => {
    if (!messageToDelete) return;
    setIsDeleting(true);
    try {
      await deleteMessage(messageToDelete);
      toast.success("Message deleted successfully");
      setMessages(messages.filter((m) => m._id !== messageToDelete));
    } catch (error) {
      toast.error("Failed to delete message");
    } finally {
      setIsDeleting(false);
      setMessageToDelete(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inbox</h2>
          <p className="text-muted-foreground">Messages sent from your contact form.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex h-40 items-center justify-center rounded-2xl border bg-card">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : messages.length === 0 ? (
        <div className="flex h-40 flex-col items-center justify-center rounded-2xl border bg-card text-muted-foreground">
          <Mail className="mb-4 size-10 text-muted-foreground/30" />
          <p>Your inbox is empty.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg._id} className="flex flex-col rounded-2xl border bg-card p-6 shadow-sm">
              {/* Header */}
              <div className="mb-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {msg.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5 bg-muted/50 px-3 py-1.5 rounded-md">
                    <Calendar className="size-3.5" />
                    {new Date(msg.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="rounded-xl bg-muted/30 p-4 text-sm leading-relaxed text-foreground/90">
                {msg.message}
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-end gap-3">
                <a
                  href={`mailto:${msg.email}?subject=Reply to your message`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Reply via Email
                </a>
                <Button
                  variant="destructive"
                  size="sm"
                  className="rounded-full h-9 px-5 bg-destructive/10 text-destructive hover:bg-destructive hover:text-white"
                  onClick={() => setMessageToDelete(msg._id)}
                >
                  <Trash2 className="mr-2 size-4" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      <AlertDialog open={!!messageToDelete} onOpenChange={(open) => !open && setMessageToDelete(null)}>
        <AlertDialogContent className="rounded-2xl sm:max-w-md">
          <AlertDialogHeader className="gap-5">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10 sm:mx-0">
              <Trash2 className="size-7 text-red-500" />
            </div>
            <div>
              <AlertDialogTitle className="text-xl">Delete Message?</AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-base leading-relaxed">
                Are you sure you want to delete this message? This action cannot be undone.
              </AlertDialogDescription>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-6 gap-3 sm:gap-2">
            <AlertDialogCancel disabled={isDeleting} className="rounded-full px-6">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => { e.preventDefault(); confirmDelete(); }}
              disabled={isDeleting}
              className="rounded-full bg-red-500 px-6 text-white hover:bg-red-600 gap-2"
            >
              {isDeleting ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              {isDeleting ? "Deleting..." : "Yes, Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}