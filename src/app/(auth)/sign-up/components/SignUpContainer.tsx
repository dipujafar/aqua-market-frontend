import Container from "@/components/shared/Container";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

const userRoleData = [
  {
    _id: 1,
    image: "/userRoleImage1.png",
    title: "Sign Up as a Buyer",
    description:
      "Describe your job, receive quotes, and hire the best professionals in your area!",
  },
  {
    _id: 2,
    image: "/userRoleImage2.png",
    title: "Sign Up as a Seller",
    description:
      "Describe your job, receive quotes, and hire the best professionals in your area!",
  },
];

const SignUpContainer = () => {
  return (
    <Container>
      <Container className="flex flex-col md:flex-row  md:gap-x-8 gap-y-5  ">
        {userRoleData?.map((userData) => (
            <Link href={"#"}>
          <Card
            style={{
              background:
                "linear-gradient(180deg, rgba(77, 168, 218, 0.22) 0%, rgba(120, 192, 168, 0.22) 85.08%)",
                boxShadow: "0px 4px 19px 0px rgba(0, 0, 0, 0.14)"
            }}
            className="flex flex-col gap-y-5 w-full text-center text-white border-none md:px-8 px-4 group"
          >
            <h3 className="text-3xl font-bold">{userData?.title}</h3>
            <p className="text-xl">{userData?.description}</p>
            <div className="relative">
              <Image
                src={userData?.image}
                alt="user_image"
                width={1200}
                height={1200}
              ></Image>
              <div className="absolute top-1/2 left-1/2 -translate-1/2">
                <div className="bg-white group-hover:bg-slate-100   size-20 flex-center rounded-full ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="61"
                    height="61"
                    viewBox="0 0 61 61"
                    fill="none"
                    className="group-hover:rotate-45 duration-500"
                  >
                    <path
                      d="M40.5437 36.3297C40.3054 36.0915 40.155 35.7655 40.155 35.3893L40.155 21.4964L26.262 21.4964C25.5347 21.4964 24.9329 20.8945 24.9329 20.1672C24.9329 19.44 25.5347 18.8381 26.262 18.8381L41.4841 18.8381C42.2113 18.8381 42.8132 19.44 42.8132 20.1672L42.8132 35.3893C42.8132 36.1166 42.2113 36.7185 41.4841 36.7185C41.1205 36.731 40.7819 36.568 40.5437 36.3297Z"
                      fill="black"
                    />
                    <path
                      d="M19.2283 42.4235C18.7142 41.9094 18.7142 41.0568 19.2283 40.5427L40.3311 19.4399C40.8452 18.9258 41.6978 18.9258 42.2119 19.4399C42.726 19.954 42.726 20.8067 42.2119 21.3207L21.1091 42.4235C20.595 42.9376 19.7424 42.9376 19.2283 42.4235Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Card>
          </Link>
        ))}
      </Container>
    </Container>
  );
};

export default SignUpContainer;
