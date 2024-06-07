package com.documents.dto;

import org.springframework.beans.BeanUtils;
import org.springframework.web.multipart.MultipartFile;

import com.documents.entity.Documents;

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
	
	
	public static Documents toEntity(DocumentsAddDto dto) {
		Documents entity = new Documents();
		BeanUtils.copyProperties(dto, entity);
		return entity;
	}
}
