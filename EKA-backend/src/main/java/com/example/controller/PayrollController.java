package com.example.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.entity.Payslip;
import com.example.service.PayrollService;

 

@RestController
@RequestMapping("/payroll")
public class PayrollController {

    @Autowired
    private PayrollService payrollService;

    @PostMapping("/generate-payslips")
    public void generatePayslips() {
        payrollService.generateAndSendPayslips();
    }
    
    @PostMapping("/generate-payslip/{employeeId}")
    public ResponseEntity<String> generatePayslipById(@PathVariable Long employeeId) {
        boolean result = payrollService.generateAndSendPayslipById(employeeId);
        if (result) {
            return ResponseEntity.ok("Payslip generated and sent to employee with ID: " + employeeId);
        } else {
            return ResponseEntity.badRequest().body("Failed to generate payslip for employee with ID: " + employeeId);
        }
    }

	/*
	 * @GetMapping("/payslip/{payslipId}") public ResponseEntity<Payslip>
	 * getPayslipById(@PathVariable Long payslipId) { Payslip payslip =
	 * payrollService.getPayslipById(payslipId); if (payslip != null) { return
	 * ResponseEntity.ok(payslip); } else { return
	 * ResponseEntity.notFound().build(); } }
	 */
    
    
    
    
    @PostMapping("/create")
    public ResponseEntity<Payslip> createPayslip(@RequestBody Payslip payslip) {
        Payslip savedPayslip = payrollService.savePayslip(payslip);
        if (payslip != null) {
            return ResponseEntity.ok(payslip);
        } else {
            return ResponseEntity.notFound().build();
        }    }

    @GetMapping("/getall")
    public ResponseEntity<List<Payslip>> getAllPayslips() {
        List<Payslip> payslips = payrollService.getAllPayslips();
        return ResponseEntity.ok(payslips);
    }

    @GetMapping("/get{id}")
    public ResponseEntity<Payslip> getPayslipById1(@PathVariable Long id) {
        Optional<Payslip> payslip = payrollService.getPayslipById(id);
        return payslip.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/put{id}")
    public ResponseEntity<Payslip> updatePayslip(@PathVariable Long id, @RequestBody Payslip payslipDetails) {
        Optional<Payslip> payslipOptional = payrollService.getPayslipById(id);
        if (!payslipOptional.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Payslip payslip = payslipOptional.get();
        payslip.setName(payslipDetails.getName());
        payslip.setEmail(payslipDetails.getEmail());
        payslip.setUan(payslipDetails.getUan());
        payslip.setPan(payslipDetails.getPan());
        payslip.setDesignation(payslipDetails.getDesignation());
        payslip.setDepartment(payslipDetails.getDepartment());
        payslip.setBankName(payslipDetails.getBankName());
        payslip.setBankAccountNumber(payslipDetails.getBankAccountNumber());
        payslip.setJoiningDate(payslipDetails.getJoiningDate());
        payslip.setBasicSalary(payslipDetails.getBasicSalary());
        payslip.setHra(payslipDetails.getHra());
        payslip.setConveyanceAllowance(payslipDetails.getConveyanceAllowance());
        payslip.setMedicalAllowance(payslipDetails.getMedicalAllowance());
        payslip.setOtherAllowance(payslipDetails.getOtherAllowance());
        payslip.setHealthInsurance(payslipDetails.getHealthInsurance());
        payslip.setProfessionalTax(payslipDetails.getProfessionalTax());

        Payslip updatedPayslip = payrollService.savePayslip(payslip);
        return ResponseEntity.ok(updatedPayslip);
    }

	/*
	 * @DeleteMapping("/delete{id}") public ResponseEntity<Void>
	 * deletePayslip(@PathVariable Long id) { Optional<Payslip> payslipOptional =
	 * payrollService.getPayslipById(id); if (!payslipOptional.isPresent()) { return
	 * ResponseEntity.notFound().build(); }
	 * 
	 * payrollService.deletePayslip(id); return ResponseEntity.noContent().build();
	 * }
	 */
}
