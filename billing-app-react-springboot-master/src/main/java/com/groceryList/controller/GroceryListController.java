package com.groceryList.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.groceryList.service.IService;
import com.groceryList.dto.ItemRequestDTO;
import com.groceryList.dto.ItemResponseDTO;
import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", exposedHeaders = "Access-Control-Allow-Origin")
public class GroceryListController { // No longer implements Resource<Item> directly, as its methods change
	
	@Autowired
    private IService itemService; // Now uses the DTO-aware IService

	@GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ItemResponseDTO> findById(@PathVariable Long id) {
		return ResponseEntity.ok(itemService.findById(id)); // Returns DTO
	}

	@PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ItemResponseDTO> createItem(@RequestBody ItemRequestDTO itemRequestDTO) {
		return new ResponseEntity<>(itemService.createItem(itemRequestDTO), HttpStatus.CREATED); // Accepts DTO, returns DTO
	}

	@PutMapping(value = "/{id}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ItemResponseDTO> updateItem(@PathVariable Long id, @RequestBody ItemRequestDTO itemRequestDTO) {
		return new ResponseEntity<>(itemService.updateItem(id, itemRequestDTO), HttpStatus.OK); // Accepts DTO, returns DTO
	}

	@DeleteMapping(value = "/{id}")
	public ResponseEntity<Void> deleteById(@PathVariable("id") Long id) {
		itemService.deleteById(id); // Service now returns void
		return new ResponseEntity<>(HttpStatus.NO_CONTENT); // Return 204 No Content
	}

	@GetMapping
	public ResponseEntity<List<ItemResponseDTO>> findAll(@RequestParam(required = false) String searchText) {
		if (searchText != null && !searchText.isEmpty()) {
			return new ResponseEntity<>(itemService.findAll(searchText), HttpStatus.OK); // Returns List of DTOs
		}
		return new ResponseEntity<>(itemService.findAll(), HttpStatus.OK); // Returns List of DTOs
	}
}
