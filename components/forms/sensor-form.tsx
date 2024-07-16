import React from "react";
import * as z from "zod";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SensorSchema } from "@/schemas";
import { Button } from "../ui/button";
import { createSensorData } from "@/actions/sensor";

interface SensorFormProps {
  initialData: any | null;
}

type SensorFormValues = z.infer<typeof SensorSchema>;
export const SensorForm: React.FC<SensorFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const defaultValues = initialData
    ? initialData
    : {
        sensorId: "",
        sensorName: "",
        location: "",
      };

  const form = useForm<SensorFormValues>({
    resolver: zodResolver(SensorSchema),
    defaultValues,
  });
  const onSubmit = (values: z.infer<typeof SensorSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      createSensorData(values).then((data) => {
        setError(data?.error);
        if (data?.success) {
          form.reset();
          setSuccess(data?.success);
        }
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <div className="space-y-2">
        <FormField
            control={form.control}
            name="sensorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sensor Id</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter an appropriate Sensor Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sensorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sensor Name</FormLabel>
                <FormControl>
                  <Input
                    disabled={loading}
                    placeholder="Enter an appropriate Sensor Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Enter your location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />

        <Button disabled={loading} className="ml-auto"  type="submit" >
          Continue
        </Button>
      </form>
    </Form>
  );
};
