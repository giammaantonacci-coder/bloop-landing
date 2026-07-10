import { Nav } from "@/components/Nav";
import { NotFound404 } from "@/components/NotFound404";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative z-10 overflow-hidden">
        <NotFound404 />
      </main>
    </>
  );
}
