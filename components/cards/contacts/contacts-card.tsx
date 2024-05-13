"use client";

import { CardWrapper } from "@/components/cards/contacts/card-wrapper";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ContactsCardProps {
  contactName?: string;
}

export const ContactsCard: React.FC<ContactsCardProps> = ({ contactName }) => {
  return (
    <CardWrapper headerLabel="Contacts">
      <div className="flex items-center justify-between p-3">
        <h3>Contacts</h3>
        <Button className="bg-slate-200 rounded-2xl">
          <p className="text-indigo-600">See all</p>
        </Button>
      </div>
      <div>Name</div>
      <div className="flex justify-between items-center  ">
        <div className="flex w-auto ">
          <div className="">
            <Image
              width={20}
              height={20}
              alt="Website logo"
              src="https://utfs.io/f/612cf32a-4729-4649-b638-074983d0f3f7-1zbfv.png"
            />
          </div>
          <p className="text-md px-2">{contactName}</p>
        </div>
        <div>
          <Button className="rounded-2xl">
              <p className="text-white px-2">
                Edit
                </p>
          </Button>
        </div>
      </div>
    </CardWrapper>
  );
};
