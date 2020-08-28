import styled from 'styled-components';
import { mobile } from '@constants/index';

const InfoContainer = styled.div`
  border: 5px solid ${({ theme }) => theme.colors.paleGreen};
  border-radius: 5px;
  margin: auto;
  padding: 16px 44px;
  height: 84px;
  width: 894px;
  display: flex;
  align-items: center;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    width: 85%;
    border-width: 2px;
    padding: 8px 16px;
    height: 56px;
  }
`;

export default InfoContainer;
