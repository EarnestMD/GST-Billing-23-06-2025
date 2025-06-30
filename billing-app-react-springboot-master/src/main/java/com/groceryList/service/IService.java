package com.groceryList.service;

import com.groceryList.dto.ItemRequestDTO;
import com.groceryList.dto.ItemResponseDTO;
import java.util.List; // Changed from Collection

public interface IService { // No longer generic <T> for Item operations
    ItemResponseDTO findById(Long id);
    ItemResponseDTO createItem(ItemRequestDTO itemRequestDTO);
    ItemResponseDTO updateItem(Long id, ItemRequestDTO itemRequestDTO);
    void deleteById(Long id);
    List<ItemResponseDTO> findAll();
    List<ItemResponseDTO> findAll(String searchText);
}

//	Collection<T> findAll(String searchText);
//}
