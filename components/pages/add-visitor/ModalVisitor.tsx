"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CustomField } from "@/components/shared/CustomField";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { defaultValues, sessionOptions, categoryOptions } from "@/constants";
import { sessionOptionKey, categoryOptionKey } from "@/lib/utils";
import { setVisitor } from "@/lib/actions/visitor.action";
import { useVisitorStore } from "@/store/visitor";

// form schema
export const formSchema = z.object({
  name: z.string(),
  address: z.string(),
  category: z.string(),
  session: z.string(),
  numberOfVisitor: z.string(),
});

function ModalVisitor({ fetchAllVisitors }: any) {
  // state & variable
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isOpenModal, selectedVisitor, setIsOpenModal, setSelectedVisitor } =
    useVisitorStore();
  const initialValues = selectedVisitor
    ? {
        uuid: selectedVisitor?.uuid,
        name: selectedVisitor?.name,
        address: selectedVisitor?.address,
        category: selectedVisitor?.category,
        session: selectedVisitor?.session,
        numberOfVisitor: selectedVisitor?.numberOfVisitor,
      }
    : defaultValues;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  // method
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      const data = {
        ...values,
        uuid: selectedVisitor.uuid ? selectedVisitor.uuid : uuidv4(),
      };
      await setVisitor({ data, path: "/admin/add-visitor", uuid: data.uuid });
      await fetchAllVisitors();
      handleCloseModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  const handleCloseModal = () => {
    setIsOpenModal(!isOpenModal);
    setSelectedVisitor({} as VisitorData);
    form.reset();
  };

  // lifecycle
  useEffect(() => {
    if (selectedVisitor) {
      form.setValue("name", selectedVisitor.name);
      form.setValue("address", selectedVisitor.address);
      form.setValue("category", selectedVisitor.category);
      form.setValue("session", selectedVisitor.session);
      form.setValue("numberOfVisitor", selectedVisitor.numberOfVisitor);
    }
  }, [selectedVisitor, form]);

  return (
    <Dialog open={isOpenModal} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tambah Tamu</DialogTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CustomField
                control={form.control}
                name="name"
                formLabel="Nama"
                className="w-full"
                render={({ field }) => (
                  <Input {...field} placeholder="Nama Tamu" />
                )}
              />
              <CustomField
                control={form.control}
                name="address"
                formLabel="Alamat"
                className="w-full"
                render={({ field }) => (
                  <Input {...field} placeholder="Alamat Tamu" />
                )}
              />
              <CustomField
                control={form.control}
                name="category"
                formLabel="Kategori"
                className="w-full"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Kategori Tamu" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(categoryOptions).map((key) => (
                        <SelectItem
                          className="!font-poppins"
                          key={key}
                          value={key}
                        >
                          {categoryOptions[key as categoryOptionKey].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <CustomField
                control={form.control}
                name="session"
                formLabel="Sesi"
                className="w-full"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => field.onChange(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih Sesi Tamu" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(sessionOptions).map((key) => (
                        <SelectItem
                          className="!font-poppins"
                          key={key}
                          value={key}
                        >
                          {sessionOptions[key as sessionOptionKey].label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <CustomField
                control={form.control}
                name="numberOfVisitor"
                formLabel="Total Tamu"
                className="w-full"
                render={({ field }) => (
                  <Input {...field} placeholder="Jumlah Tamu" type="number" />
                )}
              />

              <Button
                type="submit"
                className="submit-button capitalize"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Proses..." : "Simpan"}
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalVisitor;
