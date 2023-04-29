import { PropTypes } from 'prop-types';
import { Button, Dialog, Portal, Text } from 'react-native-paper';

export const DeleteConfirm = ({ confirm, onDismiss, visible }) => {
  return (
    <Portal>
      <Dialog onDismiss={onDismiss} visible={visible}>
        <Dialog.Content>
          <Text variant="bodyLarge">Are you sure?</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
          <Button mode='contained' onPress={confirm}>Delete</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

DeleteConfirm.propTypes = {
  confirm: PropTypes.func,
  onDismiss: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired
};
