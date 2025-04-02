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


    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }





    public BigDecimal getInvoiceTotal() {
        return invoiceTotal;
    }

    public void setInvoiceTotal(BigDecimal invoiceTotal) {
        this.invoiceTotal = invoiceTotal;
    }
    

    

    @Override
    public int hashCode() {
        int hash = 5;
        hash = 67 * hash + Objects.hashCode(this.invoiceId);
        hash = 67 * hash + Objects.hashCode(this.creationDate);
        hash = 67 * hash + Objects.hashCode(this.totalGst);
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
        if (!Objects.equals(this.creationDate, other.creationDate)) {
            return false;
        }
        if (!Objects.equals(this.totalGst, other.totalGst)) {
            return false;
        }
        return Objects.equals(this.invoiceTotal, other.invoiceTotal);
    }
    
    
    @Override
    public String toString() {
        return "Invoice(" +
               "invoiceId=" + invoiceId +
               ", date=" + date +
               ", creationDate=" + creationDate +
               ", dueDate=" + dueDate +
               ", datePaid=" + datePaid +
               ", clientID=" + clientID +
               ", transactionID=" + transactionID +
               ", status='" + status + '\'' +
               ", isPaid=" + isPaid +
               ", totalGst=" + totalGst +
               ", invoiceTotal=" + invoiceTotal +
               ')';
    }
    
}
