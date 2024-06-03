package com.example.demo.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.dao.UserRepository;
import com.example.demo.entity.User;

@Service
public class UserService {

	@Value("${file.upload-dir}")
	private String uploadDir;

	private final UserRepository userRepository;

	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User saveUser(User user, MultipartFile image, MultipartFile aadharFile, MultipartFile voterIdFile,
			MultipartFile pancardFile, MultipartFile sscFile, MultipartFile intermediateFile,
			MultipartFile graduationFile, MultipartFile postGraduationFile, MultipartFile drivingLicenceFile,
			MultipartFile passportFile) throws IOException {
		user.setProfileImagePath(saveFile(image));
		user.setAadharFilePath(saveFile(aadharFile));
		user.setVoterIdFilePath(saveFile(voterIdFile));
		user.setPancardFilePath(saveFile(pancardFile));
		user.setSscFilePath(saveFile(sscFile));
		user.setIntermediateFilePath(saveFile(intermediateFile));
		user.setGraduationFilePath(saveFile(graduationFile));
		user.setPostGraduationFilePath(saveFile(postGraduationFile));
		user.setDrivingLicenceFilePath(saveFile(drivingLicenceFile));
		user.setPassportFilePath(saveFile(passportFile));

		return userRepository.save(user);
	}

	private String saveFile(MultipartFile file) throws IOException {
		if (file == null || file.isEmpty()) {
			return null;
		}
		String originalFilename = file.getOriginalFilename();
		Path path = Paths.get(uploadDir, originalFilename);
		Files.createDirectories(path.getParent()); // Ensure directory exists
		Files.write(path, file.getBytes());
		return originalFilename;
	}

	public Optional<User> updateUserImage(Long id, MultipartFile image) {
		return userRepository.findById(id).map(user -> {
			try {
				user.setProfileImagePath(saveFile(image));
				return userRepository.save(user);
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		});
	}

	public Optional<User> updateUserDocuments(Long id, MultipartFile aadharFile, MultipartFile voterIdFile,
			MultipartFile pancardFile, MultipartFile sscFile, MultipartFile intermediateFile,
			MultipartFile graduationFile, MultipartFile postGraduationFile, MultipartFile drivingLicenceFile,
			MultipartFile passportFile) {
		return userRepository.findById(id).map(user -> {
			try {
				if (!aadharFile.isEmpty()) {
					user.setAadharFilePath(saveFile(aadharFile));
				}
				if (!voterIdFile.isEmpty()) {
					user.setVoterIdFilePath(saveFile(voterIdFile));
				}
				if (!pancardFile.isEmpty()) {
					user.setPancardFilePath(saveFile(pancardFile));
				}
				if (!sscFile.isEmpty()) {
					user.setSscFilePath(saveFile(sscFile));
				}
				if (!intermediateFile.isEmpty()) {
					user.setIntermediateFilePath(saveFile(intermediateFile));
				}
				if (!graduationFile.isEmpty()) {
					user.setGraduationFilePath(saveFile(graduationFile));
				}
				if (!postGraduationFile.isEmpty()) {
					user.setPostGraduationFilePath(saveFile(postGraduationFile));
				}
				if (!drivingLicenceFile.isEmpty()) {
					user.setDrivingLicenceFilePath(saveFile(drivingLicenceFile));
				}
				if (!passportFile.isEmpty()) {
					user.setPassportFilePath(saveFile(passportFile));
				}
				return userRepository.save(user);
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		});
	}

	public Optional<User> updateUserDocument(Long id, MultipartFile aadharFile, MultipartFile voterIdFile,
			MultipartFile pancardFile, MultipartFile sscFile, MultipartFile intermediateFile,
			MultipartFile graduationFile, MultipartFile postGraduationFile, MultipartFile drivingLicenceFile,
			MultipartFile passportFile) {
		return userRepository.findById(id).map(user -> {
			try {
				if (aadharFile != null && !aadharFile.isEmpty()) {
					user.setAadharFilePath(saveFile(aadharFile));
				}
				if (voterIdFile != null && !voterIdFile.isEmpty()) {
					user.setVoterIdFilePath(saveFile(voterIdFile));
				}
				if (pancardFile != null && !pancardFile.isEmpty()) {
					user.setPancardFilePath(saveFile(pancardFile));
				}
				if (sscFile != null && !sscFile.isEmpty()) {
					user.setSscFilePath(saveFile(sscFile));
				}
				if (intermediateFile != null && !intermediateFile.isEmpty()) {
					user.setIntermediateFilePath(saveFile(intermediateFile));
				}
				if (graduationFile != null && !graduationFile.isEmpty()) {
					user.setGraduationFilePath(saveFile(graduationFile));
				}
				if (postGraduationFile != null && !postGraduationFile.isEmpty()) {
					user.setPostGraduationFilePath(saveFile(postGraduationFile));
				}
				if (drivingLicenceFile != null && !drivingLicenceFile.isEmpty()) {
					user.setDrivingLicenceFilePath(saveFile(drivingLicenceFile));
				}
				if (passportFile != null && !passportFile.isEmpty()) {
					user.setPassportFilePath(saveFile(passportFile));
				}
				return userRepository.save(user);
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		});
	}

	public Optional<Void> deleteUserImage(Long id) {
		return userRepository.findById(id).map(user -> {
			try {
				String profileImagePath = user.getProfileImagePath();
				if (profileImagePath != null && !profileImagePath.isEmpty()) {
					deleteFile(profileImagePath);
					user.setProfileImagePath(null);
					userRepository.save(user);
				}
				return null;
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		});
	}

	private void deleteFile(String filename) throws IOException {
		if (filename != null && !filename.isEmpty()) {
			Path path = Paths.get(uploadDir, filename);
			Files.deleteIfExists(path);
		}
	}

	public Optional<Void> deleteUserDocument(Long id, String type) {
		return userRepository.findById(id).map(user -> {
			try {
				switch (type.toLowerCase()) {
				case "aadhar":
					deleteFile(user.getAadharFilePath());
					user.setAadharFilePath(null);
					break;
				case "voterid":
					deleteFile(user.getVoterIdFilePath());
					user.setVoterIdFilePath(null);
					break;
				case "pancard":
					deleteFile(user.getPancardFilePath());
					user.setPancardFilePath(null);
					break;
				case "ssc":
					deleteFile(user.getSscFilePath());
					user.setSscFilePath(null);
					break;
				case "intermediate":
					deleteFile(user.getIntermediateFilePath());
					user.setIntermediateFilePath(null);
					break;
				case "graduation":
					deleteFile(user.getGraduationFilePath());
					user.setGraduationFilePath(null);
					break;
				case "postgraduation":
					deleteFile(user.getPostGraduationFilePath());
					user.setPostGraduationFilePath(null);
					break;
				case "drivinglicence":
					deleteFile(user.getDrivingLicenceFilePath());
					user.setDrivingLicenceFilePath(null);
					break;
				case "passport":
					deleteFile(user.getPassportFilePath());
					user.setPassportFilePath(null);
					break;
				default:
					throw new IllegalArgumentException("Invalid document type: " + type);
				}
				userRepository.save(user);
				return null;
			} catch (IOException e) {
				e.printStackTrace();
				return null;
			}
		});
	}

	public User getUserById(Long id) {
		Optional<User> optionalUser = userRepository.findById(id);
		return optionalUser.orElse(null);
	}

	public List<User> getAllUser() {
		return userRepository.findAll();
	}

	public byte[] getFileData(User user, String documentType) throws IOException {
		String filePath = null;
		switch (documentType.toLowerCase()) {
		case "aadhar":
			filePath = user.getAadharFilePath();
			break;
		case "voterid":
			filePath = user.getVoterIdFilePath();
			break;
		case "pancard":
			filePath = user.getPancardFilePath();
			break;
		case "ssc":
			filePath = user.getSscFilePath();
			break;
		case "intermediate":
			filePath = user.getIntermediateFilePath();
			break;
		case "graduation":
			filePath = user.getGraduationFilePath();
			break;
		case "postgraduation":
			filePath = user.getPostGraduationFilePath();
			break;
		case "drivinglicence":
			filePath = user.getDrivingLicenceFilePath();
			break;
		case "passport":
			filePath = user.getPassportFilePath();
			break;
		default:
			return null;
		}
		if (filePath != null) {
			Path path = Paths.get(uploadDir, filePath);
			return Files.readAllBytes(path);
		}
		return null;
	}
}
