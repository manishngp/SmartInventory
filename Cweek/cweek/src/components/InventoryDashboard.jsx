import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  VStack,
  Button,
  useDisclosure,
  SimpleGrid,
  Input,
  Select,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
} from '@chakra-ui/react';
import InventoryForm from './InventoryForm';
import InventoryItem from './InventoryItem';
import { addItem, updateItem, deleteItem } from '../redux/actions/inventoryActions';

function InventoryDashboard() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterAvailability, setFilterAvailability] = useState('');
  const items = useSelector(state => state.inventory.items);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
    onClose();
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    onOpen();
  };

  const handleUpdateItem = (item) => {
    dispatch(updateItem(item));
    setEditingItem(null);
    onClose();
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  // Get unique categories and locations for filters
  const categories = [...new Set(items.map(item => item.category))];
  const locations = [...new Set(items.map(item => item.location).filter(Boolean))];

  // Filter and search logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = !filterCategory || item.category === filterCategory;
    const matchesLocation = !filterLocation || item.location === filterLocation;
    const matchesAvailability = !filterAvailability || 
      (filterAvailability === 'inStock' && item.quantity > 0) ||
      (filterAvailability === 'lowStock' && item.quantity <= item.minQuantity) ||
      (filterAvailability === 'outOfStock' && item.quantity === 0);

    return matchesSearch && matchesCategory && matchesLocation && matchesAvailability;
  });

  // Alert items
  const lowStockItems = items.filter(item => item.quantity <= item.minQuantity);
  const expiringItems = items.filter(item => {
    if (!item.expiryDate) return false;
    const daysUntilExpiry = Math.ceil(
      (new Date(item.expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0;
  });

  return (
    <Box>
      {/* Alerts Section */}
      <Stack spacing={3} mb={6}>
        {lowStockItems.length > 0 && (
          <Alert status="warning">
            <AlertIcon />
            <Box>
              <AlertTitle>Low Stock Alert!</AlertTitle>
              <AlertDescription>
                {lowStockItems.map(item => item.name).join(', ')} {lowStockItems.length === 1 ? 'is' : 'are'} running low on stock.
              </AlertDescription>
            </Box>
          </Alert>
        )}
        {expiringItems.length > 0 && (
          <Alert status="error">
            <AlertIcon />
            <Box>
              <AlertTitle>Expiring Items Alert!</AlertTitle>
              <AlertDescription>
                {expiringItems.map(item => item.name).join(', ')} will expire within 7 days.
              </AlertDescription>
            </Box>
          </Alert>
        )}
      </Stack>

      {/* Controls Section */}
      <VStack spacing={4} mb={6}>
        <HStack width="100%" spacing={4}>
          <Input
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button colorScheme="blue" onClick={() => {
            setEditingItem(null);
            onOpen();
          }}>
            Add New Item
          </Button>
        </HStack>

        <HStack width="100%" spacing={4}>
          <Select
            placeholder="Filter by Category"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>

          <Select
            placeholder="Filter by Location"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          >
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </Select>

          <Select
            placeholder="Filter by Availability"
            value={filterAvailability}
            onChange={(e) => setFilterAvailability(e.target.value)}
          >
            <option value="inStock">In Stock</option>
            <option value="lowStock">Low Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </Select>
        </HStack>
      </VStack>

      <InventoryForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={editingItem ? handleUpdateItem : handleAddItem}
        initialData={editingItem}
      />

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
        {filteredItems.map(item => (
          <InventoryItem
            key={item.id}
            item={item}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default InventoryDashboard;