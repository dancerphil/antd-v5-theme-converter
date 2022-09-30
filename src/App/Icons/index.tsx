import Icon from '@ant-design/icons';
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import {ReactComponent as MoonSvg} from './igw-l-moon.svg';
import {ReactComponent as SunSvg} from './igw-l-sun.svg';

type Props = Partial<CustomIconComponentProps>

export const MoonOutlined = (props: Props) => <Icon component={MoonSvg} {...props} />;

export const SunOutlined = (props: Props) => <Icon component={SunSvg} {...props} />;
