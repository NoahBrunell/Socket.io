import Image from "next/image";
import Socket from "@/components/Socket";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-500">
      <Socket />
    </main>
  );
}
