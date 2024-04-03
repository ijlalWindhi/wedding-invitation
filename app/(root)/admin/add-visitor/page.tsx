"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalAddVisitor from "@/components/pages/add-visitor/ModalVisitor";
import ModalDeleteVisitor from "@/components/pages/add-visitor/ModalDeleteVisitor";
import { getAllVisitor } from "@/lib/actions/visitor.action";
import { numberPagination, categoryOptionKey } from "@/lib/utils";
import { useVisitorStore } from "@/store/visitor";
import Lottie from "react-lottie";
import Loading from "@/public/animation/loading.json";
import NoData from "@/public/animation/no_data.json";
import { categoryOptions } from "@/constants";

const AddVisitor = () => {
  // state & variable
  const [isGetData, setIsGetData] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const {
    visitors,
    tmpVisitors,
    isOpenModal,
    isOpenModalDelete,
    setIsOpenModal,
    setIsOpenModalDelete,
    setSelectedUuidVisitor,
    setSelectedVisitor,
    setVisitors,
    setTmpVisitors,
  } = useVisitorStore();
  const itemsPerPage = 10;
  const totalPages = Math.ceil(visitors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // method
  async function fetchAllVisitors() {
    try {
      setIsGetData(true);
      const response = await getAllVisitor();
      const data =
        response
          ?.sort((a, b) => a.name.localeCompare(b.name))
          ?.map((doc) => ({
            uuid: doc.uuid,
            name: doc.name,
            address: doc.address,
            category: doc.category,
            session: doc.session,
            numberOfVisitor: doc.numberOfVisitor,
          })) || [];
      setVisitors(data);
      setTmpVisitors(data);
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
    <main className="text-white p-4 flex flex-col gap-4 font-poppins">
      <ModalAddVisitor fetchAllVisitors={fetchAllVisitors} />
      <ModalDeleteVisitor fetchAllVisitors={fetchAllVisitors} />
      <div className="flex justify-between gap-4 flex-wrap">
        <h1 className="font-semibold text-xl">Data Tamu Pernikahan</h1>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-1/2">
          <Select
            value={selectedCategory}
            onValueChange={(value: string) => {
              setSelectedCategory(value);
              setSearchKeyword("");
              const filterData = tmpVisitors.filter(
                (visitor) =>
                  visitor.category.toLowerCase() === value.toLowerCase() ||
                  value === "Semua"
              );
              setVisitors(filterData);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="bg-secondary border-primary text-white">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="!font-poppins" value="Semua">
                Semua Kategori
              </SelectItem>
              {Object.keys(categoryOptions).map((key) => (
                <SelectItem className="!font-poppins" key={key} value={key}>
                  {categoryOptions[key as categoryOptionKey].label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            value={searchKeyword}
            placeholder="Cari Tamu"
            className="bg-secondary border-primary"
            onChange={(e) => {
              setSearchKeyword(e.target.value);
              setSelectedCategory("");
              const keyword = e.target.value.toLowerCase();
              const filterData = tmpVisitors.filter(
                (visitor) =>
                  visitor.name.toLowerCase().includes(keyword) ||
                  visitor.address.toLowerCase().includes(keyword)
              );
              setVisitors(filterData);
              setCurrentPage(1);
            }}
          />
          <Button
            onClick={() => {
              setIsOpenModal(!isOpenModal);
            }}
          >
            Tambah Tamu
            <PlusCircle className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      <h2 className="font-semibold">
        Total Tamu :{" "}
        {visitors.reduce((acc, cur) => acc + parseInt(cur.numberOfVisitor), 0)}
      </h2>
      {visitors.length === 0 ? (
        <div className="w-full min-h-[85vh] flex items-center md:w-3/4 lg:w-1/2 xl:w-1/4 self-center">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: NoData,
            }}
            isClickToPauseDisabled
          />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead className="w-1/4">Nama</TableHead>
              <TableHead className="w-1/4 min-w-max">Alamat</TableHead>
              <TableHead className="w-1/6">Kategori</TableHead>
              <TableHead>Sesi</TableHead>
              <TableHead>Total Tamu</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visitors.slice(startIndex, endIndex).map((visitor, index) => (
              <TableRow key={visitor.uuid}>
                <TableCell>
                  {numberPagination({ currentPage, itemsPerPage, index })}
                </TableCell>
                <TableCell className="!text-left">{visitor.name}</TableCell>
                <TableCell>{visitor.address}</TableCell>
                <TableCell className="min-w-max w-full">
                  {visitor.category}
                </TableCell>
                <TableCell>{visitor.session}</TableCell>
                <TableCell>{visitor.numberOfVisitor}</TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <Link href={`/admin/add-visitor/${visitor.uuid}`}>
                    <Button variant="outline" size="icon">
                      <Info className="h-4 w-4" />
                    </Button>
                  </Link>
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
      )}
      {totalPages !== 0 && (
        <Pagination>
          <PaginationContent>
            {currentPage !== 1 && (
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => {
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                />
              </PaginationItem>
            )}
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
            {currentPage !== totalPages && (
              <PaginationItem>
                <PaginationNext
                  onClick={() => {
                    if (currentPage !== totalPages) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
};

export default AddVisitor;
