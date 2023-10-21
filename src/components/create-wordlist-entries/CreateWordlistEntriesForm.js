import PropTypes from 'prop-types';
import { WordlistEntry } from './WordlistEntry';

export const CreateWordlistEntriesForm = ({ setModalVisible, wordlistId }) => {
  return <WordlistEntry setModalVisible={setModalVisible} wordlistId={wordlistId} />;
};

CreateWordlistEntriesForm.propTypes = {
  setModalVisible: PropTypes.func.isRequired,
  wordlistId: PropTypes.string.isRequired
};
