package com.documents.service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.documents.dao.DocumentsDao;
import com.documents.entity.Documents;

@Service
public class DocumentsService {

    @Autowired
    private DocumentsDao dao;

    private final Path documentStorageLocation;

    @Autowired
    public DocumentsService() {
        this.documentStorageLocation = Paths.get("document-storage").toAbsolutePath().normalize();
        try {
            Files.createDirectories(this.documentStorageLocation);
        } catch (Exception ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    public Documents saveDocuments(Documents doc) {
        return dao.save(doc);
    }

    public Documents findByEmpnumber(long empnumber) {
        return dao.findByEmpnumber(empnumber);
    }

    public Path getDocumentPath(long empnumber, String documentType) throws Exception {
        // Fetch the document path from the database
        String relativePath = dao.findDocumentPathByEmpnumberAndDocumentType(empnumber, documentType)
                                  .orElseThrow(() -> new Exception("File not found for empnumber: " + empnumber + " and documentType: " + documentType));

        // Construct the full file path
        Path filePath = this.documentStorageLocation.resolve(relativePath).normalize();
        if (!Files.exists(filePath) || !Files.isReadable(filePath)) {
            throw new Exception("File not found or not readable");
        }
        return filePath;
    }
}
