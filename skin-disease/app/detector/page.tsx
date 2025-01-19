'use client'

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import CreateButton from "@/components/shared/CreateButton";
import { FileUpload } from "@/components/ui/file-upload";
import { useRouter } from 'next/navigation';

const userSchema = z.object({
  age: z.number().min(0, "年龄不能为负数"),
  diameter_1: z.number().min(0, "直径1不能为负数"),
  diameter_2: z.number().min(0, "直径2不能为负数"),
  gender: z.enum(["男", "女"], { required_error: "请选择性别" }),
  smoke: z.boolean(),
  drink: z.boolean(),
  region: z.string(), // 假设的地区选项
  grew: z.boolean(),
  changed: z.boolean(),
  pesticide: z.boolean(),
  skin_cancer_history: z.boolean(),
  cancer_history: z.boolean(),
  has_sewage_system: z.boolean(),
  fitspatrick: z.boolean(),
  itch: z.boolean(),
  hurt: z.boolean(),
  bleed: z.boolean(),
  biopsed: z.boolean(),
  has_piped_water: z.boolean(),
});

type UserFormValues = z.infer<typeof userSchema>;

export default function CreateUserForm () {
  const [submitting, setSubmitting] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter()

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      age: 0,
      diameter_1: 0,
      diameter_2: 0,
      gender: "女",
      smoke: false,
      drink: false,
      region: "Region1",
      grew: false,
      changed: false,
      pesticide: false,
      skin_cancer_history: false,
      cancer_history: false,
      has_sewage_system: false,
      fitspatrick: false,
      itch: false,
      hurt: false,
      bleed: false,
      biopsed: false,
      has_piped_water: false,
    },
  });

    const handleFileUpload = (files: File[]) => {
      setFiles(files);
      console.log(files);
    };

    const {handleSubmit} = form;

    const onSubmit = async (data: any) => {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('img', files[0]);
      formData.append('req', JSON.stringify({
        patient_id: data.patient_id || 'a',
        lesion_id: data.lesion_id || 1,
        smoke: data.smoke ? "True" : "False",
        drink: data.drink ? "True" : "False",
        background_father: data.background_father || 't',
        background_mother: data.background_mother || 'e',
        age: data.age || 45,
        pesticide: data.pesticide ? "True" : "False",
        gender: data.gender || 'Female',
        skin_cancer_history: data.skin_cancer_history ? "True" : "False",
        cancer_history: data.cancer_history ? "True" : "False",
        has_piped_water: data.has_piped_water ? "True" : "False",
        has_sewage_system: data.has_sewage_system ? "True" : "False",
        fitspatrick: data.fitspatrick || 1.0,
        region: data.region || 'Region1',
        diameter_1: data.diameter_1 || 2.5,
        diameter_2: data.diameter_2 || 1.8,
        diagnostic: data.diagnostic || 'h',
        itch: data.itch ? "True" : "False",
        grew: data.grew ? "True" : "False",
        hurt: data.hurt ? "True" : "False",
        changed: data.changed ? "True" : "False",
        bleed: data.bleed ? "True" : "False",
        elevation: data.elevation || 'False',
        img_id: files[0]?.name || "9888f424cdd4bce89d5b04b5927556e2.jpg",
        biopsed: data.biopsed ? "True" : "False"
      }));

      // Send POST request
      try {
        const response = await fetch('https://yuanzl.cn:5840/process', {
          method: 'POST',
          body: formData,
        });
        let result = await response.json();
        const queryString = new URLSearchParams({
          result: JSON.stringify(result) // 将 result 转为 JSON 字符串
        }).toString();
        router.push(`show?${queryString}`)
      } catch (error) {
        console.error('Error submitting the form:', error);
      } finally {
        setSubmitting(false);
      }
    };

    return (
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="px-10 py-16">
          <h1 className="text-3xl font-bold text-center text-gray-900">皮肤病信息表单</h1>
          <p className="text-center text-gray-600 pt-3">
            创建一个患者的资料表单
          </p>

          <div className="flex flex-col md:flex-row gap-8 pt-9">
            <FormField
              control={form.control}
              name="age"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">年龄</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="输入年龄"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入患者的年龄。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diameter_1"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">伤口宽度</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="输入伤口宽度"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入染病位置伤口宽度
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diameter_2"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">伤口长度</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="输入伤口长度"
                      value={field.value}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="p-4 border-2 border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 transition-all"
                    />
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    输入染病位置伤口长度
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 pt-8">
            <FormField
              control={form.control}
              name="gender"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">性别</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择性别"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="男">男</SelectItem>
                        <SelectItem value="女">女</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者的性别。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">生长区域</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择地区"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ABDOMEN">腹部</SelectItem>
                        <SelectItem value="ARM">后臂</SelectItem>
                        <SelectItem value="BACK">背部</SelectItem>
                        <SelectItem value="CHEST">胸部</SelectItem>
                        <SelectItem value="EAR">耳朵</SelectItem>
                        <SelectItem value="FACE">脸部</SelectItem>
                        <SelectItem value="FOOT">足部</SelectItem>
                        <SelectItem value="FOREARM">前臂</SelectItem>
                        <SelectItem value="HAND">手部</SelectItem>
                        <SelectItem value="NECK">脖子</SelectItem>
                        <SelectItem value="NOSE">鼻子</SelectItem>
                        <SelectItem value="SCALP">头皮</SelectItem>
                        <SelectItem value="THIGH">大腿</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者疾病的生长区域。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-between gap-3 pt-8 pb-3">
            <FormField
              control={form.control}
              name="fitspatrick"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">费茨帕特里克皮肤类型</FormLabel>
                  <FormControl>
                    <Input/>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    1-6分对紫外线敏感程度（1最敏感，6最不敏感）
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="itch"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">瘙痒</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否有瘙痒"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否有瘙痒。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="smoke"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">吸烟</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否吸烟"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否吸烟。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-8 pt-8">

            <FormField
              control={form.control}
              name="drink"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">饮酒</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否饮酒"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否饮酒。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="grew"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">生长</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否生长"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否持续生长。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="changed"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">变化</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否变化"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否变化。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pesticide"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">农药</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否使用农药"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否使用农药。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="skin_cancer_history"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">皮肤癌史</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否有皮肤癌史"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否有皮肤癌史。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cancer_history"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">癌症史</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否有癌症史"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否有癌症史。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="has_sewage_system"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">有下水道系统</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否有下水道系统"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者家中是否有下水道系统。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="hurt"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">受伤</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否有受伤"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否有受伤。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bleed"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">出血</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否有出血"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否有出血。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="has_piped_water"
              render={({field}) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-bold text-gray-800">有管道供水</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value === 'true')}
                            defaultValue={field.value ? 'true' : 'false'}>
                      <SelectTrigger>
                        <SelectValue placeholder="选择是否有管道供水"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">是</SelectItem>
                        <SelectItem value="false">否</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription className="text-sm text-gray-500">
                    选择患者是否有管道供水。
                  </FormDescription>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </div>
          <div><FileUpload onChange={handleFileUpload} /></div>
          <div className="text-center justify-center flex pt-20">
            <CreateButton
              name={submitting ? '提交患者信息中' : '提交患者信息'}
              type="submit"
            />
          </div>
        </form>
      </FormProvider>
    );
  }
