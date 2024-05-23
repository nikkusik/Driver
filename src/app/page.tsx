import Image from "next/image";
import MovingBackground from "./MoovingBackground";

export default function Home() {
  return (
    <main>
      <div className="flex place-content-center h-screen -mt-20">
        <div className="m-auto ">
          <p className="text-6xl text-center">Driver</p>
          <p className="text-xl text-center">Планируйте. Обучайте.</p>
        </div>
        <div className="-z-10">
          <MovingBackground />
        </div>
      </div>
    </main>

  );
}
