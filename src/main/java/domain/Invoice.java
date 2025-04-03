/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;
import java.util.Objects;


/**
 *
 * @author kevin
 */
public class Invoice {
    private Integer invoiceId;
    private Integer clientId;
    private Integer businessId;
    private Integer productCode;
    private Date issuedDate;
    private Date dueDate;
    private String status;
    private BigDecimal totalGST;
    private BigDecimal invoiceTotal;

    
    public Invoice(){
          
    }
    
    
    public Invoice(Integer invoiceId, Integer clientId, Integer businessId, Integer productCode, Date issuedDate, Date dueDate, String status, BigDecimal totalGST, BigDecimal invoiceTotal) {
        this.invoiceId = invoiceId;
        this.clientId = clientId;
        this.businessId = businessId;
        this.productCode = productCode;
        this.issuedDate = issuedDate;
        this.dueDate = dueDate;
        this.status = status;
        this.totalGST = totalGST;
        this.invoiceTotal = invoiceTotal;
    }

    public Integer getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Integer invoiceId) {
        this.invoiceId = invoiceId;
    }
    
    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }
    
    public Integer getClientId() {
        return clientId;
    }
    
    public Integer getBusinessId() {
        return businessId;
    }
    
    public void setBusinessId(Integer businessId){
        this.businessId = businessId;
    }
    
    public Integer getProductCode(){
        return productCode;
    }
    
    public void setProductCode(Integer productCode){
        this.productCode = productCode;
    }
    
    public Date getIssuedDate(){
        return issuedDate;
    }
    
    public void setIssuedDate(Date issuedDate){
        this.issuedDate = issuedDate;
    }

    public Date getDueDate(){
        return dueDate;
    }
    
    public void setDueDate(Date dueDate){
        this.dueDate = dueDate;
    }
    
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public BigDecimal getTotalGST(){
        return totalGST;
    }

    public void setTotalGST(BigDecimal totalGST){
        this.totalGST = totalGST;
    }

//    public BigDecimal getInvoiceTotal() {
//        return invoiceTotal;
//    }

    public void setInvoiceTotal(BigDecimal invoiceTotal) {
        this.invoiceTotal = invoiceTotal;
    }
    

    

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 67 * hash + Objects.hashCode(this.invoiceId);
        hash = 67 * hash + Objects.hashCode(this.issuedDate);
        hash = 67 * hash + Objects.hashCode(this.totalGST);
        hash = 67 * hash + Objects.hashCode(this.invoiceTotal);
        return hash;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final Invoice other = (Invoice) obj;
        if (!Objects.equals(this.invoiceId, other.invoiceId)) {
            return false;
        }
        if (!Objects.equals(this.issuedDate, other.issuedDate)) {
            return false;
        }
        if (!Objects.equals(this.totalGST, other.totalGST)) {
            return false;
        }
        return Objects.equals(this.invoiceTotal, other.invoiceTotal);
    }
    
    
    @Override
    public String toString() {
        return "Invoice(" +
               "invoiceId=" + invoiceId +
               ", clientId='" + clientId + '\'' +
               ", businessId='" + businessId + '\'' + 
               ", productCode='" + productCode + '\'' +
               ", issuedDate='" + issuedDate + '\'' + 
               ", dueDate='" + dueDate + '\'' + 
               ", status'" + status + '\'' + 
               ", totalGST'" + totalGST + '\'' + 
               ", invoiceTotal'" + invoiceTotal + '\'' +
               ')';
    }
    
}
