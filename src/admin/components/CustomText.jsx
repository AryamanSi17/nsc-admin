import React from 'react';
import { Box } from '@adminjs/design-system';

const CustomText = (props) => {
  const { record, property } = props;
  const path = property.path;
  
  // Get nested value
  const getValue = (obj, path) => {
    const keys = path.split('.');
    let value = obj;
    for (const key of keys) {
      value = value?.[key];
      if (value === undefined) break;
    }
    return value || '-';
  };

  const value = getValue(record.params, path);

  return (
    <Box>
      {value}
    </Box>
  );
};

export default CustomText;