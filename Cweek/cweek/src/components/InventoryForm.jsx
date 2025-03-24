import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  
 
  Select,
  NumberInput,
  NumberInputField,
  Button,
  VStack
} from '@chakra-ui/react';
import { FormControl, FormLabel, Input } from '@chakra-ui/react';

import { useState, useEffect } from 'react';

function InventoryForm({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    minQuantity: 0,
    expiryDate: '',
    location: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: '',
      category: '',
      quantity: 0,
      minQuantity: 0,
      expiryDate: '',
      location: ''
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{initialData ? 'Edit Item' : 'Add New Item'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  placeholder="Select category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="electronics">Electronics</option>
                  <option value="food">Food</option>
                  <option value="clothing">Clothing</option>
                  <option value="other">Other</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Quantity</FormLabel>
                <NumberInput
                  value={formData.quantity}
                  onChange={(value) => setFormData({ ...formData, quantity: parseInt(value) })}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Minimum Quantity</FormLabel>
                <NumberInput
                  value={formData.minQuantity}
                  onChange={(value) => setFormData({ ...formData, minQuantity: parseInt(value) })}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>Expiry Date</FormLabel>
                <Input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </FormControl>

              <Button type="submit" colorScheme="blue" width="100%">
                {initialData ? 'Update Item' : 'Add Item'}
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default InventoryForm;