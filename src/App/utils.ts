import {format} from 'prettier/standalone';
import parserBabel from 'prettier/parser-babel';
import {ThemeConfig} from "antd/es/config-provider/context";
import {set} from 'lodash';
import {TinyColor} from '@ctrl/tinycolor';
import {colorPalettes, adapter} from './adapter';

// 增加这个函数的复杂度也只能解决一定的问题，但不能解决所有问题，有必要的时候直接用 less ast 来处理
export const lessToPairs = (less: string): Record<string, string> => {
  const pairs: Record<string, string> = {};
  const lines = less.split(/[;\n]/);
  // 这是另一种处理方法，但是结果上是一致的
  // const lines = less.split('\n');
  // const codeLines = lines.filter(line => line && !line.startsWith('//'));
  // const statements = codeLines.flatMap(line => line.split(';'));
  lines.forEach(statement => {
    const segments = statement.split(':');
    if(segments[1]) {
      pairs[segments[0]?.trim()] = segments[1]?.trim()
    }
  });
  return pairs;
};

const findPairValue = (pairs: Record<string, string>, key: string) => {
  let value = pairs[key];
  while(value?.startsWith('@') && pairs[value]) {
    value = pairs[value]
  }
  return value;
};

export const pairsToTheme = (pairs: Record<string, string>): ThemeConfig => {
  const theme: ThemeConfig = {};
  colorPalettes.forEach(color => {
    const key = `@${color}`;
    const value = findPairValue(pairs, key);
    if(value) {
      set(theme, ['token', color], value)
    }
  });
  Object.entries(adapter).forEach(([key, path]) => {
    const value = findPairValue(pairs, key);
    if(value) {
      set(theme, path, value)
    }
  });
  return theme;
};

const toValidKey = (key: string) => key.includes('-') ? `'${key}'`: key;

// 将 theme object 转成代码
const toNaiveString = (object: object): string => {
  if(typeof object !== 'object') {
    if(new TinyColor(object).isValid) {
      return `'${String(object)}',`
    }
    return `"Not Support: ${object}",`;
  }
  const lines = Object.entries(object).map(([key, value]) => {
    return `${toValidKey(key)}: ${toNaiveString(value)}`
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
  try {
    const pairs = lessToPairs(less);
    const theme = pairsToTheme(pairs);
    const code = themeToCode(theme);
    return code;
  }
  catch (e) {
    return `转换过程中有以下错误：
${e.message}`;
  }
};
