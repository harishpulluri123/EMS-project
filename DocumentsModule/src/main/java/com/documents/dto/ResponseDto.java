package com.documents.dto;

import com.documents.entity.Documents;

import lombok.Data;

@Data
public class ResponseDto extends CommonApiResponse{

	private Documents doc;
	
	
}
