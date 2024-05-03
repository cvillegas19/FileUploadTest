import FileUpload from "@/components/FileUpload";
import Image from "next/image";
import Link from "next/link";

const CenteredButton = ({ href, children }) => (
  <Link href={href}>
    <button className="block mx-auto my-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition duration-300">
      {children}
    </button>
  </Link>
);

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <CenteredButton href="/txtFile">TXT File</CenteredButton>
      <CenteredButton href="/docFile">DOC File</CenteredButton>
      <CenteredButton href="/csvFile">CSV File</CenteredButton>
      <CenteredButton href="/xlsFile">XLS File</CenteredButton>
      <CenteredButton href="/textract">Textract</CenteredButton>
    </div>
  );
}
