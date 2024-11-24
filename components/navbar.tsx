import Link from "next/link"

const navItem = [
  {
    title: "Home",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Contact",
    link: "/contact",
  },
]

export default function Navbar() {
  return (
    <>
      <nav className="flex gap-5 overflow-hidden p-5 justify-between bg-dark border-b border-slate-950 text-white">
        <div className="flex justify-between w-full mx-96">
          <Link href="/" className="flex items-center gap-2 ">
            <svg
              xmlns="http://www.w3.org/
            2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >

              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span className="text-lg font-semibold">MoodSync</span>
          </Link>
          <div className="flex items-center gap-4">
            {navItem.map((item) => (
              <Link key={item.title} href={item.link} className="text-lg font-semibold hover:underline hover:underline-offset-4 duration-500">
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </>
  )
}