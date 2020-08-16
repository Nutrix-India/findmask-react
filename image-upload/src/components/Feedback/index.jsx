import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { sendFeedback } from '../../store/actions';
import { apiStatus } from '../../constants';
import { apiTypes } from '../../store/actionTypes';
import InfoContainer from '../InfoContainer';
import FeedbackForm from './FeedbackForm';

const Text = styled.div`
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.colors.blueGreen};
`;

const FeedbackBtnsContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
`;

const ThumbsUp = <>👍🏼</>;
const ThumbsDown = <>👎🏼</>;

const FeedbackBtn = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const FeedbackBtnText = styled(Text)`
  color: ${({ theme }) => theme.colors.grey};
  margin-right: 5px;
`;

const VRule = styled.div`
  height: 36px;
  width: 2px;
  margin: 0px 20px;
  background-color: ${({ theme }) => theme.colors.paleGreen};
`;

const Sparkle = <>&#x2728;</>;

const ThankUContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Feedback = () => {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const isFeedbackSent = useSelector(
    ({ apiStatus: apiStatuses }) => apiStatuses[apiTypes.SEND_FEEDBACK].status === apiStatus.successful
  );
  const response = useSelector(({ data }) => data.response);
  const onClickYes = () => {
    dispatch(sendFeedback({
      image_id: response.image_id,
      feedback: 1
    }));
  };
  const onClickNo = () => {
    setShowForm(true);
  };
  return (
    <InfoContainer>
      {!showForm && !isFeedbackSent && (
        <>
          <Text>Are you happy with our AI agent’s response?</Text>
          <FeedbackBtnsContainer>
            <FeedbackBtn onClick={onClickYes}>
              <FeedbackBtnText>Yes</FeedbackBtnText>
              {ThumbsUp}
            </FeedbackBtn>
            <VRule />
            <FeedbackBtn onClick={onClickNo}>
              <FeedbackBtnText>No</FeedbackBtnText>
              {ThumbsDown}
            </FeedbackBtn>
          </FeedbackBtnsContainer>
        </>
      )}
      {showForm && !isFeedbackSent && <FeedbackForm />}
      {isFeedbackSent && (
        <ThankUContainer>
          {Sparkle} &nbsp;
          <Text>Thank you for your feedback !</Text>
        </ThankUContainer>
      )}
    </InfoContainer>
  );
};

export default Feedback;
