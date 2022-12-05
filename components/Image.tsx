import Image from "next/image";

interface Props {
  alt: string;
}

const Images = ({ alt }: Props) => {
  return (
    <div>
      <Image src="/img.jpg" alt={alt} height={500} width={800} />
    </div>
  );
};

export default Images;
