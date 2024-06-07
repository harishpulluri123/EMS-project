package com.documents.resource;

import java.nio.file.Path;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.documents.dto.CommonApiResponse;
import com.documents.dto.DocumentsAddDto;
import com.documents.dto.ResponseDto;
import com.documents.entity.Documents;
import com.documents.entity.User;
import com.documents.service.DocumentsService;
import com.documents.service.StorageService;
import com.documents.service.UserService;

@Service
public class DocumentsResource {

	@Autowired
	DocumentsService service;
	
	@Autowired
	UserService userservice;
	
	@Autowired
	StorageService storageService;
	
	public ResponseEntity<CommonApiResponse>adddocuments(DocumentsAddDto dto){
		
		CommonApiResponse response = new CommonApiResponse();
		
		User byEmpnumber = userservice.findByEmpnumber(dto.getEmpnumber());
		
		if(byEmpnumber==null) {
			response.setMessage("your are not authorized person to access this api");
			response.setStatus(false);
			return new ResponseEntity<CommonApiResponse>(response,HttpStatus.BAD_REQUEST);
			
		}
		Documents entity = DocumentsAddDto.toEntity(dto);
		entity.setUser(byEmpnumber);
		entity.setAadhar(dto.getAadhar().getOriginalFilename());
		entity.setDegreememo(dto.getDegreememo().getOriginalFilename());
		entity.setIntermemo(dto.getIntermemo().getOriginalFilename());
		entity.setPancard(dto.getPancard().getOriginalFilename());
		entity.setSscmemo(dto.getSscmemo().getOriginalFilename());
		entity.setVoterid(dto.getVoterid().getOriginalFilename());
		
		//add in images in path
		
		storageService.store(dto.getAadhar());
		storageService.store(dto.getDegreememo());
		storageService.store(dto.getIntermemo());
		storageService.store(dto.getPancard());
		storageService.store(dto.getSscmemo());
		storageService.store(dto.getVoterid());
		
		Documents savedocuments = service.saveDocuments(entity);
		if(savedocuments==null) {
			response.setMessage("failed to save documents");
			response.setStatus(false);
			return new ResponseEntity<CommonApiResponse>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.setMessage("success");
		response.setStatus(true);
		return new ResponseEntity<CommonApiResponse>(response,HttpStatus.OK);
	}
	
	
	public ResponseEntity<CommonApiResponse>addprofilepic(MultipartFile profile,long empnumber){
		CommonApiResponse response = new CommonApiResponse();
		
		User byEmpnumber = userservice.findByEmpnumber(empnumber);
		
		if(byEmpnumber==null) {
			response.setMessage("your are not authorized person to access this api");
			response.setStatus(false);
			return new ResponseEntity<CommonApiResponse>(response,HttpStatus.BAD_REQUEST);
			
		}
		byEmpnumber.setProfilepic(profile.getOriginalFilename());
		
		storageService.store(profile);
		User updateuser = userservice.updateuser(byEmpnumber);
		if(updateuser==null) {
			response.setMessage("failed to update profile");
			response.setStatus(false);
			return new ResponseEntity<CommonApiResponse>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		response.setMessage("profile pic is updated");
		response.setStatus(false);
		return new ResponseEntity<CommonApiResponse>(response,HttpStatus.BAD_REQUEST);
	}
	
	public ResponseEntity<ResponseDto>findemployeedocuments(long empnumber){
		
		ResponseDto dto = new ResponseDto();
		
		Documents byEmpnumber = service.findByEmpnumber(empnumber);
		if(byEmpnumber==null) {
			dto.setMessage("no data found");
			dto.setStatus(false);
			return new ResponseEntity<ResponseDto>(dto,HttpStatus.BAD_REQUEST);
		}
		
		dto.setDoc(byEmpnumber);
		dto.setMessage(" data found");
		dto.setStatus(true);
		return new ResponseEntity<ResponseDto>(dto,HttpStatus.OK);
	}
	
	 public ResponseEntity<CommonApiResponse> updateDocument(MultipartFile documentFile, long empnumber, String documentType) {
	        CommonApiResponse response = new CommonApiResponse();
	        
	        User user = userservice.findByEmpnumber(empnumber);
	        
	        if (user == null) {
	            response.setMessage("You are not authorized to access this API");
	            response.setStatus(false);
	            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	        }

	        Documents documents = service.findByEmpnumber(empnumber);
	        if (documents == null) {
	            response.setMessage("No documents found for the given employee number");
	            response.setStatus(false);
	            return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	        }

	        switch (documentType.toLowerCase()) {
	            case "aadhar":
	                documents.setAadhar(documentFile.getOriginalFilename());
	                break;
	            case "pancard":
	                documents.setPancard(documentFile.getOriginalFilename());
	                break;
	            case "voterid":
	                documents.setVoterid(documentFile.getOriginalFilename());
	                break;
	            case "sscmemo":
	                documents.setSscmemo(documentFile.getOriginalFilename());
	                break;
	            case "intermemo":
	                documents.setIntermemo(documentFile.getOriginalFilename());
	                break;
	            case "degreememo":
	                documents.setDegreememo(documentFile.getOriginalFilename());
	                break;
	            default:
	                response.setMessage("Invalid document type");
	                response.setStatus(false);
	                return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
	        }

	        storageService.store(documentFile);
	        Documents updatedDocuments = service.saveDocuments(documents);
	        
	        if (updatedDocuments == null) {
	            response.setMessage("Failed to update document");
	            response.setStatus(false);
	            return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	        }

	        response.setMessage("Document updated successfully");
	        response.setStatus(true);
	        return new ResponseEntity<>(response, HttpStatus.OK);
	    }
	 public ResponseEntity<Resource> downloadDocument(long empnumber, String documentType) {
	        try {
	            Path filePath = service.getDocumentPath(empnumber, documentType);
	            Resource resource = new UrlResource(filePath.toUri());

	            if (resource.exists() && resource.isReadable()) {
	                return ResponseEntity.ok()
	                        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
	                        .body(resource);
	            } else {
	                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
	            }
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	        }
	    }
	}

