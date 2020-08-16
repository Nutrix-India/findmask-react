import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '../../store/actions';
import { apiTypes } from '../../store/actionTypes';
import { apiStatus } from '../../constants';
import { pluralizeText } from '../../utils/textHelper';
import InfoContainer from '../InfoContainer';

const StatsContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Stat = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0;
  right: 0;
  margin: auto;
  transition: top 500ms ease, opacity 500ms ease-out;
`;

const StatText = styled.div`
  padding-left: 10px;
  font-size: 20px;
  line-height: 20px;
  letter-spacing: 0.05rem;
  color: ${({ theme }) => theme.colors.blueGreen};
`;

const initialStatStyle = {
  top: '100%',
  opacity: 0
};

const currentStatStyle = {
  top: '8px',
  opacity: 1,
  // bottom: '0'
};

const prevStatStyle = {
  top: '-100%',
  opacity: 0
};

const Sparkle = <>&#x2728;</>;

const getStatStyle = ({ index, currentStatIndex, prevStatindex }) => {
  if (index === currentStatIndex) return currentStatStyle;
  if (index === prevStatindex) return prevStatStyle;
  return initialStatStyle;
};

const Stats = () => {
  const dispatch = useDispatch();
  const isStatsFetched = useSelector(
    ({ apiStatus: apiStatuses }) => apiStatuses[apiTypes.FETCH_STATS].status === apiStatus.successful
  );
  useEffect(() => {
    if (!isStatsFetched) {
      dispatch(fetchStats());
    }
  }, [isStatsFetched]);
  const noOfImagesAnalyzed = useSelector(({ data }) => data.stats.total_no_images);
  const totalNoOfFacesRecognized = useSelector(({ data }) => data.stats.total_no_faces);
  const totalFacesWithMasks = useSelector(({ data }) => data.stats.total_no_faces_with_masks);
  const stats = [
    `We have analyzed ${pluralizeText(noOfImagesAnalyzed, 'image')}!.`,
    `Our AI recognized ${pluralizeText(totalNoOfFacesRecognized, 'face')}.`,
    `Our AI recognized ${pluralizeText(totalFacesWithMasks, 'face')} with masks.`
  ];
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [prevStatindex, setPrevStatIndex] = useState(stats.length - 1);
  useEffect(() => {
    const intervalID = window.setTimeout(() => {
      const newIndex = (currentStatIndex + 1) % stats.length;
      setCurrentStatIndex(newIndex);
      setPrevStatIndex((newIndex - 1 + stats.length) % stats.length);
    }, 3000);
    return () => {
      window.clearTimeout(intervalID);
    };
  }, [currentStatIndex, stats.length]);
  return (
    <InfoContainer>
      <StatsContainer>
        {isStatsFetched ? stats.map((stat, index) => (
          <Stat key={index} style={getStatStyle({ index, currentStatIndex, prevStatindex })}>
            {Sparkle}
            <StatText>{stat}</StatText>
          </Stat>
        )) : null}
      </StatsContainer>
    </InfoContainer>
  );
};

export default Stats;
