import Button from "@/components/Button";
import Link from "next/link";

const page = () => {
    return (
        <div className="p-4 ">
            <div>
                <h1 className="text-white py-4 text-xl">Dashboard</h1>
            </div>
            <div className="row flex gap-4 flex-wrap">
                <div className=" student-section bg-emerald-700 p-4 rounded-xl flex flex-col gap-4">
                    <h2 className="text-white">Student Section</h2>
                    <div className="flex gap-4">
                        <Link href="/register">
                            <Button customClass={"text-white bg-emerald-800"}>Register Student</Button>
                        </Link>
                        <Link href="/allstudents">
                            <Button customClass={"text-white bg-emerald-800"}>All Student</Button>
                        </Link>
                    </div>
                </div>
                <div className="opacity-30 student-section bg-emerald-700 p-4 rounded-xl flex flex-col gap-4">
                    <h2 className="text-white">Other Section</h2>
                    <div className="flex gap-4">
                        <Link href="/register">
                            <Button customClass={"text-white bg-emerald-800"}>Button</Button>
                        </Link>
                        <Link href="/allstudents">
                            <Button customClass={"text-white bg-emerald-800"}>Button</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;
