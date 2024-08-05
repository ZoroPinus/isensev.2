"use client";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { startTransition, useEffect, useState } from "react";
import { EditSensorForm } from "../forms/edit-sensor-form";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { deleteUser } from "@/actions/user";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  username,
  onClose,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const deleteUserHandler = (username: any) => {
    startTransition(() => {
      deleteUser(username).then((data) => {
        setError(data?.error);
        if (data?.success) {
          setSuccess(data?.success);
        }
      });
    });
  };

  return (
    <Modal
      title="Are you sure you want to delete the user?"
      description=""
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex justify-between py-4">
        <Button
          className="bg-red-500 rouned-lg w-1/2 mr-3"
          onClick={() => deleteUserHandler(username)}
        >
          Yes
        </Button>
        <Button
          className="border-black rouned-lg w-1/2 ml-3"
          onClick={() => onClose()}
        >
          No
        </Button>
      </div>
      <FormError message={error} />
      <FormSuccess message={success} />
    </Modal>
  );
};
