import Link from "next/link";

const Header = () => {
  return (
    <div className="flex justify-between">
      <Link href="/">
        <p className="text-2xl text-green-500">Home</p>
      </Link>

      <Link href="/about">
        <p className="text-2xl text-green-500">About</p>
      </Link>
    </div>
  );
};

export default Header;
