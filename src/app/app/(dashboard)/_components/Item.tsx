import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { FC } from "react";

interface ItemProps {
  name: string;
  icon: LucideIcon;
  onClick?: () => void;
  href?: string;
  className?: string;
  active: boolean;
}

const Item = ({
  name,
  className,
  href,
  onClick,
  icon: Icon,
  active,
}: ItemProps) => {
  return (
    <Button
      className={cn("w-full justify-start gap-2", active && "bg-accent")}
      variant={"ghost"}
    >
      <Icon className="mr-2 h-[18px] w-[18px] shrink-0 text-muted-foreground" />
      {name}
    </Button>
  );
};

export default Item;
