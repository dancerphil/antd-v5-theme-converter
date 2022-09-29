import styled from "@emotion/styled";
import Editor from "@monaco-editor/react";
import {useCallback, useState} from "react";
import {lessToCode} from './utils';

const introduction = `// 在此处键入你的 less 变量列表，如：
@primary-color: #1890ff;
@success-color: #52c41a;
`;

const Container  = styled.div`
  display: flex;
  gap: 10px;
  background-color: black;
`;

function App() {
  const [value, setValue] = useState(introduction);
  const handleChange = useCallback(
    (value?: string) => {
      if(value) {
        setValue(value)
      }
    },
    []
  );
  const result = lessToCode(value);
  return (
    <Container>
      <Editor
        theme="vs-dark"
        height="100vh"
        defaultLanguage="less"
        defaultValue={introduction}
        onChange={handleChange}
      />
      <Editor
        theme="vs-dark"
        height="100vh"
        defaultLanguage="less"
        options={{domReadOnly: true, readOnly: true, cursorBlinking: 'solid'}}
        value={result}
      />
    </Container>
  );
}

export default App;
