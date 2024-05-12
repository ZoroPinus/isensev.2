"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

interface CardWrapperProps {
  children: React.ReactNode;
}

export const CardWrapper = ({ children }: CardWrapperProps) => {
  return (
    <Card className="w-auto shadow-md ">
      <CardContent className="pb-0 p-4">{children}</CardContent>
    </Card>
  );
};
