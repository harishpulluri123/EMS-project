import React, { useState } from 'react';
import styled from 'styled-components';
import { FaFileAlt, FaSpinner } from 'react-icons/fa'; // Import FaSpinner for loading icon
import { getToken } from '../utils/JWT_Token';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f9fa;
`;

const UploadBox = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: #343a40;
`;

const InputLabel = styled.label`
  margin: 10px 0;
  color: #495057;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  background: #e9ecef;
  transition: background 0.3s;
  &:hover {
    background: #dee2e6;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const FileName = styled.span`
  color: #6c757d;
`;

const UploadButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover {
    background-color: #0056b3;
  }
`;

const ButtonText = styled.span`
  margin-left: 5px;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 8px;
  background-color: #e9ecef;
  border-radius: 4px;
  margin-top: 10px;
`;

const ProgressBar = styled.div`
  height: 100%;
  width: ${(props) => props.progress}%;
  background-color: #007bff;
  border-radius: 4px;
`;

const UploadDocument = () => {
  const [degreeFile, setDegreeFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [sscFile, setSscFile] = useState(null);
  const [voterIdFile, setVoterIdFile] = useState(null);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false); // State to manage upload state
  const [uploadProgress, setUploadProgress] = useState(0); // State to manage upload progress

  const handleFileChange = (event, setFile) => {
    const file = event.target.files[0];
    if (file.size > 1024 * 1024) {
      setError('File size should be less than 1MB');
      return;
    }
    setError('');
    setFile(file);
  };

  const handleSubmit = async () => {
    if (!degreeFile && !panFile && !sscFile && !voterIdFile) {
      setError('Please upload at least one file');
      return;
    }

    const empnumber = sessionStorage.getItem('empNumber');
    if (!empnumber) {
      setError('Employee number is missing');
      return;
    }

    const token = getToken();
    const formData = new FormData();
    formData.append('empnumber', empnumber);
    if (degreeFile) formData.append('degreememoFile', degreeFile);
    if (panFile) formData.append('pancardFile', panFile);
    if (sscFile) formData.append('sscmemoFile', sscFile);
    if (voterIdFile) formData.append('voteridFile', voterIdFile);

    try {
      setUploading(true); // Set uploading state to true
      const response = await fetch('http://localhost:2022/documents/uploadMultiple', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
        // Update progress state
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });
      if (response.ok) {
        setError('');
        alert('Files uploaded successfully');
        setDegreeFile(null); // Clear file states after successful upload
        setPanFile(null);
        setSscFile(null);
        setVoterIdFile(null);
      } else {
        setError('Failed to upload files');
      }
    } catch (err) {
      setError('Failed to upload files');
    } finally {
      setUploading(false); // Set uploading state to false after upload completes
      setUploadProgress(0); // Reset upload progress
    }
  };

  return (
    <Container>
      <UploadBox>
        <Title>Upload Documents</Title>
        <InputLabel>
          <FaFileAlt />
          Degree Memo
          <FileInput type="file" onChange={(e) => handleFileChange(e, setDegreeFile)} />
          {degreeFile && <FileName>{degreeFile.name}</FileName>}
        </InputLabel>
        <InputLabel>
          <FaFileAlt />
          Pancard
          <FileInput type="file" onChange={(e) => handleFileChange(e, setPanFile)} />
          {panFile && <FileName>{panFile.name}</FileName>}
        </InputLabel>
        <InputLabel>
          <FaFileAlt />
          SSC Memo
          <FileInput type="file" onChange={(e) => handleFileChange(e, setSscFile)} />
          {sscFile && <FileName>{sscFile.name}</FileName>}
        </InputLabel>
        <InputLabel>
          <FaFileAlt />
          Voter ID
          <FileInput type="file" onChange={(e) => handleFileChange(e, setVoterIdFile)} />
          {voterIdFile && <FileName>{voterIdFile.name}</FileName>}
        </InputLabel>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <UploadButton disabled={uploading} onClick={handleSubmit}>
          {uploading ? (
            <FaSpinner className="upload-icon" spin />
          ) : (
            <FaFileAlt className="upload-icon" />
          )}
          <ButtonText>{uploading ? 'Uploading...' : 'Upload'}</ButtonText>
        </UploadButton>
      </UploadBox>
    </Container>
  );
};

export default UploadDocument;
