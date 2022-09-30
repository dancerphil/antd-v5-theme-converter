import styled from "@emotion/styled";
import {ThemeMode} from "./ThemeMode";

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

export const Header = () => {
  return (
    <Container>
      antd v5 theme converter
      <Right>
        <ThemeMode />
        {/*<Button disabled size="small" type="text" icon="}," />*/}
        {/*<Button disabled size="small" type="text" icon="} " />*/}
        {/*<Button disabled size="small" type="text" icon="2" />*/}
        {/*<Button disabled size="small" type="text" icon="4" />*/}
        {/*<Button disabled size="small" type="text" icon={<SettingOutlined />} />*/}
      </Right>
    </Container>
  )
};
