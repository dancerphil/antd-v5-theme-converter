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

interface OptionsPairsToTheme {
  ignoreColorPalettes: boolean
}

export const pairsToTheme = (pairs: Record<string, string>, options?: OptionsPairsToTheme): ThemeConfig => {
  const {ignoreColorPalettes} = options ?? {};
  const theme: ThemeConfig = {};
  if (!ignoreColorPalettes) {
    colorPalettes.forEach(color => {
      const key = `@${color}`;
      const value = findPairValue(pairs, key);
      if (value) {
        set(theme, ['token', color], value)
      }
    });
  }
  Object.entries(adapter).forEach(([key, path]) => {
    const value = findPairValue(pairs, key);
    if(value) {
      set(theme, path, value)
    }
  });
  return theme;
};

interface Options {
  ignoreUnsupportedLessFunctions: boolean
}

const toValidKey = (key: string) => key.includes('-') ? `'${key}'`: key;

// 将 theme object 转成代码
const toNaiveString = (object: object, options?: Options): string => {
  const {ignoreUnsupportedLessFunctions} = options ?? {};
  const lines = Object.entries(object).map(([key, value]) => {
    if(typeof value === 'object') {
      return `${toValidKey(key)}: ${toNaiveString(value, options)}`
    }

    const isValid = new TinyColor(value).isValid;
    const validValue = isValid ? `'${String(value)}',` : `"Not Support: ${value}",`;
    if (ignoreUnsupportedLessFunctions && !isValid) {
      return '';
    }
    return `${toValidKey(key)}: ${validValue}`
  }).filter(Boolean);

  return [`{`, ...lines, `},`].join('\n');
};

const toNaiveCode = (theme: ThemeConfig, options?: Options): string => {
  return `const theme = ${toNaiveString(theme, options).slice(0, -1)};`
};

interface OptionsThemeToCode extends Options {
  tabWidth: number,
  trailingComma: 'none' | 'es5' | 'all'
}

export const themeToCode = (theme: ThemeConfig, options?: OptionsThemeToCode) => {
  const {tabWidth = 2, trailingComma = 'es5', ignoreUnsupportedLessFunctions = false} = options ?? {}
  return format(toNaiveCode(theme, {ignoreUnsupportedLessFunctions}), {
    parser: 'babel',
    plugins: [parserBabel],
    singleQuote: true,
    tabWidth,
    trailingComma,
  });
};
