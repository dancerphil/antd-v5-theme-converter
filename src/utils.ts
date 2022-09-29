import {format} from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import {ThemeConfig} from "antd/es/config-provider/context";
import {set} from 'lodash';
import {adapter} from './adapter';

const lessToPairs = (less: string): Record<string, string> => {
  const pairs: Record<string, string> = {};
  const lines = less.split(/[;\n]/);
  lines.forEach(line => {
    const segments = line.split(':');
    if(segments[1]) {
      pairs[segments[0]?.trim()] = segments[1]?.trim()
    }
  });
  return pairs;
};

const pairsToTheme = (pairs: Record<string, string>): ThemeConfig => {
  const theme: ThemeConfig = {};
  Object.entries(adapter).forEach(([key, path]) => {
    if(pairs[key]) {
      set(theme, path, pairs[key])
    }
  });
  return theme;
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
  return code;
};
