import styled from "@emotion/styled";
import Editor from "@monaco-editor/react";
import {useCallback, useState} from "react";
import {ConfigProvider, theme} from 'antd';
import {lessToCode} from './utils';
import {Header} from './Header';
import {ColumnResizer, useResizerLeft} from "./ColumnResizer";
import {defaultLess} from "./defaultLess";
import {useThemeMode} from "./ThemeMode";

const introduction = defaultLess;
// const introduction = `// 在此处键入你的 less 变量列表，如：
// @primary-color: #1890ff;
// @success-color: #52c41a;
// `;

const Container  = styled.div`
  display: flex;
`;

const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--editor-background-color);
  color: var(--text-color);
`;

const Content = () =>  {
  const themeMode = useThemeMode();
  const resizerLeft = useResizerLeft();
  const [value = '', setValue] = useState<string | undefined>(introduction);
  const result = lessToCode(value);
  const theme = themeMode === 'dark' ? 'vs-dark' : 'light';

  return (
    <>
      <Header />
      <Container>
        <Editor
          theme={theme}
          width={resizerLeft}
          height="calc(100vh - 30px)"
          defaultLanguage="less"
          loading={<Loading>Loading...</Loading>}
          defaultValue={introduction}
          onChange={setValue}
        />
        <ColumnResizer />
        <Editor
          theme={theme}
          width={window.innerWidth - resizerLeft - 10}
          height="calc(100vh - 30px)"
          defaultLanguage="javascript"
          loading={<Loading>Loading...</Loading>}
          options={{domReadOnly: true, readOnly: true, cursorBlinking: 'solid'}}
          value={result}
        />
      </Container>
    </>
  );
};

const ThemeHolder = styled.div<{mode: 'dark' | 'light'}>`
  ${props => props.mode === 'dark' ? `
  --background-color: #111;
  --editor-background-color: #1e1e1e;
  --text-color: #fff;
  ` : `
  --background-color: #eee;
  --editor-background-color: #fff;
  --text-color: #000;
  `}
`;

const App = () => {
  const themeMode = useThemeMode();
  return (
    <ThemeHolder mode={themeMode}>
      {/* 改成这样会有 bug <ConfigProvider theme={themeMode === 'dark' ? {algorithm: theme.darkAlgorithm} : {}}>*/}
      <ConfigProvider theme={themeMode === 'dark' ? {algorithm: theme.darkAlgorithm} : undefined}>
        <Content></Content>
      </ConfigProvider>
    </ThemeHolder>
  )
};

export default App;
