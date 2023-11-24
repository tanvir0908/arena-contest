export default function Button({ buttonText }) {
  return (
    <button className="font-semibold text-white bg-primary px-5 py-3 rounded-xl">
      {buttonText}
    </button>
  );
}
