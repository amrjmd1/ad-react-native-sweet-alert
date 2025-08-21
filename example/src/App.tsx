import { View, Button } from 'react-native';
import { AlertProvider, useAlert } from 'ad-react-native-sweet-alert';

export default function App() {
  return (
    <AlertProvider
      config={{
        position: 'top',
        animation: 'slide',
        duration: 3500,
        maxVisible: 1,
      }}
    >
      <Home />
    </AlertProvider>
  );
}

function Home() {
  const { showAlert } = useAlert();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Show success"
        onPress={() =>
          showAlert({
            type: 'success',
            title: 'Success',
            message: 'The operation was successful',
          })
        }
      />
      <Button
        title="Show error"
        onPress={() =>
          showAlert({
            type: 'error',
            title: 'Error',
            message: 'The operation failed',
          })
        }
      />
      <Button
        title="Show info"
        onPress={() =>
          showAlert({
            type: 'info',
            title: 'Info',
            message: 'This is an informational message',
          })
        }
      />
      <Button
        title="Show warning"
        onPress={() =>
          showAlert({
            type: 'warning',
            title: 'Warning',
            message: 'This is a warning message',
          })
        }
      />
    </View>
  );
}
