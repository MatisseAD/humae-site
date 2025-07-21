import Image from "next/image";;

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Image src="/assets/logo.png" alt="Humae" width={476} height={239}/>

        <h1 className="text-[var(--humae-violet)]">Bienvenue</h1>
    </div>
  );
}
