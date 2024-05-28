"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
// import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { useSession } from "next-auth/react";
import io from "socket.io-client";
const ContactsPage = () => {
  const { data: session, status } = useSession();
  const socket = io("http://192.168.0.100:8080");

  useEffect(() => {
    socket.on("connect",()=>{
      console.log(socket.id)
    })
  
    return () => {
      socket.disconnect()
    }
  }, [])
  
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi Welcome back Admin!👋
          </h2>
        </div>
      </div>
    </ScrollArea>
  );
};
export default ContactsPage;
