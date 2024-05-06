"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/cards/header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
};

export const CardWrapper = ({
  children,
  headerLabel,
}: CardWrapperProps) => {
  return (
    <Card className="w-auto px-3 shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
