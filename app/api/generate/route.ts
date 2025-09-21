
import { NextRequest, NextResponse } from 'next/server';
import { templates } from '@/lib/templates';
import { generateLlmContent, classifyDocumentType } from '@/lib/llm';
import { generateDocumentContent, extractPlaceholders } from '@/lib/content-generator';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, recipientName, message } = body;

    if (!prompt || !recipientName) {
      return NextResponse.json({ error: 'Prompt and recipient name are required' }, { status: 400 });
    }

    // 1. Classify document type from prompt
    const documentType = await classifyDocumentType(prompt);

    // 2. Select the appropriate template
    const template = templates[documentType as keyof typeof templates] || templates.generic;

    // 3. Generate content using LLM
    let generatedContent = await generateLlmContent(template, {
      name: recipientName,
      message,
    });

    // 4. Fallback to static content generation if LLM fails
    if (!generatedContent) {
      const placeholders = extractPlaceholders(prompt, recipientName, message);
      generatedContent = generateDocumentContent(template, placeholders);
    }

    // 5. Return the generated content and document type
    return NextResponse.json({
      documentType,
      generatedContent,
    });
  } catch (error) {
    console.error('Error generating document:', error);
    return NextResponse.json({ error: 'Failed to generate document' }, { status: 500 });
  }
}
