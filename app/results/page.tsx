// revalidate cache every hour

export default async function Page(props: {
  searchParams: { [key: string]: string };
}) {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      {"hi"}
    </main>
  );
}
