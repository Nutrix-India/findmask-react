import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { sendFeedback } from '../../store/actions';
import { getImage } from '../../utils/imageHelper';
import Button from '../Button';
import RoundedIcon from '../RoundedIcon';

const FormContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1 1 auto;
`;

const Text = styled.div`
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.colors.blueGreen};
  padding-right: 12px;
`;

const Number = styled(Text)`
  color: ${({ theme }) => theme.colors.black};
  padding: 0px 14px;
`;

const SubmitBtn = styled(Button)`
  padding: 8px 10px;
`;

const NavBtn = styled.img`
  cursor: pointer;
`;

const questions = [
  {
    text: 'Number of faces',
    prop: 'faces',
    formProp: 'actual_no_of_faces'
  },
  {
    text: 'Number of faces with the masks',
    prop: 'faces_with_mask',
    formProp: 'actual_no_of_faces_with_masks'
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
      <Question>
        <Text>{question.text}</Text>
        <RoundedIcon size={20} imgSrc={getImage('/images/minus.svg')} onClick={setValue(-1)} />
        <Number>{question.value}</Number>
        <RoundedIcon size={20} imgSrc={getImage('/images/plus.svg')} onClick={setValue(1)} />
      </Question>
      {questionIndex !== questions.length - 1 && <NavBtn src={getImage('/images/next.svg')} onClick={setIndex(1)} />}
      {questionIndex === questions.length - 1 && <SubmitBtn label="Submit" onClick={onSubmit} />}
    </FormContainer>
  );
};

export default FeedbackForm;
