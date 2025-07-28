export function Table({ children }) {
  return <table className="min-w-full border">{children}</table>;
}

export function TableHeader({ children }) {
  return <thead className="bg-sneakyBlue text-white">{children}</thead>;
}

export function TableHead({ children, className = "" }) {
  return <th className={`px-4 py-2 border text-left ${className}`}>{children}</th>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children }) {
  return <tr className="hover:bg-gray-100">{children}</tr>;
}

export function TableCell({ children }) {
  return <td className="px-4 py-2 border">{children}</td>;
}
