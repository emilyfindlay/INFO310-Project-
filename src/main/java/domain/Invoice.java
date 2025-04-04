/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;
import net.sf.oval.constraint.Future;
import net.sf.oval.constraint.Length;
import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.constraint.Past;
import net.sf.oval.constraint.Range;


/**
 *
 * @author kevin
 */
@Entity
@Table(name = "invoice")
public class Invoice {
    @NotNull(message="invoice ID is not provided") 
    @Length(min = 2, message = "invoice ID must be more than 2 characters")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Integer invoiceId;

    @NotNull(message = "client ID is not provided")
    @Length(min = 2, message = "client ID must be greater than 2 characters") 
    @ManyToOne
    @JoinColumn(name = "client_id", nullable = false)
    private Client client;

    @ManyToOne
    @JoinColumn(name = "business_id", nullable = false)
    @NotNull(message = "business ID is not provided") 
    @Length(min = 2, message = "business ID must be greater than 2") 
    private Business business;

    @NotNull(message = "product ID is not provided") 
    @Length(min = 2, message = "Product ID must be greater than 2 characters")
    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotNull(message = "issued date must be provided")
    @Past(message = "Issued date must be in the past.")
    @Column(name = "issued_date", nullable = false)
    private LocalDate issuedDate;

    @NotNull(message = "due date must be provided")
    @Future(message = "due date must be in the future")
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @NotNull(message = "status must be provided") 
    @NotBlank(message = "status must be provided")
    @Range(min = 2, max = 20, message = "status must be greater than 2 characters and less that 50 characters")
    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @NotNull(message = "total gst must be provided")
    @Column(name = "total_gst", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalGst;

    @NotNull(message = "invoice total must be provided")
    @Column(name = "invoice_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal invoiceTotal;

    public Invoice() {}

    public Invoice(Client client, Business business, Product product, 
                  LocalDate issuedDate, LocalDate dueDate, String status,
                  BigDecimal totalGst, BigDecimal invoiceTotal) {
        this.client = client;
        this.business = business;
        this.product = product;
        this.issuedDate = issuedDate;
        this.dueDate = dueDate;
        this.status = status;
        this.totalGst = totalGst;
        this.invoiceTotal = invoiceTotal;
    }

    public Integer getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Integer invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public LocalDate getIssuedDate() {
        return issuedDate;
    }

    public void setIssuedDate(LocalDate issuedDate) {
        this.issuedDate = issuedDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
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
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Invoice invoice = (Invoice) o;
        return Objects.equals(invoiceId, invoice.invoiceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(invoiceId);
    }

    @Override
    public String toString() {
        return "Invoice{" +
               "invoiceId=" + invoiceId +
               ", issuedDate=" + issuedDate +
               ", totalGst=" + totalGst +
               ", invoiceTotal=" + invoiceTotal +
               '}';
    }
}