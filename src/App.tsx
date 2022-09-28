import styled from "@emotion/styled";
import {Input} from 'antd';

const Container  = styled.div`
  display: flex;
  gap: 10px;
`;

function App() {
  return (
    <Container>
      <Input.TextArea />
      <div />
    </Container>
  );
}

export default App;
