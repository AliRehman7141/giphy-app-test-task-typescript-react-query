import React from 'react';
import {Box, IInputProps, Input} from 'native-base';

const InputComponent: React.FC<IInputProps> = props => {
  return (
    <>
      <Box alignItems="center" top={props?.top ?? 10}>
        <Input mx="3" w="100%" height={50} {...props} />
      </Box>
    </>
  );
};

export default InputComponent;
