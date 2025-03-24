import {
  Box,
  Heading,
  Text,
  Badge,
  Button,
  HStack,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useEffect,  } from 'react';

function InventoryItem({ item, onEdit, onDelete }) {
  const toast = useToast();

  const getStockStatus = (quantity, minQuantity) => {
    if (quantity === 0) return { color: 'red', text: 'Out of Stock' };
    if (quantity <= minQuantity) return { color: 'orange', text: 'Low Stock' };
    return { color: 'green', text: 'In Stock' };
  };

  const stockStatus = getStockStatus(item.quantity, item.minQuantity);

  useEffect(() => {
    if (item.quantity <= item.minQuantity) {
      toast({
        title: "Low Stock Alert",
        description: `${item.name} is running low on stock!`,
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }

    if (item.expiryDate) {
      const today = new Date();
      const expiry = new Date(item.expiryDate);
      const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

      if (daysUntilExpiry <= 7 && daysUntilExpiry > 0) {
        toast({
          title: "Expiration Alert",
          description: `${item.name} will expire in ${daysUntilExpiry} days!`,
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, [item, toast]);

  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="lg"
      position="relative"
      bg="white"
    >
      <VStack align="stretch" spacing={2}>
        <Heading size="md">{item.name}</Heading>
        <Badge colorScheme={stockStatus.color}>
          {stockStatus.text} - Quantity: {item.quantity}
        </Badge>
        <Text>Category: {item.category}</Text>
        <Text>Location: {item.location || 'Not specified'}</Text>
        <Text>Minimum Quantity: {item.minQuantity}</Text>
        {item.expiryDate && (
          <Text>Expires: {new Date(item.expiryDate).toLocaleDateString()}</Text>
        )}
        
        <HStack spacing={2}>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => onEdit(item)}
          >
            Edit
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            onClick={() => onDelete(item.id)}
          >
            Delete
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}

export default InventoryItem;