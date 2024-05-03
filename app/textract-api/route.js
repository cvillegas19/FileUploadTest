import AWS from "aws-sdk";
import { NextResponse } from "next/server";

AWS.config.update({
  region: "us-east-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const textract = new AWS.Textract();

export async function POST(request) {
  try {
    const body = await request.json()
    console.log(body.filename)

    if (!body.filename) {
      return new NextResponse(JSON.stringify({ error: 'Filename is required' }), { status: 400 });
    }

    const params = {
      Document: {
        S3Object: {
          Bucket: 'test-textract2024',
          Name: body.filename
        }
      },
      FeatureTypes: ['TABLES', 'FORMS']
    }

    // Convert callback-based call to a promise
    const result = await textract.analyzeDocument(params).promise();
    return new NextResponse(JSON.stringify({ data: result }), { status: 200 });
    
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
