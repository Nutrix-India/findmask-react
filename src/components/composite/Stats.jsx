import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStats } from '@actions/index';
import { apiTypes } from '@actionTypes/index';
import { apiStatus } from '@constants/index';
import { pluralizeText } from '@utils/textHelper';
import InfoContainer from '@container/InfoContainer';
import Text from '@base/Text';

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

const StatText = styled(Text)`
  padding-left: 10px;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.blueGreen};
`;

const initialStatStyle = {
  top: '100%',
  opacity: 0
};

const currentStatStyle = {
  top: '8px',
  opacity: 1
  // bottom: '0'
};

const prevStatStyle = {
  top: '-100%',
  opacity: 0
};

const emoji = {
  0: <>&#128373;</>,
  1: <>&#x2728;</>,
  2: <>&#x1F637;</>
};

const getStatStyle = ({ index, currentStatIndex, prevStatindex }) => {
  if (index === currentStatIndex) return currentStatStyle;
  if (index === prevStatindex) return prevStatStyle;
  return initialStatStyle;
};

const Stats = () => {
  const dispatch = useDispatch();
  const isStatsFetched = useSelector(
    ({ apiStatus: apiStatuses }) =>
      apiStatuses[apiTypes.FETCH_STATS].status === apiStatus.successful
  );
  useEffect(() => {
    if (!isStatsFetched) {
      dispatch(fetchStats());
    }
  }, [dispatch, isStatsFetched]);
  const noOfImagesAnalyzed = useSelector(
    ({ data }) => data.stats.total_no_images
  );
  const totalNoOfFacesRecognized = useSelector(
    ({ data }) => data.stats.total_no_faces
  );
  const totalFacesWithMasks = useSelector(
    ({ data }) => data.stats.total_no_faces_with_masks
  );
  const stats = [
    `Our AI analyzed ${pluralizeText(noOfImagesAnalyzed, 'image')}!`,
    `And recognized ${pluralizeText(totalNoOfFacesRecognized, 'face')}`,
    `Out of which ${pluralizeText(
      totalFacesWithMasks,
      'face'
    )} are having masks.`
  ];
  const [currentStatIndex, setCurrentStatIndex] = useState(0);
  const [prevStatindex, setPrevStatIndex] = useState(stats.length - 1);
  useEffect(() => {
    if (isStatsFetched) {
      const intervalID = window.setTimeout(() => {
        const newIndex = (currentStatIndex + 1) % stats.length;
        setCurrentStatIndex(newIndex);
        setPrevStatIndex((newIndex - 1 + stats.length) % stats.length);
      }, 3000);
      return () => {
        window.clearTimeout(intervalID);
      };
    }
  }, [currentStatIndex, isStatsFetched, stats.length]);
  return (
    <InfoContainer>
      <StatsContainer>
        {isStatsFetched
          ? stats.map((stat, index) => (
              // eslint-disable-next-line react/jsx-indent
              <Stat
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                style={getStatStyle({ index, currentStatIndex, prevStatindex })}
              >
                {emoji[index]}
                <StatText>{stat}</StatText>
              </Stat>
            ))
          : null}
      </StatsContainer>
    </InfoContainer>
  );
};

export default Stats;
