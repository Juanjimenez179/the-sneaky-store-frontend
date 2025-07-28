export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`bg-sneakyPink text-white px-4 py-2 rounded-md hover:bg-pink-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}