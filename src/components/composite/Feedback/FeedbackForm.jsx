import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { sendFeedback } from '@actions/index';
import { getImage } from '@utils/imageHelper';
import Button from '@base/Button';
import RoundedIcon from '@base/RoundedIcon';
import TextBlock from '@base/Text';
import { Context as MobileContext } from '@contexts/MobileContext';
import { mobile } from '@constants/index';

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
  color: ${({ theme }) => theme.colors.white};
  @media only screen and (max-width: ${mobile.maxWidth}) {
    margin-left: auto;
    font-size: 16px;
  }
`;

const NavBtn = styled.img`
  cursor: pointer;
  @media only screen and (max-width: ${mobile.maxWidth}) {
    width: 16px;
  }
`;

const Option = styled.div`
  display: flex;
`;

const questions = [
  {
    text: 'No. of faces',
    prop: 'faces',
    formProp: 'actual_no_of_faces',
    style: {},
    optionStyle: {}
  },
  {
    text: 'No. of faces with the masks',
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
  },
  {
    text: 'No. of faces with the masks worn improperly',
    prop: 'faces_with_mask_worn_improperly',
    formProp: 'actual_no_of_faces_with_masks_worn_improperly',
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
  const [formQuestions, setFormQuestions] = useState(
    questions.map((question) => ({
      ...question,
      value: imageDetails[question.prop]
    }))
  );
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = formQuestions[questionIndex];
  const setIndex = (offset) => () => {
    setQuestionIndex((index) => index + offset);
  };
  const setValue = (offset) => () => {
    setFormQuestions((allQuestions) => ({
      ...allQuestions,
      [questionIndex]: {
        ...question,
        value: Math.max(question.value + offset, 0)
      }
    }));
  };
  const dispatch = useDispatch();
  const onSubmit = () => {
    const formData = Object.keys(formQuestions).reduce(
      (form, _questionIndex) => {
        // eslint-disable-next-line no-underscore-dangle
        const _question = formQuestions[_questionIndex];
        form.append(_question.formProp, _question.value);
        return form;
      },
      new FormData()
    );
    formData.append('image_id', response.image_id);
    formData.append('feedback', -1);
    dispatch(sendFeedback(formData));
  };

  const isMobile = useContext(MobileContext);

  return (
    <FormContainer>
      {questionIndex !== 0 && (
        <NavBtn src={getImage('/images/prev.svg')} onClick={setIndex(-1)} />
      )}
      <Question
        style={{ ...(question.style[isMobile ? 'mobile' : 'desktop'] || {}) }}
      >
        <Text>{question.text}</Text>
        <Option
          style={{
            ...(question.optionStyle[isMobile ? 'mobile' : 'desktop'] || {})
          }}
        >
          <RoundedIcon
            size={isMobile ? 18 : 20}
            imgSrc={getImage('/images/minus.svg')}
            onClick={setValue(-1)}
          />
          <Number>{question.value}</Number>
          <RoundedIcon
            size={isMobile ? 18 : 20}
            imgSrc={getImage('/images/plus.svg')}
            onClick={setValue(1)}
          />
        </Option>
      </Question>
      {questionIndex !== questions.length - 1 && (
        <NavBtn src={getImage('/images/next.svg')} onClick={setIndex(1)} />
      )}
      {questionIndex === questions.length - 1 && (
        <SubmitBtn label={isMobile ? '\u2713' : 'Submit'} onClick={onSubmit} />
      )}
    </FormContainer>
  );
};

export default FeedbackForm;
