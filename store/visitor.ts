import { create } from "zustand";

interface IVisitorStore {
  visitor: VisitorData;
  visitors: VisitorData[];
  tmpVisitors: VisitorData[];
  isOpenModal: boolean;
  isOpenModalDelete: boolean;
  selectedUuidVisitor: string;
  selectedVisitor: VisitorData;
  setIsOpenModal: (isOpen: boolean) => void;
  setIsOpenModalDelete: (isOpen: boolean) => void;
  setSelectedUuidVisitor: (uuid: string) => void;
  setSelectedVisitor: (visitor: VisitorData) => void;
  setVisitors: (visitors: VisitorData[]) => void;
  setTmpVisitors: (visitors: VisitorData[]) => void;
  setVisitor: (visitor: VisitorData) => void;
}

export const useVisitorStore = create<IVisitorStore>((set) => ({
  visitor: {} as VisitorData,
  visitors: [],
  tmpVisitors: [],
  isOpenModal: false,
  isOpenModalDelete: false,
  selectedUuidVisitor: "",
  selectedVisitor: {} as VisitorData,
  setIsOpenModal: (isOpen: boolean) => set({ isOpenModal: isOpen }),
  setIsOpenModalDelete: (isOpen: boolean) => set({ isOpenModalDelete: isOpen }),
  setSelectedUuidVisitor: (uuid: string) => set({ selectedUuidVisitor: uuid }),
  setSelectedVisitor: (visitor: VisitorData) =>
    set({ selectedVisitor: visitor }),
  setVisitors: (visitors: VisitorData[]) => set({ visitors: visitors }),
  setTmpVisitors: (visitors: VisitorData[]) => set({ tmpVisitors: visitors }),
  setVisitor: (visitor: VisitorData) => set({ visitor: visitor }),
}));
