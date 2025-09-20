"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Download, 
  FileText, 
  Mail, 
  Globe, 
  Sheet, 
  File,
  Send,
  Share2
} from 'lucide-react';
import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as XLSX from 'xlsx';

interface ExportOptionsProps {
  content: string;
  documentType: string;
  recipientName: string;
}

export function ExportOptions({ content, documentType, recipientName }: ExportOptionsProps) {
  const [exportFormat, setExportFormat] = useState('html');
  const [emailAddress, setEmailAddress] = useState('');

  const exportFormats = [
    { value: 'html', label: 'HTML Document', icon: Globe, color: 'bg-orange-500' },
    { value: 'pdf', label: 'PDF Document', icon: FileText, color: 'bg-red-500' },
    { value: 'docx', label: 'Word Document', icon: File, color: 'bg-blue-500' },
    { value: 'email', label: 'Email Template', icon: Mail, color: 'bg-green-500' },
    { value: 'csv', label: 'Spreadsheet', icon: Sheet, color: 'bg-emerald-500' }
  ];

  const handleDownload = (format: string) => {
    const fileName = `${documentType}-${recipientName.replace(/\s+/g, '-').toLowerCase()}`;
    
    if (format === 'html') {
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>${documentType} for ${recipientName}</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
        .document { max-width: 800px; margin: 0 auto; }
        .header { border-bottom: 2px solid #333; margin-bottom: 20px; padding-bottom: 10px; }
    </style>
</head>
<body>
    <div class="document">
        <div class="header">
            <h1>${documentType.charAt(0).toUpperCase() + documentType.slice(1)} for ${recipientName}</h1>
        </div>
        <div class="content">
            ${content.replace(/\n/g, '<br>')}
        </div>
    </div>
</body>
</html>`;
      
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.html`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'txt') {
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'pdf') {
      const input = document.getElementById('document-preview'); // Assuming there is a preview element with this id
      if (input) {
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          const imgProps = pdf.getImageProperties(imgData);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${fileName}.pdf`);
        });
      }
    } else if (format === 'docx') {
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: `${documentType.charAt(0).toUpperCase() + documentType.slice(1)} for ${recipientName}`,
                    bold: true,
                    size: 28,
                  }),
                ],
              }),
              new Paragraph({
                children: [new TextRun(content)],
              }),
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${fileName}.docx`;
        a.click();
        URL.revokeObjectURL(url);
      });
    } else if (format === 'csv') {
        const ws = XLSX.utils.aoa_to_sheet([[content]]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Document');
        XLSX.writeFile(wb, `${fileName}.xlsx`);
    }
  };

  const handleEmailSend = () => {
    if (!emailAddress) {
      alert('Please enter an email address');
      return;
    }
    
    const subject = `${documentType} for ${recipientName}`;
    const body = encodeURIComponent(content);
    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="w-5 h-5" />
          <span>Export & Share</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Format Selection */}
        <div className="space-y-3">
          <h3 className="font-medium">Choose Export Format</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {exportFormats.map((format) => {
              const Icon = format.icon;
              return (
                <Button
                  key={format.value}
                  variant={exportFormat === format.value ? "default" : "outline"}
                  className="h-auto p-4 flex-col space-y-2"
                  onClick={() => setExportFormat(format.value)}
                >
                  <div className={`w-8 h-8 rounded-full ${format.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{format.label}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Download Section */}
        <div className="space-y-3">
          <h3 className="font-medium">Download Options</h3>
          <div className="flex space-x-3">
            <Button 
              onClick={() => handleDownload(exportFormat)}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download {exportFormat.toUpperCase()}
            </Button>
            <Button 
              variant="outline"
              onClick={() => handleDownload('txt')}
            >
              <FileText className="w-4 h-4 mr-2" />
              Plain Text
            </Button>
          </div>
        </div>

        {/* Email Section */}
        <div className="space-y-3">
          <h3 className="font-medium">Send via Email</h3>
          <div className="flex space-x-3">
            <input
              type="email"
              placeholder="recipient@example.com"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-md bg-background"
            />
            <Button onClick={handleEmailSend}>
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>
        </div>

        {/* Share Section */}
        <div className="space-y-3">
          <h3 className="font-medium">Share Options</h3>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              <Share2 className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            <Button variant="outline" className="flex-1">
              <Mail className="w-4 h-4 mr-2" />
              Share via Email
            </Button>
          </div>
        </div>

        {/* Statistics */}
        <div className="pt-4 border-t">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{content.length}</div>
              <div className="text-sm text-muted-foreground">Characters</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{content.split(' ').length}</div>
              <div className="text-sm text-muted-foreground">Words</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{content.split('\n').length}</div>
              <div className="text-sm text-muted-foreground">Lines</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}