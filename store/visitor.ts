import { create } from "zustand";

interface IVisitorStore {
  isOpenModal: boolean;
  isOpenModalDelete: boolean;
  selectedUuidVisitor: string;
  selectedVisitor: VisitorData;
  setIsOpenModal: (isOpen: boolean) => void;
  setIsOpenModalDelete: (isOpen: boolean) => void;
  setSelectedUuidVisitor: (uuid: string) => void;
  setSelectedVisitor: (visitor: VisitorData) => void;
}

export const useVisitorStore = create<IVisitorStore>((set) => ({
  isOpenModal: false,
  isOpenModalDelete: false,
  selectedUuidVisitor: "",
  selectedVisitor: {} as VisitorData,
  setIsOpenModal: (isOpen: boolean) => set({ isOpenModal: isOpen }),
  setIsOpenModalDelete: (isOpen: boolean) => set({ isOpenModalDelete: isOpen }),
  setSelectedUuidVisitor: (uuid: string) => set({ selectedUuidVisitor: uuid }),
  setSelectedVisitor: (visitor: VisitorData) =>
    set({ selectedVisitor: visitor }),
}));
