"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Upload, 
  Trash2, 
  Edit, 
  Plus,
  FileText,
  Image,
  Download,
  Save,
  Copy
} from 'lucide-react';
import { useState } from 'react';
import { templates } from '@/lib/templates';

export function TemplateManager() {
  const [customTemplates, setCustomTemplates] = useState<any[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);
  const [editedContent, setEditedContent] = useState('');
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTemplateType, setNewTemplateType] = useState('generic');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleDeleteTemplate = (templateId: string) => {
    setCustomTemplates(prev => prev.filter(t => t.id !== templateId));
  };

  const handleEditTemplate = (templateKey: string, template: any) => {
    setEditingTemplate({ key: templateKey, ...template });
    setEditedContent(template.content);
    setEditedName(template.name);
    setEditedDescription(template.description);
  };

  const handleSaveTemplate = () => {
    if (!editingTemplate) return;
    
    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: editedName,
      description: editedDescription,
      type: editingTemplate.type,
      content: editedContent,
      isCustom: true,
      originalKey: editingTemplate.key
    };
    
    setCustomTemplates(prev => [...prev, newTemplate]);
    setEditingTemplate(null);
    setEditedContent('');
    setEditedName('');
    setEditedDescription('');
  };

  const handleCreateNew = () => {
    setIsCreatingNew(true);
    setEditedName('');
    setEditedDescription('');
    setEditedContent('Dear {name},\n\n{message}\n\nBest regards,\n{sender}');
    setNewTemplateType('generic');
  };

  const handleSaveNewTemplate = () => {
    if (!editedName.trim() || !editedContent.trim()) return;
    
    const newTemplate = {
      id: `custom-${Date.now()}`,
      name: editedName,
      description: editedDescription || 'Custom template',
      type: newTemplateType,
      content: editedContent,
      isCustom: true,
      created: new Date().toISOString()
    };
    
    setCustomTemplates(prev => [...prev, newTemplate]);
    setIsCreatingNew(false);
    setEditedContent('');
    setEditedName('');
    setEditedDescription('');
    setNewTemplateType('generic');
  };

  const handleDownloadTemplate = (template: any, templateKey?: string) => {
    const templateData = {
      name: template.name,
      description: template.description,
      type: template.type,
      content: template.content,
      metadata: {
        created: new Date().toISOString(),
        version: '1.0',
        originalKey: templateKey
      }
    };
    
    const blob = new Blob([JSON.stringify(templateData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}-template.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyTemplate = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const templateTypes = [
    { value: 'generic', label: 'Generic Document' },
    { value: 'birthday', label: 'Birthday Card' },
    { value: 'promotion', label: 'Promotion Notice' },
    { value: 'reward', label: 'Recognition & Rewards' },
    { value: 'overdue', label: 'Overdue Notice' },
    { value: 'email', label: 'Professional Email' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>Template Manager</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
        {/* Upload Section */}
        <div className="space-y-3">
          <h3 className="font-medium">Upload Custom Templates</h3>
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-3">
              Upload DOCX, HTML, or image templates
            </p>
            <input
              type="file"
              multiple
              accept=".docx,.html,.htm,.png,.jpg,.jpeg"
              onChange={handleFileUpload}
              className="hidden"
              id="template-upload"
            />
            <Button asChild>
              <label htmlFor="template-upload" className="cursor-pointer">
                <Plus className="w-4 h-4 mr-2" />
                Select Files
              </label>
            </Button>
          </div>
          
          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-4 h-4" />
                    <span className="text-sm">{file.name}</span>
                    <Badge variant="outline">{file.type}</Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Built-in Templates */}
        <div className="space-y-3">
          <h3 className="font-medium">Built-in Templates</h3>
          <div className="space-y-3">
            {Object.entries(templates).map(([key, template]) => (
              <div key={key} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                  <div>
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-muted-foreground">{template.description}</div>
                  </div>
                  <Badge variant="secondary">Built-in</Badge>
                </div>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditTemplate(key, template)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                  </Dialog>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDownloadTemplate(template, key)}
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleCopyTemplate(template.content)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Templates */}
        {customTemplates.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium">Custom Templates</h3>
            <div className="space-y-3">
              {customTemplates.map((template) => (
                <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-secondary rounded-full" />
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">{template.description}</div>
                    </div>
                    <Badge variant="outline">Custom</Badge>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDownloadTemplate(template)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteTemplate(template.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Template Creation */}
        <div className="space-y-3">
          <h3 className="font-medium">Create New Template</h3>
          <Button 
            className="w-full" 
            variant="outline"
            onClick={handleCreateNew}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Template from Scratch
          </Button>
        </div>
        </CardContent>
      </Card>

      {/* Template Editor Dialog */}
      <Dialog 
        open={!!editingTemplate || isCreatingNew} 
        onOpenChange={() => {
          setEditingTemplate(null);
          setIsCreatingNew(false);
        }}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isCreatingNew ? 'Create New Template' : `Edit Template: ${editingTemplate?.name}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  placeholder={isCreatingNew ? "e.g., Company Newsletter" : "Enter template name"}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-description">Description</Label>
                <Input
                  id="template-description"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  placeholder={isCreatingNew ? "Brief description of template purpose" : "Enter template description"}
                />
              </div>
            </div>
            
            {isCreatingNew && (
              <div className="space-y-2">
                <Label htmlFor="template-type">Template Type</Label>
                <select
                  id="template-type"
                  value={newTemplateType}
                  onChange={(e) => setNewTemplateType(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  {templateTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="template-content">Template Content</Label>
              <div className="text-sm text-muted-foreground mb-2">
                Available placeholders: {'{name}'}, {'{message}'}, {'{date}'}, {'{time}'}, {'{company}'}, {'{sender}'}, {'{age}'}, {'{position}'}, {'{amount}'}
              </div>
              <Textarea
                id="template-content"
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
                placeholder={isCreatingNew ? 
                  "Dear {name},\n\nYour message here...\n\nBest regards,\n{sender}" : 
                  "Enter your template content with placeholders..."
                }
              />
            </div>
            
            {isCreatingNew && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Template Tips:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Use placeholders like {'{name}'}, {'{message}'}, {'{date}'} for dynamic content</li>
                  <li>• Keep formatting simple - use line breaks for paragraphs</li>
                  <li>• Include a clear structure: greeting, body, closing</li>
                  <li>• Test your template with different inputs to ensure it works well</li>
                </ul>
              </div>
            )}
            
            <div className="flex justify-between">
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => handleCopyTemplate(editedContent)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Content
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleDownloadTemplate({
                    name: editedName,
                    description: editedDescription,
                    type: isCreatingNew ? newTemplateType : editingTemplate?.type,
                    content: editedContent
                  })}
                  disabled={!editedName.trim() || !editedContent.trim()}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setEditingTemplate(null);
                    setIsCreatingNew(false);
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={isCreatingNew ? handleSaveNewTemplate : handleSaveTemplate}
                  disabled={!editedName.trim() || !editedContent.trim()}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isCreatingNew ? 'Create Template' : 'Save as Custom Template'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}