// pages/contact.tsx
export default function Contact() {
  return (
    <main className="px-52 py-32 bg-gray-100 h-screen">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <form className="flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="border p-2 rounded" />
        <input type="email" placeholder="Your Email" className="border p-2 rounded" />
        <textarea placeholder="Your Message" className="border p-2 rounded" rows={4}></textarea>
        <button type="submit" className="px-4 py-2 bg-accent text-white rounded-full">
          Submit
        </button>
      </form>
    </main>
  );
}
