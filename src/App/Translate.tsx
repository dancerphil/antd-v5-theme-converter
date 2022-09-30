import {createRegion} from 'region-core';
import {useCallback} from "react";
import {Button} from "antd";
import {MoonOutlined, SunOutlined} from "./Icons";
import {useThemeMode} from "./Theme";

type Target = 'zh-cn' | 'en';

const translateTargetRegion = createRegion<Target>('zh-cn');

export const useTranslateTarget = translateTargetRegion.useValue;

export const toggleTranslateTarget = () => translateTargetRegion.set(value => value === 'zh-cn' ? 'en': 'zh-cn');

const map = {
  'antd v5 主题转换工具': 'antd v5 theme converter',
  '注：暂不支持less函数': 'Note: less functions is not support yet',
  '加载中...': 'Loading...',
  '设置': 'Settings',
  '代码生成逻辑': 'Code Generation Logic',
  '忽略色板变量': 'Ignore Color Palettes',
  '忽略不支持的less函数': 'Ignore Unsupported Less Functions',
  '代码风格': 'Code Style',
  '缩进': 'Indent',
  '行尾逗号': 'Trailing Comma'
};

export const useTranslate = () => {
  const target = useTranslateTarget();
  return useCallback(
    (key: keyof typeof map) => {
      return target === 'en' ? map[key] : key;
    },
    [target]
  );
};


export const TranslateButton = () => {
  const target = useTranslateTarget();

  return (
    <Button
      size="small"
      type="text"
      icon={target === 'zh-cn' ? '中' : 'En'}
      onClick={toggleTranslateTarget}
    />
  )
};
