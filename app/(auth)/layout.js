export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-neutral-900 flex items-center flex-col justify-center">
      {children}
    </div>
  );
}
