package com.documents.controller;

import com.documents.entity.Documents;
import com.documents.service.DocumentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/documents")
public class DocumentsController {

    @Autowired
    private DocumentsService documentsService;

    @PostMapping("/uploadMultiple")
    public ResponseEntity<Documents> uploadDocuments(
            @RequestParam(value = "degreememoFile", required = false) MultipartFile degreememoFile,
            @RequestParam(value = "pancardFile", required = false) MultipartFile pancardFile,
            @RequestParam(value = "sscmemoFile", required = false) MultipartFile sscmemoFile,
            @RequestParam(value = "voteridFile", required = false) MultipartFile voteridFile,
            @RequestParam("empnumber") Long empnumber) {
        try {
            Documents documents = documentsService.saveOrUpdateDocuments(degreememoFile, pancardFile, sscmemoFile, voteridFile, empnumber);
            return new ResponseEntity<>(documents, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/download")
    public ResponseEntity<byte[]> downloadDocument(
            @RequestParam("empnumber") Long empnumber,
            @RequestParam("documentType") String documentType) {
        try {
            byte[] document = documentsService.downloadDocument(empnumber, documentType);
            if (document != null) {
                return ResponseEntity.ok()
                        .header("Content-Disposition", "attachment; filename=\"" + documentType + "\"")
                        .body(document);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/emp/{empnumber}")
    public ResponseEntity<Documents> getDocumentsByEmpnumber(@PathVariable Long empnumber) {
        Documents documents = documentsService.getDocumentsByEmpnumber(empnumber);
        if (documents != null) {
            return ResponseEntity.ok(documents);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/uploadImage/{empnumber}")
    public ResponseEntity<Documents> uploadImage(
            @PathVariable Long empnumber,
            @RequestParam("imageFile") MultipartFile imageFile) {
        try {
            Documents documents = documentsService.saveOrUpdateImage(imageFile, empnumber);
            return new ResponseEntity<>(documents, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/updateDocuments/{empnumber}")
    public ResponseEntity<Documents> updateDocuments(
            @PathVariable Long empnumber,
            @RequestParam(value = "degreememoFile", required = false) MultipartFile degreememoFile,
            @RequestParam(value = "pancardFile", required = false) MultipartFile pancardFile,
            @RequestParam(value = "sscmemoFile", required = false) MultipartFile sscmemoFile,
            @RequestParam(value = "voteridFile", required = false) MultipartFile voteridFile) {
        try {
            Documents updatedDocuments = documentsService.updateDocuments(empnumber, degreememoFile, pancardFile, sscmemoFile, voteridFile);
            if (updatedDocuments != null) {
                return ResponseEntity.ok(updatedDocuments);
            } else {
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Other controller methods for update and delete if needed

}
