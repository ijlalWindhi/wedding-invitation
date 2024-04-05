"use client";

import QrReader from "@/components/pages/scan/QrReader";
import { useParams } from "next/navigation";
import { getVisitor } from "@/lib/actions/visitor.action";

function ScannerType() {
  // state & variable
  const { type } = useParams();

  //   method
  async function processHandler(data: { data: any }) {
    try {
      const searchParams = new URLSearchParams(data);
      const uuid = searchParams.get("uuid");
      if (uuid) {
        const response = await getVisitor(uuid);
        if (response) {
          alert(
            `Berhasil melakukan ${
              type == "souvenirs" ? "pengambilan suvenir" : "check-in"
            }`
          );
        } else {
          alert("Data tidak ditemukan!");
        }
      } else {
        alert("QR code tidak sesuai!");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main>
      <QrReader
        header={`Pemindai ${type == "souvenirs" ? "Suvenir" : "Tamu"}`}
        processFunction={processHandler}
      />
    </main>
  );
}

export default ScannerType;
