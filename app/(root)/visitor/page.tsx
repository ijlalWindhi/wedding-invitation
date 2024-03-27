"use client";
import { useEffect, useState } from "react";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Visitor = () => {
  // state
  const [totalVisitors, setTotalVisitors] = useState<number>(0);
  const [lastVisitor, setLastVisitor] = useState<string>("-");
  const [isReset, setIsReset] = useState<boolean>(false);
  const visitorRef = doc(db, "preview", "visitors");

  // method
  async function updateTotalVisitors() {
    onSnapshot(visitorRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setTotalVisitors(data.total_visitors);
        setLastVisitor(data.last_visitor);
        setIsReset(true);
      }
    });
  }

  // lifecycle
  updateTotalVisitors();
  useEffect(() => {
    if (isReset) {
      setTimeout(() => {
        setDoc(visitorRef, {
          last_visitor: "-", // reset last visitor
          total_visitors: totalVisitors,
          updated_at: new Date().toLocaleString(),
        });
      }, 6000);
    }
  }, [isReset, totalVisitors, visitorRef]);
  return (
    <section className="bg-hero-visitors relative min-h-screen h-full w-full bg-cover bg-no-repeat">
      <div className="flex flex-col w-full h-full min-h-screen items-center justify-center gap-10 z-50 text-white relative">
        <h1 className="font-handwriting text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          Selamat Datang
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
          {lastVisitor}
        </p>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          Total pengunjung:{" "}
          <span className="font-semibold">{totalVisitors}</span>
        </p>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-70 z-10"></div>
    </section>
  );
};

export default Visitor;
