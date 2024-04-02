"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { handleError } from "@/lib/utils";

export async function getAllVisitor() {
  try {
    const querySnapshot = await getDocs(collection(db, "visitor"));
    const visitors = querySnapshot.docs.map((doc) => doc.data());
    return visitors;
  } catch (error) {
    handleError(error);
  }
}

export async function addVisitor({ data, path, uuid }: AddVisitorProps) {
  try {
    const visitor = await setDoc(doc(db, "visitor", uuid), data);
    await setDoc(doc(db, "visitor_backup", uuid), data);
    revalidatePath(path);
    return visitor;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteVisitor(uuid: string) {
  try {
    await deleteDoc(doc(db, "visitor", uuid));
    await deleteDoc(doc(db, "visitor_backup", uuid));
    revalidatePath("/admin/add-visitor");
  } catch (error) {
    handleError(error);
  }
}