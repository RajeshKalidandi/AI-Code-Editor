import React, { useState, useRef, useEffect } from 'react';
import Editor, { Monaco } from "@monaco-editor/react";
import { Loader2 } from 'lucide-react';
import { getAutocompleteSuggestions, getCodeDiagnostics, formatCode } from '../services/apiService';
import * as monaco from 'monaco-editor';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import * as Y from 'yjs';

interface CodeEditorProps {
  code: string;
  language: string;
  theme: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, theme, onChange }) => {
  const [isEditorReady, setIsEditorReady] = useState(false);
  const editorRef = useRef<any>(null);
  const monacoRef = useRef<Monaco | null>(null);
  const [editorSettings, setEditorSettings] = useState({
    fontSize: 14,
    tabSize: 2,
    wordWrap: 'on',
    lineNumbers: 'on',
    minimap: { enabled: false },
  });
  const ydocRef = useRef<Y.Doc | null>(null);
  const providerRef = useRef<WebsocketProvider | null>(null);

  useEffect(() => {
    const savedSettings = localStorage.getItem('editorSettings');
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);
      setEditorSettings({
        fontSize: parsedSettings.editor.fontSize,
        tabSize: parsedSettings.editor.tabSize,
        wordWrap: parsedSettings.editor.wordWrap,
        lineNumbers: parsedSettings.editor.lineNumbers,
        minimap: { enabled: parsedSettings.editor.minimap },
      });
    }
  }, []);

  useEffect(() => {
    if (editorRef.current && monacoRef.current) {
      const model = editorRef.current.getModel();
      monacoRef.current.editor.setModelLanguage(model, language);
      editorRef.current.updateOptions(editorSettings);
    }
  }, [language, editorSettings]);

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize Yjs document
    ydocRef.current = new Y.Doc();
    const ytext = ydocRef.current.getText('monaco');

    // Set up WebSocket provider
    providerRef.current = new WebsocketProvider('ws://localhost:1234', 'monaco-demo', ydocRef.current);

    // Bind Monaco editor to Yjs
    const binding = new MonacoBinding(ytext, editorRef.current.getModel()!, new Set([editorRef.current]), providerRef.current.awareness);

    return () => {
      binding.destroy();
      providerRef.current?.destroy();
      ydocRef.current?.destroy();
    };
  }, []);

  const handleEditorDidMount = (editor: any, monaco: Monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setIsEditorReady(true);

    // Set up autocompletion
    monaco.languages.registerCompletionItemProvider(language, {
      provideCompletionItems: async (model, position) => {
        const code = model.getValue();
        const cursorPosition = model.getOffsetAt(position);
        const suggestions = await getAutocompleteSuggestions(code, language, cursorPosition);
        
        return {
          suggestions: suggestions.map((item: string) => ({
            label: item,
            kind: monaco.languages.CompletionItemKind.Text,
            insertText: item,
          })),
        };
      },
    });

    // Set up diagnostics
    const updateDiagnostics = async () => {
      const code = editor.getValue();
      const diagnostics = await getCodeDiagnostics(code, language);
      
      const markers = diagnostics.map((diagnostic: any) => ({
        severity: monaco.MarkerSeverity.Error,
        startLineNumber: diagnostic.startLine,
        startColumn: diagnostic.startColumn,
        endLineNumber: diagnostic.endLine,
        endColumn: diagnostic.endColumn,
        message: diagnostic.message,
      }));

      monaco.editor.setModelMarkers(model, 'owner', markers);
    };

    editor.onDidChangeModelContent(updateDiagnostics);
    updateDiagnostics();
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  const handleFormatCode = async () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      const formattedCode = await formatCode(code, language);
      editorRef.current.setValue(formattedCode);
    }
  };

  return (
    <div className="h-full w-full relative">
      {!isEditorReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <Loader2 className="animate-spin text-blue-600" size={48} />
        </div>
      )}
      <Editor
        height="100%"
        language={language}
        value={code}
        theme={theme}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        options={{
          ...editorSettings,
          roundedSelection: false,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          folding: true,
          autoClosingBrackets: 'always',
          autoClosingQuotes: 'always',
          formatOnPaste: true,
          formatOnType: true,
        }}
      />
      <button
        onClick={handleFormatCode}
        className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Format Code
      </button>
    </div>
  );
};

export default CodeEditor;
