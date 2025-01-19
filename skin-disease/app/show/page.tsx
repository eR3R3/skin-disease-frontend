'use client'

import React, {useEffect, useState} from 'react';
import { Textarea } from "@/components/ui/textarea"
import CreateButton from "@/components/shared/CreateButton";
import {useRouter} from "next/navigation";
import { useSearchParams } from 'next/navigation';

const ShowPage = () => {

  const [suggestion, setSuggestion] = useState("")

  const searchParams = useSearchParams();
  const router = useRouter()
  const result = searchParams.get('result');
  const parsedResult = result ? JSON.parse(result) : null;



  useEffect(()=>{
    async function fetchSuggestion() {

      console.log("parsedResult:",parsedResult)
      const suggestion = await fetch("/api/gpt", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(parsedResult)
      }).then(async suggestion => await suggestion.json())

      setSuggestion(suggestion)
    }
    fetchSuggestion()
  }, [searchParams])

  return (
    <div className="h-screen flex flex-col justify-center w-screen">
      <div className="flex flex-row w-full justify-center pb-10">
        <p className="text-7xl font-extrabold">结果展示</p>
      </div>
      <p className="pl-12 font-extrabold text-3xl">你有{parsedResult.probability}的概率已经患有{parsedResult.disease}</p>
      <div className="w-full px-12">
        <Textarea
          onChange={(e: any)=>{setSuggestion(e.target.value)}}
          value={suggestion}
          placeholder="this will be the generated answer"
          className="h-96 w-full border-4 border-black"
        />
      </div>
      <div className="flex flex-row w-full justify-center pt-20">
        <CreateButton name="返回" type="button" onClick={() => {
          router.push('/detector')
        }}></CreateButton>
      </div>
    </div>
  );
};

export default ShowPage;
