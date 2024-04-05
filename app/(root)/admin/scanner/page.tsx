import { Button } from "@/components/ui/button";
import { ScanLine, ScanFace } from "lucide-react";
import Link from "next/link";

function page() {
  return (
    <main className="flex flex-col gap-6 min-h-screen items-center justify-center h-full w-full p-4 font-poppins text-white">
      <h1 className="font-semibold text-lg text-center">
        Silahkan Pilih Jenis Pemindai Sesuai Kebutuhan
      </h1>
      <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
        <Link href="/admin/scanner/souvenirs">
          <Button>
            Pindai suvenir <ScanLine className="w-5 h-5 ml-2" />
          </Button>
        </Link>
        <Link href="/admin/scanner/visitor">
          <Button>
            Pindai Tamu Datang <ScanFace className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </main>
  );
}

export default page;
