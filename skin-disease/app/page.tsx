'use client'

import Image from "next/image";
import {Button} from "@/components/ui/button";
import CreateButton from "@/components/shared/CreateButton";
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter()
  return (
      <div className="h-screen flex flex-col justify-center items-center">
        <div className="flex flex-row w-full justify-center pb-10">
          <p className="text-7xl font-extrabold">皮肤病检测</p>
        </div>
        <div className="flex flex-row w-full justify-center pb-20">
          <CreateButton name="点击进入" type="button" onClick={() => {
            router.push('/detector')
          }}></CreateButton>
        </div>
      </div>

  );
}
