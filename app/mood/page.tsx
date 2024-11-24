'use client'
import { GlareCard } from "@/components/ui/glare-card";
import Image from 'next/image';

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

export default function MoodSelection() {
  const handleMoodSelected = (mood: string) => {
    fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ mood }),
    });
  }

  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center h-screen bg-gradient-to-b from-accent to-dark">
        <h1 className="text-4xl font-bold mb-6">What&apos;s Your Mood?</h1>
        <div className="grid grid-cols-2 gap-4">
          {moodList && moodList.map((mood) => (
            <a key={mood.link} href={`/recommendations?mood=${mood.link}`} onClick={() => handleMoodSelected(mood.title)} className='cursor-pointer '>
              <GlareCard key={mood.link} className="flex items-center justify-between gap-5 px-6 py-6 cursor-pointer text-white">
                <div className="flex flex-col gap-2">
                  <h1 className="text-2xl font-bold">{mood.title}</h1>
                  <p className="text-sm">{mood.description}</p>
                </div>
                <div className="w-[150px] h-[150px] relative">
                  <Image src={mood.image} alt={mood.title} className="rounded-3xl" fill objectFit="cover" />
                </div>
              </GlareCard>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
