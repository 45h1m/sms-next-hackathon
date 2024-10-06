import Header from "@/components/Header";
import RegForm from "@/components/RegForm";
import { Divide } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
    redirect("/dashboard", "push");
    return <div></div>;
}
