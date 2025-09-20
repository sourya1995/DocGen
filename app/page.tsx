"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ThemeProvider } from 'next-themes';
import { ThemeToggle } from '@/components/theme-toggle';
import { DocumentPreview } from '@/components/document-preview';
import { TemplateManager } from '@/components/template-manager';
import { ExportOptions } from '@/components/export-options';
import { FileText, Sparkles, Download, Settings, Upload, Mail, Calendar, Trophy, AlertCircle, FileType } from 'lucide-react';
import { generateDocumentContent, detectDocumentType, extractPlaceholders } from '@/lib/content-generator';
import { templates } from '@/lib/templates';

type TemplateKey = keyof typeof templates;

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [exportFormat, setExportFormat] = useState('html');

  const handleGenerate = async () => {
    if (!prompt.trim() || !recipientName.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // Detect document type from prompt
      const detectedType = detectDocumentType(prompt) as TemplateKey;
      setDocumentType(detectedType);
      
      // Extract additional details from prompt
      const placeholders = extractPlaceholders(prompt, recipientName, message);
      
      // Find appropriate template
      const template = templates[detectedType] || templates.generic;
      setSelectedTemplate(detectedType);
      
      // Generate content
      const content = generateDocumentContent(template, placeholders);
      setGeneratedContent(content);
      
    } catch (error) {
      console.error('Generation failed:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const getDocumentTypeIcon = (type: string) => {
    switch (type) {
      case 'birthday': return <Calendar className="w-4 h-4" />;
      case 'promotion': return <Trophy className="w-4 h-4" />;
      case 'reward': return <Sparkles className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getDocumentTypeColor = (type: string) => {
    switch (type) {
      case 'birthday': return 'bg-pink-500';
      case 'promotion': return 'bg-green-500';
      case 'reward': return 'bg-yellow-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/50">
        <div className="container mx-auto p-6 max-w-7xl">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary rounded-lg">
                <FileText className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Document Generator</h1>
                <p className="text-muted-foreground">AI-powered document creation with smart templates</p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Input Panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5" />
                    <span>Generate Document</span>
                  </CardTitle>
                  <CardDescription>
                    Describe what you want to create, and AI will generate the perfect document
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Document Description</Label>
                    <Textarea
                      id="prompt"
                      placeholder="e.g., Generate a birthday card for John with message Happy 30th Birthday!"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Recipient Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter recipient's name"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Message (Optional)</Label>
                      <Input
                        id="message"
                        placeholder="Any specific message to include"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>
                  </div>

                  {documentType && (
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        {getDocumentTypeIcon(documentType)}
                        <span>Detected: {documentType.charAt(0).toUpperCase() + documentType.slice(1)}</span>
                      </Badge>
                    </div>
                  )}

                  <Button 
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || !recipientName.trim() || isGenerating}
                    className="w-full"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" />
                        Generate Document
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Templates */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileType className="w-5 h-5" />
                    <span>Quick Templates</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(templates).map(([key, template]) => (
                    <Button
                      key={key}
                      variant="outline"
                      className="w-full justify-start space-x-2 h-auto p-4"
                      onClick={() => {
                        setDocumentType(key);
                        setSelectedTemplate(key);
                        setPrompt(`Generate a ${key} for ${recipientName || '[Name]'}`);
                      }}
                    >
                      <div className={`w-3 h-3 rounded-full ${getDocumentTypeColor(key)}`} />
                      <div className="text-left">
                        <div className="font-medium">{template.name}</div>
                        <div className="text-sm text-muted-foreground">{template.description}</div>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Preview and Export */}
          {generatedContent && (
            <div className="mt-6">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="export">Export</TabsTrigger>
                  <TabsTrigger value="templates">Templates</TabsTrigger>
                </TabsList>
                
                <TabsContent value="preview">
                  <DocumentPreview 
                    content={generatedContent}
                    documentType={documentType}
                    recipientName={recipientName}
                  />
                </TabsContent>
                
                <TabsContent value="export">
                  <ExportOptions 
                    content={generatedContent}
                    documentType={documentType}
                    recipientName={recipientName}
                  />
                </TabsContent>
                
                <TabsContent value="templates">
                  <TemplateManager />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </ThemeProvider>
  );
}