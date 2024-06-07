package com.documents.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.documents.entity.Documents;

@Repository
public interface DocumentsDao extends JpaRepository<Documents, Long> {

    Optional<String> findDocumentPathByEmpnumberAndDocumentType(long empnumber, String documentType);

    Documents findByEmpnumber(long empnumber);
}
