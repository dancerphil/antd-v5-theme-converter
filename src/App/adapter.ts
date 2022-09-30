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

export const adapter: Record<string, string[]> = {
  // ColorBase
  '@blue-base': ['token', 'blue'],
  // Seed
  '@primary-color': ['token', 'colorPrimary'],
  '@success-color': ['token', 'colorSuccess'],
};
