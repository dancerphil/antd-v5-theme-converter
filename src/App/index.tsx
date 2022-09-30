import styled from "@emotion/styled";
import Editor from "@monaco-editor/react";
import {useMemo, useState} from "react";
import {lessToPairs, pairsToTheme, themeToCode} from './utils';
import {Header} from './Header';
import {ColumnResizer, useResizerLeft} from "./ColumnResizer";
import {defaultLess} from "./defaultLess";
import {useThemeMode, ThemeProvider} from "./Theme";
import {useTranslate} from "./Translate";
import {useIgnoreColorPalettes, useIgnoreUnsupportedLessFunctions, useTabWidth, useTrailingComma} from "./Settings";

const introduction = defaultLess;

const Content  = styled.div`
  display: flex;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  background-color: var(--editor-background-color);
  color: var(--description-color);
`;

const Loading = () => {
  const t = useTranslate();
  return <LoadingContainer>{t('加载中...')}</LoadingContainer>
};

const useCodeResult = (less: string) => {
  const ignoreColorPalettes = useIgnoreColorPalettes();
  const ignoreUnsupportedLessFunctions = useIgnoreUnsupportedLessFunctions();
  const tabWidth = useTabWidth();
  const trailingComma = useTrailingComma();
  return useMemo(
    () => {
      try {
        const pairs = lessToPairs(less);
        const theme = pairsToTheme(pairs, {ignoreColorPalettes});
        const code = themeToCode(theme, {ignoreUnsupportedLessFunctions, tabWidth, trailingComma});
        return code;
      }
      catch (e) {
        return `转换过程中有以下错误：
${e.message}`;
      }
    },
    [less, ignoreColorPalettes, ignoreUnsupportedLessFunctions, tabWidth, trailingComma]
  );
};

const App = () =>  {
  const themeMode = useThemeMode();
  const resizerLeft = useResizerLeft();
  const [value = '', setValue] = useState<string | undefined>(introduction);
  const codeResult = useCodeResult(value);
  const theme = themeMode === 'dark' ? 'vs-dark' : 'light';

  return (
    <ThemeProvider>
      <Header />
      <Content>
        <Editor
          theme={theme}
          width={resizerLeft}
          height="calc(100vh - 30px)"
          defaultLanguage="less"
          loading={<Loading />}
          value={value}
          onChange={setValue}
        />
        <ColumnResizer />
        <Editor
          theme={theme}
          width={window.innerWidth - resizerLeft - 10}
          height="calc(100vh - 30px)"
          defaultLanguage="javascript"
          loading={<Loading />}
          // options.tabSize 不 react，或许可以通过 instance 设置？
          options={{domReadOnly: true, readOnly: true, cursorBlinking: 'solid'}}
          value={codeResult}
        />
      </Content>
    </ThemeProvider>
  );
};

export default App;
