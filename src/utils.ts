import {format} from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import {ThemeConfig} from "antd/es/config-provider/context";

const lessToPairs = (less: string): Record<string, string> => {
  return {}
};

const pairsToTheme = (pairs: Record<string, string>): ThemeConfig => {
  // TODO import adapter
  return {token: {colorPrimary: '#1890ff', colorSuccess: '#52c41a'}}
};

// 将 theme object 转成代码
const toNaiveString = (object: object): string => {
  if(typeof object !== 'object') {
    return `'${String(object)}',`
  }
  const lines = Object.entries(object).map(([key, value]) => {
    return `${key}: ${toNaiveString(value)}`
  });

  return [`{`, ...lines, `},`].join('\n');
};

const toNaiveCode = (theme: ThemeConfig): string => {
  return `const theme = ${toNaiveString(theme).slice(0, -1)};`
};

const themeToCode = (theme: ThemeConfig) => {
  return format(toNaiveCode(theme), {
    parser: 'babel',
    plugins: [parserBabel],
    tabWidth: 2,
    singleQuote: true,
  });
};

export const lessToCode = (less: string): string => {
  const pairs = lessToPairs(less);
  const theme = pairsToTheme(pairs);
  const code = themeToCode(theme);
  return code
};
