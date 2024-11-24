
export default function Footer() {
  return (
    <>
      <footer className="flex gap-5 overflow-hidden p-5 justify-between bg-dark text-white">
        <div className="flex justify-between w-full mx-96">
          <div className="">
            &copy; 2024 MoodSync
          </div>
          <div className="flex items-center gap-2 ">
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
          </div>
        </div>
      </footer>
    </>
  );
}
