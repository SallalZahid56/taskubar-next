import Image from "next/image";

export default function LeftImage() {
  return (
    <div className="w-full md:w-1/2 hidden md:block">
      <Image
        src="/assets/login-signup.jpg"
        alt="Service request illustration"
        width={800}
        height={600}
        className="w-full h-full object-cover"
        priority
      />
    </div>
  );
}
