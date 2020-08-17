import styled from 'styled-components';
import { mobile } from '@constants/index';

const Text = styled.div`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.05rem;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    font-size: 12px;
    line-height: 17px;
  }
`;

export default Text;
