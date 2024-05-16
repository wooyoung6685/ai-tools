import React from 'react';
import { Skeleton, Card } from 'antd';
import styled from 'styled-components';

const StyledCard = styled(Card)`
  width: 600px;
  padding-top:10px;
`;

const LoadingBar = () => {
  return (
    <StyledCard>
      <Skeleton  active>
        <Card.Meta
          avatar={<img src="https://via.placeholder.com/40" alt="avatar" />}
          title="Card title"
          description="This is the description"
        />
      </Skeleton>
    </StyledCard>
  );
};

export default LoadingBar;
