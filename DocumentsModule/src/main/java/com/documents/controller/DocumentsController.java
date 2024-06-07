package com.documents.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.documents.dto.CommonApiResponse;
import com.documents.dto.DocumentsAddDto;
import com.documents.dto.ResponseDto;
import com.documents.resource.DocumentsResource;

@RestController
@RequestMapping("/documents")
public class DocumentsController {

    @Autowired
    DocumentsResource resource;

    // Add documents
    @PostMapping(value = "/adddocuments")
    public ResponseEntity<CommonApiResponse> adddocuments(DocumentsAddDto dto) {
        return resource.adddocuments(dto);
    }

    // Add profile picture and update profile
    @PutMapping(value = "/addprofilepic")
    public ResponseEntity<CommonApiResponse> addprofilepic(@RequestParam MultipartFile profile, @RequestParam long empnumber) {
        return resource.addprofilepic(profile, empnumber);
    }

    // Get documents by employee number
    @GetMapping(value = "/getdocmentsByemp")
    public ResponseEntity<ResponseDto> findemployeedocuments(@RequestParam long empnumber) {
        return resource.findemployeedocuments(empnumber);
    }

    // Update documents
    @PutMapping(value = "/updatedocuments")
    public ResponseEntity<CommonApiResponse> updateDocument(@RequestParam MultipartFile documentFile, @RequestParam long empnumber, @RequestParam String documentType) {
        return resource.updateDocument(documentFile, empnumber, documentType);
    }

    // Download document
    @GetMapping(value = "/downloadDocument")
    public ResponseEntity<Resource> downloadDocument(@RequestParam long empnumber, @RequestParam String documentType) {
        return resource.downloadDocument(empnumber, documentType);
    }
}
