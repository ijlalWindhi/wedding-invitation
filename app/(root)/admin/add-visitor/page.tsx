"use client";

import { useEffect, useState } from "react";
import { Info, Trash, PlusCircle, Edit2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import ModalAddVisitor from "@/components/pages/add-visitor/ModalVisitor";
import ModalDeleteVisitor from "@/components/pages/add-visitor/ModalDeleteVisitor";
import { getAllVisitor } from "@/lib/actions/visitor.action";
import { numberPagination } from "@/lib/utils";
import { useVisitorStore } from "@/store/visitor";
import Lottie from "react-lottie";
import Loading from "@/public/animation/loading.json";

const AddVisitor = () => {
  // state & variable
  const [visitors, setVisitors] = useState<Visitors>([]);
  const [isGetData, setIsGetData] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState(1);
  const {
    isOpenModal,
    isOpenModalDelete,
    setIsOpenModal,
    setIsOpenModalDelete,
    setSelectedUuidVisitor,
    setSelectedVisitor,
  } = useVisitorStore();
  const itemsPerPage = 15;
  const totalPages = Math.ceil(visitors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // method
  async function fetchAllVisitors() {
    try {
      setIsGetData(true);
      const response = await getAllVisitor();
      setVisitors(
        response?.map((doc) => ({
          uuid: doc.uuid,
          name: doc.name,
          address: doc.address,
          category: doc.category,
          session: doc.session,
          numberOfVisitor: doc.numberOfVisitor,
        })) || []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsGetData(false);
    }
  }
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // lifecycle
  useEffect(() => {
    fetchAllVisitors();
  }, []);

  // UI
  return isGetData ? (
    <div className="flex min-h-screen w-full items-center justify-center relative">
      <div className="absolute bg-yellow-500 opacity-50 w-full h-full top-0 left-0"></div>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: Loading,
        }}
        height={400}
        width={400}
        isClickToPauseDisabled
      />
    </div>
  ) : (
    <main className="text-white p-4 flex flex-col gap-4">
      <ModalAddVisitor fetchAllVisitors={fetchAllVisitors} />
      <ModalDeleteVisitor fetchAllVisitors={fetchAllVisitors} />
      <div className="flex justify-between gap-4 flex-wrap">
        <h1 className="font-semibold text-xl">Data Pengunjung Pernikahan</h1>
        <Button
          onClick={() => {
            setIsOpenModal(!isOpenModal);
          }}
        >
          Tambah
          <PlusCircle className="ml-2 h-4 w-4" />
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead className="w-1/4">Nama</TableHead>
            <TableHead className="w-1/4">Alamat</TableHead>
            <TableHead className="w-1/6">Kategori</TableHead>
            <TableHead>Sesi</TableHead>
            <TableHead>Total Pengunjung</TableHead>
            <TableHead>Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visitors.slice(startIndex, endIndex).map((visitor, index) => (
            <TableRow key={visitor.uuid}>
              <TableCell>
                {numberPagination({ currentPage, itemsPerPage, index })}
              </TableCell>
              <TableCell>{visitor.name}</TableCell>
              <TableCell>{visitor.address}</TableCell>
              <TableCell>{visitor.category}</TableCell>
              <TableCell>{visitor.session}</TableCell>
              <TableCell>{visitor.numberOfVisitor}</TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Edit2
                    className="h-4 w-4"
                    onClick={() => {
                      setIsOpenModal(!isOpenModal);
                      setSelectedVisitor(visitor);
                    }}
                  />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    setIsOpenModalDelete(!isOpenModalDelete);
                    setSelectedUuidVisitor(visitor.uuid);
                  }}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                if (currentPage > 1) {
                  handlePageChange(currentPage - 1);
                }
              }}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  onClick={() => handlePageChange(pageNumber)}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                if (currentPage !== totalPages) {
                  handlePageChange(currentPage + 1);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
};

export default AddVisitor;
