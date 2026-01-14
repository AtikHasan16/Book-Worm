"use client";
import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  Video,
  Tags,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Button } from "@heroui/react";

const SideNav = () => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Manage Books", icon: BookOpen, href: "/dashboard/manage-book" },
    { name: "Manage Genres", icon: Tags, href: "/dashboard/manage-genres" },
    { name: "Manage Users", icon: Users, href: "/dashboard/manage-users" },
    {
      name: "Moderate Reviews",
      icon: MessageSquare,
      href: "/dashboard/moderate",
    },
    {
      name: "Manage Tutorials",
      icon: Video,
      href: "/dashboard/manage-tutorials",
    },
  ];

  return (
    <aside className="hidden w-64 flex-col border-r bg-bookNavy md:flex">
      <div className="flex h-20 items-center justify-center border-b px-8">
        <Link href="/">
          <div className="flex items-center gap-2 text-paper">
            <BookOpen className="h-8 w-8 text-paper" />
            <h1 className="font-fraunses text-2xl font-bold text-paper">
              BookWorm
            </h1>
          </div>
        </Link>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="space-y-6">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-400">
              Admin Menu
            </p>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-paper transition-colors hover:bg-paper/10 hover:text-paper"
                >
                  <item.icon size={20} />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="mt-auto pt-6 border-t">
            <Button
              onPress={() => signOut({ callbackUrl: "/login" })}
              className="flex items-center gap-3 text-rose-300 hover:text-rose-300 font-bold hover:bg-gray-800 bg-transparent border border-gray-800"
            >
              <LogOut size={20} />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default SideNav;
