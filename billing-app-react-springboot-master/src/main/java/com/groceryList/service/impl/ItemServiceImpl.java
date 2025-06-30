package com.groceryList.service.impl;

import com.groceryList.dto.ItemRequestDTO;
import com.groceryList.dto.ItemResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.groceryList.model.Item; // Corrected import path
import com.groceryList.repository.GroceryListRepository;
import com.groceryList.service.IService;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ItemServiceImpl implements IService { // No longer implements IService<Item>, but IService (DTO-aware)
		
		private final GroceryListRepository groceryListRepository;

		@Override
		public List<ItemResponseDTO> findAll() {
			return groceryListRepository.findAll().stream()
					.map(ItemResponseDTO::new)
					.collect(Collectors.toList());
		}

		// The method createItem(ItemRequestDTO) of type ItemServiceImpl must override or implement a supertype method
		@Override
		public ItemResponseDTO createItem(ItemRequestDTO itemRequestDTO) {
			Item item = itemRequestDTO.toEntity(); // Convert DTO to Entity
			Item savedItem = groceryListRepository.save(item); // Use save for new entities
			return new ItemResponseDTO(savedItem); // Convert saved Entity to DTO
		}

		@Override
		public ItemResponseDTO updateItem(Long id, ItemRequestDTO itemRequestDTO) {
			// Find existing item
			Item existingItem = groceryListRepository.findById(id)
					.orElseThrow(() -> new RuntimeException("Item not found with ID: " + id)); // Better error handling

			// Update fields from DTO
			existingItem.setProduct_code(itemRequestDTO.getProduct_code());
			existingItem.setProduct_name(itemRequestDTO.getProduct_name());

			Item updatedItem = groceryListRepository.save(existingItem);
			return new ItemResponseDTO(updatedItem);
		}

		@Override
		public ItemResponseDTO findById(Long id) {
			// Corrected handling of Optional
			Optional<Item> itemOptional = groceryListRepository.findById(id);
			Item item = itemOptional.orElseThrow(() -> new RuntimeException("Item not found with ID: " + id));
			return new ItemResponseDTO(item);
		}

		@Override
		public void deleteById(Long id) {
			// Check if item exists before deleting (optional, but good practice for user feedback)
			if (!groceryListRepository.existsById(id)) {
				throw new RuntimeException("Item not found with ID: " + id);
			}
			groceryListRepository.deleteById(id);
			// No need for JSONObject or try-catch for JSONException
		}

		@Override
		public List<ItemResponseDTO> findAll(String searchText) {
			// The repository method returns a Collection, convert to List and then to DTOs
			return groceryListRepository.findAllItems(searchText).stream()
					.map(ItemResponseDTO::new)
					.collect(Collectors.toList());
		}

		@Autowired // Constructor injection is preferred over field injection
		public ItemServiceImpl(GroceryListRepository groceryListRepository) {
			this.groceryListRepository = groceryListRepository;
		}
	}
