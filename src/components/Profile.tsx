"use client";
import Link from "next/link";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { signOut, useSession } from "next-auth/react";
import { Avatar, User } from "@nextui-org/react";
import { Icons } from "./Icons";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Session } from "next-auth";
import { Button, buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

interface IProps {
  session: any;
}

const Profile = ({ session }: IProps) => {
  console.log(session);

  if (!session)
    return (
      <div className="flex gap-2">
        <Link
          href={process.env.NEXT_PUBLIC_APP_DOMAIN + "/login"}
          className={cn(buttonVariants({ variant: "link" }))}
        >
          Login
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_APP_DOMAIN + "/login"}
          className={cn(buttonVariants())}
        >
          Create an account
        </Link>
      </div>
    );

  return (
    <Dropdown
      showArrow
      radius="sm"
      classNames={{
        base: "p-0 border-small border-divider bg-background",
        arrow: "bg-default-200",
      }}
    >
      <DropdownTrigger>
        <Avatar
          className="cursor-pointer"
          isBordered
          src={session?.user?.image || ""}
          alt="profile-image"
        />
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Custom item styles"
        disabledKeys={["profile"]}
        className="p-3"
        itemClasses={{
          base: [
            "rounded-md",
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        }}
      >
        <DropdownSection aria-label="Profile & Actions" showDivider>
          <DropdownItem
            isReadOnly
            key="profile"
            className="h-14 gap-2 opacity-100"
          >
            <User
              name={session?.user?.name}
              description={"@" + session?.user?.name}
              classNames={{
                name: "text-default-600",
                description: "text-default-500",
              }}
              avatarProps={{
                size: "sm",
                src: session?.user?.image || "",
              }}
            />
          </DropdownItem>
          <DropdownItem key="dashboard">Dashboard</DropdownItem>
          <DropdownItem key="settings">
            <Link href={process.env.NEXT_PUBLIC_APP_DOMAIN! + "/settings"}>
              Settings
            </Link>
          </DropdownItem>
          <DropdownItem
            key="new_post"
            endContent={<Icons.PlusIcon className="text-large" />}
          >
            New Post
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Preferences" showDivider>
          <DropdownItem key="quick_search" shortcut="⌘K">
            Quick search
          </DropdownItem>
          <DropdownItem
            isReadOnly
            key="theme"
            className="cursor-default"
            endContent={<ThemeSwitcher />}
          >
            Theme
          </DropdownItem>
        </DropdownSection>

        <DropdownSection aria-label="Help & Feedback">
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" onClick={() => signOut()}>
            Log Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Profile;
