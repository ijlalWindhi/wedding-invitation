import { QRCode } from "react-qrcode-logo";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

function QrCode({
  url,
  nameFile,
}: Readonly<{ url: string; nameFile: string }>) {
  // method
  const downloadQRCode = () => {
    const canvas = document.getElementById("QR") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `${nameFile}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  return (
    <div className="flex flex-wrap items-start gap-4">
      <QRCode
        value={url}
        size={230}
        logoImage="https://res.cloudinary.com/dhhyqadco/image/upload/v1712070682/wedding_invitation_sherly_rizki.jpg"
        logoHeight={60}
        logoWidth={60}
        logoOpacity={1}
        logoPadding={1}
        enableCORS={true}
        qrStyle="squares"
        eyeRadius={0}
        id={"QR"}
      />
      <Button onClick={downloadQRCode}>
        <Download className="w-4 h-4 mr-2" />
        Download
      </Button>
    </div>
  );
}

export default QrCode;
