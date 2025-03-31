/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

import net.sf.oval.constraint.Length;
import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotNull;

/**
 *
 * @author kevin
 */
public class Invoice {
    private Integer invoiceId;
    @NotNull(message = "ID must be provided.")
    @NotBlank(message = "ID must be provided.")
    @Length(min = 2, message = "ID must contain at least two characters.")
    private LocalDate date;
    @NotNull(message = "date must be provided.")
    @NotBlank(message = "date must be provided.")
    private LocalDate creationDate;
    @NotNull(message = "creation date must be provided")
    @NotBlank(message = "creation date must be provided")
    private LocalDate dueDate;
    @NotNull(message = "due date must be provided")
    @NotBlank(message = "due date must be provided")
    private LocalDate datePaid;
    @NotNull(message = "date paid must be provided") 
    @NotBlank(message = "date paid must be provided") 
    private Integer clientID;
    @NotNull(message = "client ID must be provided") 
    @NotBlank(message = "client ID must be provided")
    private Integer transactionID;
    @NotNull(message = "transaction ID must be provided") 
    @NotBlank(message = "transaction ID must be provided") 
    private String status;
    @NotNull(message = "status must be provided") 
    @NotBlank(message = "status must be provided")
    private boolean isPaid;
    private BigDecimal totalGst;
    @NotNull(message = "total gst must be provided") 
    @NotBlank(message = "total gst must be provided")
    private BigDecimal invoiceTotal;
    @NotNull(message = "invoice total must be provided")
    @NotBlank(message = "invoice total must be provided")

    
    public Invoice(){
        
        
    }
    
    
    public Invoice(Integer invoiceId, LocalDate date, LocalDate creationDate, LocalDate dueDate, LocalDate datePaid, Integer clientID, Integer transactionID, String status, boolean isPaid, BigDecimal totalGst, BigDecimal invoiceTotal) {
        this.invoiceId = invoiceId;
        this.date = date;
        this.creationDate = creationDate;
        this.dueDate = dueDate;
        this.datePaid = datePaid;
        this.clientID = clientID;
        this.transactionID = transactionID;
        this.status = status;
        this.isPaid = isPaid;
        this.totalGst = totalGst;
        this.invoiceTotal = invoiceTotal;
    }

    public Integer getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Integer invoiceId) {
        this.invoiceId = invoiceId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getDatePaid() {
        return datePaid;
    }

    public void setDatePaid(LocalDate datePaid) {
        this.datePaid = datePaid;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isIsPaid() {
        return isPaid;
    }

    public void setIsPaid(boolean isPaid) {
        this.isPaid = isPaid;
    }

    public BigDecimal getTotalGst() {
        return totalGst;
    }

    public void setTotalGst(BigDecimal totalGst) {
        this.totalGst = totalGst;
    }

    public BigDecimal getInvoiceTotal() {
        return invoiceTotal;
    }

    public void setInvoiceTotal(BigDecimal invoiceTotal) {
        this.invoiceTotal = invoiceTotal;
    }
    
    public Integer clientID() {
        return clientID;
    }
    
    public Integer transactionID(){
        return transactionID;
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
