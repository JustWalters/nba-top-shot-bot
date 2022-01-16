import React, { FC } from 'react';
import { BasePropertyProps } from 'admin-bro';
import { Box } from '@admin-bro/design-system';

import { getSeriesNumber } from '../../utils';

const MomentViewer: FC<BasePropertyProps> = (props) => {
  const moment = props.record.populated.moment.params;

  return (
    <Box>
      <a href={moment.url}>
        {moment.playerName} {moment.playCategory}{' '}
        {new Date(moment.at).toDateString()}
      </a>
      <div>
        From {moment.setName} (Series {getSeriesNumber(moment.setSeriesNumber)})
      </div>
    </Box>
  );
};

export default MomentViewer;
