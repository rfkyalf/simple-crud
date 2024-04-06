import { CreateButton } from "@/components/button";
import ContactTable from "@/components/contact-table";
import Pagination from "@/components/pagination";
import Search from "@/components/search";
import TableSkeleton from "@/components/skeleton";
import { getContactPages } from "@/lib/data";
import { Suspense } from "react";

export default async function Contact({
  searchParams,
}: {
  searchParams: { query?: string; page?: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getContactPages(query);

  return (
    <div className="max-w-screen-md mx-auto mt-5">
      <div className="flex justify-between items-center gap-1 mb-5">
        <Search />
        <CreateButton />
      </div>
      <Suspense key={query + currentPage} fallback={<TableSkeleton />}>
        <ContactTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="flex justify-center mt-4">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
