import OpenAI from "openai"
import {NextResponse} from "next/server";

export const POST = async(Content: any) => {

  const content = await Content.json()
  console.log(content)
  const {disease, prob} = content

  try {
    const openai = new OpenAI(
      {
        apiKey: process.env.QWEN_API_KEY,
        baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1"
      }
    );
    const completion = await openai.chat.completions.create({
      model: "qwen-plus",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `this is the user probable Skin Disease Type: ${disease}, this is the probability that the user will get 
          this disease: ${prob}. Give actual advices to this user`
        }
      ],
    });
    console.log("note created by gpt");
    return NextResponse.json(completion.choices[0].message.content)
  } catch (error) {
    console.log(`错误信息：${error}`);
    console.log("请参考文档：https://help.aliyun.com/zh/model-studio/developer-reference/error-code");
    return NextResponse.json(
      { error: "请求处理失败，请稍后重试。" },
      { status: 500 }
    )
  }
}