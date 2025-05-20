import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const collection = db.collection('feedbacks');

    const result = await collection.insertOne(body);

    return NextResponse.json({ message: 'Feedback submitted', id: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
