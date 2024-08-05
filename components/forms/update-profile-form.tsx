"use client";

import * as z from "zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RegisterSchema, UpdateSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { MapPinned } from "lucide-react";
import { MapsModal } from "../cards/maps/maps-modal";
import FileUpload from "../file-upload";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { updateUser } from "@/actions/user";
import { useSession } from "next-auth/react";
interface UpdateProfileFormProps {
  initialData: any | null;
}

export const UpdateProfileForm: React.FC<UpdateProfileFormProps> = ({
  initialData,
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const defaultValues = initialData
    ? initialData
    : {
        imgUrl: [],
      };
  const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof UpdateSchema>>({
    resolver: zodResolver(UpdateSchema),
    defaultValues,
  });

  const onSubmit = (values: z.infer<typeof UpdateSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      updateUser(values, session?.user.id!).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  const onConfirm = async () => {};
  return (
    <div className="w-full h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {(!initialData ||
              !initialData.imgUrl ||
              initialData.imgUrl.length === 0) && (
              <FormField
                control={form.control}
                name="imgUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <FileUpload
                        onChange={field.onChange}
                        value={field.value}
                        onRemove={field.onChange}
                        uploadType={"imageUploader"}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full  ">
            Update account
          </Button>
        </form>
      </Form>
    </div>
  );
};
