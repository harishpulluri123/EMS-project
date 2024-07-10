package com.documents.dto;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class DocumentsAddDto {

    private long empnumber;
    private MultipartFile aadhar;
    private MultipartFile pancard;
    private MultipartFile voterid;
    private MultipartFile sscmemo;
    private MultipartFile intermemo;
    private MultipartFile degreememo;
}
