"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Lottie from "react-lottie";
import { ChevronLeft } from "lucide-react";
import Loading from "@/public/animation/loading.json";
import { getVisitor } from "@/lib/actions/visitor.action";
import { useVisitorStore } from "@/store/visitor";
import { Button } from "@/components/ui/button";
import QrCode from "@/components/pages/detail-visitor/QrCode";

function DetailVisitor() {
  // state & variable
  const [isGetData, setIsGetData] = useState<boolean>(true);
  const [isCopy, setIsCopy] = useState<boolean>(false);
  const { uuid } = useParams();
  const { visitor, setVisitor } = useVisitorStore();

  // method
  async function fetchAllVisitors() {
    try {
      setIsGetData(true);
      const response = await getVisitor(
        typeof uuid === "string" ? uuid : uuid[0]
      );
      setVisitor({
        uuid: response?.uuid,
        name: response?.name,
        address: response?.address,
        category: response?.category,
        session: response?.session,
        numberOfVisitor: response?.numberOfVisitor,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsGetData(false);
    }
  }

  // lifecycle
  useEffect(() => {
    fetchAllVisitors();
  }, []);
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
    <main className="text-white p-4 sm:p-6 md:p-10 flex flex-col gap-4 font-poppins">
      <Link href="/admin/add-visitor" className="flex gap-2 items-center">
        <ChevronLeft className="w-6 h-6" />
        <h1 className="text-white font-semibold text-lg">Kembali</h1>
      </Link>
      <h1 className="text-2xl font-bold">Detail Tamu</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-md font-medium">Nama</h2>
          <p className="border rounded-md p-2">{visitor.name}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-md font-medium">Alamat</h2>
          <p className="border rounded-md p-2">{visitor.address}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-md font-medium">Kategori</h2>
          <p className="border rounded-md p-2">{visitor.category}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-md font-medium">Sesi</h2>
          <p className="border rounded-md p-2">{visitor.session}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-md font-medium">Jumlah Tamu</h2>
          <p className="border rounded-md p-2">{visitor.numberOfVisitor}</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-md font-medium">Tautan Undangan</h2>
          <Button
            onClick={() => {
              setIsCopy(true);
              navigator.clipboard.writeText(
                `${window.location.origin}?name=${encodeURIComponent(
                  visitor.name
                )}`
              );
            }}
          >
            {isCopy ? "Tautan Berhasil Disalin" : "Salin Tautan Undangan"}
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-md font-medium">QR Kode</h2>
          <QrCode
            url={`name=${visitor.name}&uuid=${visitor.uuid}`}
            nameFile={`QrCode_${visitor.name}`}
          />
        </div>
      </div>
    </main>
  );
}

export default DetailVisitor;
