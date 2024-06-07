package com.documents.service;

import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

public interface StorageService {

	List<String> loadAll();

	byte[] store(MultipartFile file);

	Resource load(String fileName);

	void delete(byte[] existingImage1);

}