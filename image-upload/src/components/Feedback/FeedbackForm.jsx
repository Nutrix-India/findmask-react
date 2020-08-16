import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { sendFeedback } from '../../store/actions';
import { getImage } from '../../utils/imageHelper';
import Button from '../Button';
import RoundedIcon from '../RoundedIcon';
import TextBlock from '../Text';
import { isMobileDevice } from '../../utils/deviceHelper';
import { mobile } from '../../constants';

const isMobile = isMobileDevice();

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    flex-wrap: wrap;
  }
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
`;

const Text = styled(TextBlock)`
  color: ${({ theme }) => theme.colors.blueGreen};
  padding-right: 12px;
  font-size: 18px;
`;

const Number = styled(Text)`
  color: ${({ theme }) => theme.colors.black};
  padding: 0px 14px;
`;

const SubmitBtn = styled(Button)`
  padding: 8px 10px;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    margin-left: auto;
  }
`;

const NavBtn = styled.img`
  cursor: pointer;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    width: 16px;
  }
`;

const Option = styled.div`
  @media only screen and (max-width: ${mobile.maxWidth}) {
    display: flex;
  }
`;

const questions = [
  {
    text: 'Number of faces',
    prop: 'faces',
    formProp: 'actual_no_of_faces',
    style: {},
    optionStyle: {}
  },
  {
    text: 'Number of faces with the masks',
    prop: 'faces_with_mask',
    formProp: 'actual_no_of_faces_with_masks',
    style: {
      mobile: {
        flexDirection: 'column'
      }
    },
    optionStyle: {
      mobile: {
        marginTop: '10px'
      }
    }
  }
];

const FeedbackForm = () => {
  const imageDetails = useSelector(({ data }) => data.response.image_details);
  const response = useSelector(({ data }) => data.response);
  const [formQuestions, setFormQuestions] = useState(questions.map(question => ({
    ...question,
    value: imageDetails[question.prop]
  })));
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = formQuestions[questionIndex];
  const setIndex = (offset) => () => {
    setQuestionIndex(index => index + offset);
  };
  const setValue = (offset) => () => {
    setFormQuestions(allQuestions => ({
      ...allQuestions,
      [questionIndex]: {
        ...question,
        value: Math.max(question.value + offset, 0)
      }
    }))
  };
  const dispatch = useDispatch();
  const onSubmit = () => {
    const formObject = Object.keys(formQuestions).reduce((map, _questionIndex) => {
      const _question = formQuestions[_questionIndex];
      return {
        ...map,
        [_question.formProp]: _question.value
      };
    }, {});
    dispatch(sendFeedback({
      image_id: response.image_id,
      feedback: -1,
      ...formObject
    }));
  };
  return (
    <FormContainer>
      {questionIndex !== 0 && <NavBtn src={getImage('/images/prev.svg')} onClick={setIndex(-1)} />}
      <Question style={{...(question.style[isMobile ? 'mobile' : 'desktop'] || {})}}>
        <Text>{question.text}</Text>
        <Option style={{...(question.optionStyle[isMobile ? 'mobile' : 'desktop'] || {})}}>
          <RoundedIcon size={isMobile ? 18 : 20} imgSrc={getImage('/images/minus.svg')} onClick={setValue(-1)} />
          <Number>{question.value}</Number>
          <RoundedIcon size={isMobile ? 18: 20} imgSrc={getImage('/images/plus.svg')} onClick={setValue(1)} />
        </Option>
      </Question>
      {questionIndex !== questions.length - 1 && <NavBtn src={getImage('/images/next.svg')} onClick={setIndex(1)} />}
      {questionIndex === questions.length - 1 && <SubmitBtn label="Submit" onClick={onSubmit} />}
    </FormContainer>
  );
};

export default FeedbackForm;
