"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useVisitorStore } from "@/store/visitor";
import { deleteVisitor } from "@/lib/actions/visitor.action";

function ModalDeleteVisitor({ fetchAllVisitors }: { fetchAllVisitors: any }) {
  // state & variable
  const { selectedUuidVisitor, isOpenModalDelete, setIsOpenModalDelete } =
    useVisitorStore();
  const [isDelete, setIsDelete] = useState<boolean>(false);

  //   method
  async function handleDeleteVisitor(uuid: string) {
    try {
      setIsDelete(true);
      await deleteVisitor(uuid);
      fetchAllVisitors();
      setIsOpenModalDelete(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDelete(false);
    }
  }
  return (
    <Dialog
      open={isOpenModalDelete}
      onOpenChange={() => setIsOpenModalDelete(false)}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Peringatan</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus data pengunjung ini?
          </DialogDescription>
          <DialogFooter>
            <div className="flex flex-col sm:flex-row gap-2 mt-3">
              <Button
                onClick={() => setIsOpenModalDelete(false)}
                variant={"outline"}
                disabled={isDelete}
              >
                Batal
              </Button>
              <Button
                onClick={() => handleDeleteVisitor(selectedUuidVisitor)}
                disabled={isDelete}
              >
                Hapus
              </Button>
            </div>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default ModalDeleteVisitor;
