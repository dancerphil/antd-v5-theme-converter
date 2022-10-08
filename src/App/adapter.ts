import {ThemeConfig} from "antd/es/config-provider/context";
import {ColorPalettes} from "antd/es/theme/interface";

const theme: ThemeConfig = {
  token: {
    blue:''
  }
}

type PresetColorKey = "blue" | "purple" | "cyan" | "green" | "magenta" | "pink" | "red" | "orange" | "yellow" | "volcano" | "geekblue" | "lime" | "gold"
type ColorPaletteKeyIndex = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

const colors: PresetColorKey[] = ["blue", "purple", "cyan", "green", "magenta", "pink", "red", "orange", "yellow", "volcano", "geekblue", "lime", "gold"];

const levels: ColorPaletteKeyIndex[] = [1,2,3,4,5,6,7,8,9,10];

export const colorPalettes = colors.flatMap(color => levels.map((level): keyof ColorPalettes=> `${color}-${level}`));

// 通过配置让用户尽量选择 Seed Token，减少后续维护成本
export const adapter: Record<string, string[]> = {
  // ColorBase
  '@blue-base': ['token', 'blue'],
  '@purple-base': ['token', 'purple'],
  '@cyan-base': ['token', 'cyan'],
  '@green-base': ['token', 'green'],
  '@magenta-base': ['token', 'magenta'],
  '@pink-base': ['token', 'pink'],
  '@red-base': ['token', 'red'],
  '@orange-base': ['token', 'orange'],
  '@yellow-base': ['token', 'yellow'],
  '@volcano-base': ['token', 'volcano'],
  '@geekblue-base': ['token', 'geekblue'],
  '@lime-base': ['token', 'lime'],
  '@gold-base': ['token', 'gold'],
  // Seed
  '@primary-color': ['token', 'colorPrimary'],
  '@success-color': ['token', 'colorSuccess'],
};
