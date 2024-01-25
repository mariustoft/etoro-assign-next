import Convertor from "./components/convertor";
import Portfolio from "./components/portfolio";

// revalidate cache every hour
export const revalidate = 60 * 60;

export default async function Page(props: {
  searchParams: { [key: string]: string };
}) {
  return (
    <main className="w-full h-full flex flex-col items-center justify-center">
      <Portfolio searchParams={props.searchParams} />
      <Convertor searchParams={props.searchParams} />
    </main>
  );
}
