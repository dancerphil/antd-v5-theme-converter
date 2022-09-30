import styled from "@emotion/styled";
import {ThemeButton} from "./Theme";
import {useTranslate, TranslateButton} from './Translate';
import {SettingsButton} from "./Settings";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 3px 0 20px;
  height: 30px;
  background-color: var(--editor-background-color);
  color: var(--text-color);
`;

const Right = styled.div`
  display: flex;
  gap: 3px;
`;

const Note = styled.span`
  margin-left: 10px;
  font-size: 12px;
  color: var(--description-color);
`;

export const Header = () => {
  const t = useTranslate();
  return (
    <Container>
      <div>
        {t('antd v5 主题转换工具')}
        <Note>{t('注：暂不支持less函数')}</Note>
      </div>
      <Right>
        <TranslateButton />
        <ThemeButton />
        <SettingsButton />
      </Right>
    </Container>
  )
};
