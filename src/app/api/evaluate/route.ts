import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const userEmail = formData.get('email') as string;

    if (!file) {
      return NextResponse.json({ error: "Missing file" }, { status: 400 });
    }

    // 将文件转换为 Buffer 以供邮件附件使用
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 发送邮件
    const { data, error } = await resend.emails.send({
      from: 'PhotoBench <onboarding@resend.dev>', // 必须使用这个测试发件人
      to: ['crimsonflag@sjtu.edu.cn'], // 替换为你自己的邮箱
      subject: `[PhotoBench] New Submission from ${userEmail}`,
      text: `User ${userEmail} has submitted a new evaluation file.`,
      attachments: [
        {
          filename: file.name,
          content: buffer,
        },
      ],
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}