"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Edit3, Copy } from 'lucide-react';
import { useState } from 'react';

interface DocumentPreviewProps {
  content: string;
  documentType: string;
  recipientName: string;
}

export function DocumentPreview({ content, documentType, recipientName }: DocumentPreviewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedContent);
  };

  const getDocumentStyle = () => {
    switch (documentType) {
      case 'birthday':
        return 'border-l-4 border-pink-500 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20';
      case 'promotion':
        return 'border-l-4 border-green-500 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20';
      case 'reward':
        return 'border-l-4 border-yellow-500 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20';
      case 'overdue':
        return 'border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/20 dark:to-rose-950/20';
      default:
        return 'border-l-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Document Preview</span>
            <Badge variant="outline">
              {documentType.charAt(0).toUpperCase() + documentType.slice(1)}
            </Badge>
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="w-4 h-4 mr-1" />
              {isEditing ? 'Preview' : 'Edit'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
            >
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div id="document-preview" className={`p-6 rounded-lg min-h-[400px] ${getDocumentStyle()}`}>
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-96 p-4 rounded-md border bg-background/50 backdrop-blur-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
            />
          ) : (
            <div 
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ 
                __html: editedContent.replace(/\n/g, '<br>') 
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
}