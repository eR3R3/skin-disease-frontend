import OpenAI from "openai"
import {NextResponse} from "next/server";

export const POST = async(Content: any) => {

  const content = await Content.json()
  console.log(content)
  const {disease, probability} = content

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
        { role: "system", content: "你是一个乐于助人的助理." },
        {
          role: "user",
          content: `该用户可能的皮肤病类型是: ${disease}, 这个用户可能患有该疾病的概率是: ${probability}. 请根据这个信息给出一些建议, 帮助用户预防和治疗这种疾病，请不要用markdown，用
          最清晰的语言给出建议，对于不同的疾病请给出不同的建议，并且在disease为空的时候给出无疾病的建议。最好能给出药物治疗，饮食建议，生活习惯建议，运动建议，心理建议等。`
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