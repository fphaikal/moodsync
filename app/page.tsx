import Image from "next/image";
import { GlareCard } from "@/components/ui/glare-card";

const moodList = [
  {
    title: "Happy",
    link: "happy",
    description: "Feeling happy? Let's keep the good vibes going!",
    image: "/images/happy.jpg",
  },
  {
    title: "Sad",
    link: "sad",
    description: "Feeling sad? Let's listen to some music to lift your spirits!",
    image: "/images/sad.jpg",
  },
  {
    title: "Party",
    link: "party",
    description: "Feeling like partying? Let's listen to some music to keep the party going!",
    image: "/images/party.jpg",
  },
  {
    title: "Chill",
    link: "chill",
    description: "Feeling chill? Let's listen to some music to keep you relaxed!",
    image: "/images/chill.jpg",
  },
  {
    title: "Study",
    link: "study",
    description: "Feeling like studying? Let's listen to some music to keep you focused!",
    image: "/images/study.jpg",
  },
  {
    title: "Sleep",
    link: "sleep",
    description: "Feeling sleepy? Let's listen to some music to help you sleep!",
    image: "/images/sleep.jpg",
  },
]

export default async function Home() {

  return (
    <div className="flex flex-col">
      <div className="flex gap-3 justify-center items-center w-full h-[500px] bg-secondary">
        <div className="flex flex-col gap-3 items-center justify-center">
          <h1 className="text-6xl font-bold">Find Your Perfect Playlist!</h1>
          <p className="text-3xl">Let your mood decide what you listen to.</p>
          <button className="w-fit px-6 py-3 rounded-full mt-4 bg-primary border border-dark hover:scale-105 hover:bg-dark hover:text-light duration-300">
            <a href="/mood" className="font-bold">Get Started</a>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-3 justify-center items-center w-full min-h-screen bg-gradient-to-b from-secondary to-dark">
        <div className="flex flex-col gap-20 items-center justify-center text-light">
          <h1 className="text-4xl font-bold text-dark">Select your mood and let us do the rest</h1>
          <div className="grid grid-cols-3 gap-2 mx-52">
            {moodList.map((mood) => (
              <GlareCard key={mood.title} className="flex items-center justify-between gap-5 px-6 py-6 cursor-pointer text-white">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">{mood.title}</h1>
                  <p className="text-sm">{mood.description}</p>
                </div>
                <div className="w-[150px] h-[150px] relative">
                  <Image src={mood.image} alt={mood.title} className="rounded-3xl" fill objectFit="cover" />
                </div>
              </GlareCard>
            ))}
          </div>
        </div>
      </div>
    </div>

  );
}
