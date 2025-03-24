import { ChakraProvider, Container, Heading } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import InventoryDashboard from './components/InventoryDashboard';

function App() {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <Container maxW="container.xl" py={8}>
          <Heading mb={8} textAlign="center">SmartInventory App</Heading>
          <InventoryDashboard />
        </Container>
      </ChakraProvider>
    </Provider>
  );
}

export default App;