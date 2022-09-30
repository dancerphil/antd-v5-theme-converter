import {createRegion} from 'region-core';
import {Button} from 'antd';
import {SunOutlined, MoonOutlined} from './Icons';

const themeModeRegion = createRegion<'dark' | 'light'>('dark')

export const useThemeMode = themeModeRegion.useValue;

const toggleThemeMode = () => themeModeRegion.set(value => value === 'light' ? 'dark' : 'light')

export const ThemeMode = () => {
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
