"use client";

import { CardWrapper } from "@/components/cards/users/card-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface UsersCardProps {
    userName?: string;
}

export const UsersCard: React.FC<UsersCardProps> = ({ userName }) => {
  return (
    <CardWrapper headerLabel="Users">
      <div className="flex items-center justify-between p-3">
        <h3>Users</h3>
        <Button className="bg-slate-200 rounded-2xl">
          <p className="text-indigo-600">Sort</p>
        </Button>
      </div>
      <div className="flex justify-between items-center  ">
        <div className="flex w-auto items-center ">
          <div >
            <Image
              width={30}
              height={30}
              alt="Website logo"
              src="https://utfs.io/f/612cf32a-4729-4649-b638-074983d0f3f7-1zbfv.png"
            />
          </div>
          <p className="text-md px-2">{userName}</p>
        </div>
        <div>
          <Button className="rounded-2xl">
              <p className="text-white px-2">
                Locate
                </p>
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
};
