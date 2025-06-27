import React, { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onLanguageChange = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="flex">
      <div className="text-light w-1/2">
        <LanguageSelector
          language={language}
          onLanguageChange={onLanguageChange}
        />
        <Editor
          height="75vh"
          theme="vs-dark"
          language={language}
          defaultValue="// some comment"
          value={value}
          onChange={(value) => setValue(value)}
          onMount={onMount}
        />
      </div>
      <div className="w-1/2 text-light">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditor;