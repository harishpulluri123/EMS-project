package com.example.dto;

import java.util.ArrayList;
import java.util.List;

import com.example.entity.BankDetails;
import com.example.entity.EducationDetails;
import com.example.entity.LeaveBalance;
import com.example.entity.LeaveRequest;
import com.example.entity.User;




public class UserResponseDto extends CommonApiResponse {

	private List<User>user=new ArrayList<>();
	private User singleuser;
	
	private List<LeaveBalance>leaveBalance=new ArrayList<>();
	private List<LeaveRequest>leaverequest=new ArrayList<>();
	
	
	private List<BankDetails>listBankdetails=new ArrayList<>();
	
	private BankDetails bankdetails;
	
	private List<EducationDetails>listEducationDetails=new ArrayList<>();

	public List<User> getUser() {
		return user;
	}

	public void setUser(List<User> user) {
		this.user = user;
	}

	public User getSingleuser() {
		return singleuser;
	}

	public void setSingleuser(User singleuser) {
		this.singleuser = singleuser;
	}

	public List<LeaveBalance> getLeaveBalance() {
		return leaveBalance;
	}

	public void setLeaveBalance(List<LeaveBalance> leaveBalance) {
		this.leaveBalance = leaveBalance;
	}

	public List<LeaveRequest> getLeaverequest() {
		return leaverequest;
	}

	public void setLeaverequest(List<LeaveRequest> leaverequest) {
		this.leaverequest = leaverequest;
	}

	public List<BankDetails> getListBankdetails() {
		return listBankdetails;
	}

	public void setListBankdetails(List<BankDetails> listBankdetails) {
		this.listBankdetails = listBankdetails;
	}

	public BankDetails getBankdetails() {
		return bankdetails;
	}

	public void setBankdetails(BankDetails bankdetails) {
		this.bankdetails = bankdetails;
	}

	public List<EducationDetails> getListEducationDetails() {
		return listEducationDetails;
	}

	public void setListEducationDetails(List<EducationDetails> listEducationDetails) {
		this.listEducationDetails = listEducationDetails;
	}
}
