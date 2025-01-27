export default function InputErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="absolute w-full mt-1 text-xs text-red-600 text-right">
      {message}
    </p>
  );
}
