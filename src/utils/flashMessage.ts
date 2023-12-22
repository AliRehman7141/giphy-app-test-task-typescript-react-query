import {showMessage} from 'react-native-flash-message';

const showErrorMsg = (msgStr: string, options = {}) =>
  showMessage({
    message: msgStr,
    type: 'danger',
    ...options,
  });

const showSuccessMsg = (msgStr: string, options = {}) =>
  showMessage({
    message: msgStr,
    type: 'success',
    backgroundColor: '#009491',
    ...options,
  });

const showWarningMsg = (msgStr: string, options = {}) =>
  showMessage({
    message: msgStr,
    type: 'warning',
    ...options,
  });

export {showErrorMsg, showSuccessMsg, showWarningMsg};
