import React from "react";
import MonacoEditor, { EditorDidMount } from "react-monaco-editor";
import * as monaco from 'monaco-editor';
import { MonacoServices } from "monaco-languageclient";

const MONACO_OPTIONS: monaco.editor.IEditorConstructionOptions = {
    autoIndent: "full",
    automaticLayout: true,
    contextmenu: true,
    fontFamily: "monospace",
    fontSize: 13,
    lineHeight: 24,
    hideCursorInOverviewRuler: true,
    matchBrackets: "always",
    minimap: {
        enabled: false,
    },
    readOnly: false,
    scrollbar: {
        horizontalSliderSize: 4,
        verticalSliderSize: 18,
    },
};

export function Editor() {
    const editorDidMount: EditorDidMount = (editor) => {
        MonacoServices.install(monaco as any);
        if (editor && editor.getModel()) {
            const editorModel = editor.getModel();
            if (editorModel) {
                editorModel.setValue('{\n    "sayHello": "hello"\n}');
            }
        }
        editor.focus();
    };

    const onChange = (newCode: string, event: monaco.editor.IModelContentChangedEvent) => {
        console.log('onChange', newCode);
    };

    return (
        <div>
            <div>
                <h3>Web Editor</h3>
            </div>
            <div>
                <MonacoEditor
                    width="100%"
                    height="80vh"
                    language="json"
                    theme="vs"
                    options={MONACO_OPTIONS}
                    onChange={onChange}
                    editorDidMount={editorDidMount}
                />
            </div>
        </div>
    );
}
