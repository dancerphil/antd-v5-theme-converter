import {ReactNode} from "react";
import {createRegion} from 'region-core';
import {Button, ConfigProvider, theme} from 'antd';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';
import {SunOutlined, MoonOutlined} from './Icons';
import styled from "@emotion/styled";
import {useTranslateTarget} from "./Translate";

const themeModeRegion = createRegion<'dark' | 'light'>('dark');

export const useThemeMode = themeModeRegion.useValue;

const toggleThemeMode = () => themeModeRegion.set(value => value === 'light' ? 'dark' : 'light');

export const ThemeButton = () => {
    const themeMode = useThemeMode();

    return (
      <Button
        size="small"
        type="text"
        icon={themeMode === 'light' ? <SunOutlined /> : <MoonOutlined/>}
        onClick={toggleThemeMode}
      />
    )
};

const ThemeHolder = styled.div<{mode: 'dark' | 'light'}>`
  ${props => props.mode === 'dark' ? `
    --background-color: #111;
    --editor-background-color: #1e1e1e;
    --text-color: #fff;
    --description-color: #666;
  ` : `
    --background-color: #eee;
    --editor-background-color: #fff;
    --text-color: #000;
    --description-color: #999;
  `}
`;

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({children}: Props) => {
  const themeMode = useThemeMode();
  const translateTarget = useTranslateTarget();
  return (
    <ThemeHolder mode={themeMode}>
      <ConfigProvider
        // 改成这样会有 bug： theme={themeMode === 'dark' ? {algorithm: theme.darkAlgorithm} : {}}
        theme={themeMode === 'dark' ? {algorithm: theme.darkAlgorithm} : undefined}
        locale={translateTarget === 'zh-cn' ? zhCN : enUS}
      >
        {children}
      </ConfigProvider>
    </ThemeHolder>
  )
};
