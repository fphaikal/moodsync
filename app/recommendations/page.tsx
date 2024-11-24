'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PauseCircle, PlayCircle } from "lucide-react"

interface Track {
  id: string;
  name: string;
  album: {
    images: { url: string }[];
    release_date: string;
  };
  artists: { name: string }[];
  preview_url: string | null;
}

interface Data {
  tracks: Track[];
}

// Mapping for mood gradients
const moodGradients: Record<string, string> = {
  happy: "bg-mood-happy",
  sad: "bg-mood-sad",
  party: "bg-mood-party",
  chill: "bg-mood-chill",
  study: "bg-mood-study",
  sleep: "bg-mood-sleep",
};

export default function Recommendations() {
  const searchParams = useSearchParams()

  const [data, setData] = useState<Data | null>(null)
  const [currentTrack, setCurrentTrack] = useState<string | null>(null)
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/playlist?mood=${searchParams.get("mood")}`)
      const data = await response.json()
      setData(data)
    }
    fetchData()
  }, [searchParams])

  const handlePlayPause = (trackId: string, previewUrl: string | null) => {
    if (!previewUrl) return;
    if (!audioPlayer) {
      const audio = new Audio(previewUrl)
      audio.play()
      setAudioPlayer(audio)
      setCurrentTrack(trackId)
    } else if (currentTrack === trackId) {
      audioPlayer?.pause()
      setCurrentTrack(null)
    } else {
      const audio = new Audio(previewUrl)
      audio.play()
      audioPlayer.pause()
      setAudioPlayer(audio)
      setCurrentTrack(trackId)

      audio.onended = () => {
        setCurrentTrack(null)
      }
    }
  }

  const mood = searchParams.get("mood") || "happy"; // Default mood
  const gradientClass = moodGradients[mood] || moodGradients["happy"]; // Fallback to 'happy' if mood is invalid

  return (
    <div className={`flex flex-col min-h-screen ${gradientClass} to-dark`}>
      <div className="flex flex-col gap-10 mx-52 my-10 text-dark">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-5xl">
            Recommendations
          </h1>
          <p className="text-lg">Here are some recommendations based on your mood: {mood} </p>
        </div>

        {data && (
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-fit">#</TableHead>
                <TableHead className="w-[500px]">Title</TableHead>
                <TableHead>Album</TableHead>
                <TableHead>Release Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.tracks.map((track, index) => (
                <TableRow key={index + 1}>
                  <TableCell className="w-fit">
                    {track.preview_url ? (
                      <button
                        className={`px-2 py-2 rounded-full text-white ${currentTrack === track.id ? "bg-red-500" : "bg-green-500"}`}
                        onClick={() => handlePlayPause(track.id, track.preview_url)}
                      >
                        {currentTrack === track.id ? (
                          <PauseCircle size={24} className="" />
                        ) : <PlayCircle size={24} className="" />}
                      </button>
                    ) : (
                      <span className="text-red-500">
                        <button
                          className={`px-2 py-2 rounded-full text-white btn-disabled`}
                        >
                          <PlayCircle size={24} className="" />
                        </button>
                      </span>
                    )}

                  </TableCell>
                  <TableCell className="w-[500px]">
                    <div className="flex gap-5 items-center">
                      <div className="w-[50px] h-[50px] sticky">
                        <Image src={track.album.images[0].url} alt={track.name} className="rounded-lg" fill />
                      </div>
                      <h1 className="font-bold">{track.name}</h1>
                    </div>
                  </TableCell>
                  <TableCell>{track.artists.map((artist) => artist.name).join(", ")}</TableCell>
                  <TableCell>{track.album.release_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
