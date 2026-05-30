import type { Metadata } from "next";
import { LectureContent } from "./LectureContent";

export const metadata: Metadata = {
  title: "Comprendre",
  description: "De petites cartes de lecture pour progresser avec Noxi.",
};

export default function LecturePage() {
  return <LectureContent />;
}
