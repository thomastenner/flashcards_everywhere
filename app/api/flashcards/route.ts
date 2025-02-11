import { NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'flashcards',
  host: 'db',
  database: 'flashcardsdb',
  password: 'devpassword',
  port: 5432,
});

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM flashcards ORDER BY id DESC');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch flashcards' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { front, back, folderId } = await request.json();
    const result = await pool.query(
      'INSERT INTO flashcards (front, back, folder_id) VALUES ($1, $2, $3) RETURNING *',
      [front, back, folderId]
    );
    return NextResponse.json(result.rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create flashcard' }, { status: 500 });
  }
}

// app/api/flashcards/[id]/route.ts
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await pool.query('DELETE FROM flashcards WHERE id = $1', [params.id]);
    return NextResponse.json({ message: 'Flashcard deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete flashcard' }, { status: 500 });
  }
}