/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package zero.domain;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
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
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "invoice_id")
    private Long invoiceId;

    public void setTotalGst(BigDecimal totalGst) {
        this.totalGst = totalGst;
    }

    public void setInvoiceTotal(BigDecimal invoiceTotal) {
        this.invoiceTotal = invoiceTotal;
    }

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

    @Past(message = "Issued date must be in the past.")
    @Column(name = "issued_date", nullable = false)
    private LocalDate issuedDate;

    @Past(message = "Issued date must be in the past.")
    @Column(name = "creation_date", nullable = false)
    private LocalDate creationDate;

    @NotNull(message = "due date must be provided")
    @Future(message = "due date must be in the future")
    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @NotNull(message = "status must be provided")
    @NotBlank(message = "status must be provided")
    @Range(min = 2, max = 20, message = "status must be greater than 2 characters and less than 50 characters")
    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @NotNull(message = "total gst must be provided")
    @Column(name = "total_gst", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalGst;

    @NotNull(message = "invoice total must be provided")
    @Column(name = "invoice_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal invoiceTotal;

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<InvoiceItem> invoiceItems = new ArrayList<>();


    @Column(name = "deleted", nullable = false)
    private boolean deleted;

    public Invoice(Client client, Business business, List<InvoiceItem> invoiceItems,
                   LocalDate issuedDate, LocalDate dueDate, String status,
                   BigDecimal totalGst, BigDecimal invoiceTotal) {
        this.client = client;
        this.business = business;
        this.invoiceItems = invoiceItems;
        this.issuedDate = issuedDate;
        this.dueDate = dueDate;
        this.status = status;
        this.totalGst = totalGst;
        this.invoiceTotal = invoiceTotal;
        this.creationDate = LocalDate.now();
    }

    public Invoice() {
        // Default constructor
        this.creationDate = LocalDate.now();
    }

    public BigDecimal getTotalGst() {
        BigDecimal gstRate = new BigDecimal("0.15");
        return invoiceItems.stream()
                .map(item -> item.getSubtotal().multiply(gstRate))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal getInvoiceTotal() {
        BigDecimal total = invoiceItems.stream()
                .map(InvoiceItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return total.add(getTotalGst());
    }

    public void addItem(InvoiceItem item) {
        this.invoiceItems.add(item);
        item.setInvoice(this);
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public LocalDate getCreationDate() {
        return creationDate;
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

    public List<InvoiceItem> getInvoiceItems() {
        return invoiceItems;
    }

    public void setInvoiceItems(List<InvoiceItem> invoiceItems) {
        this.invoiceItems = invoiceItems;
        if (invoiceItems != null) {
            invoiceItems.forEach(item -> item.setInvoice(this));
        }
    }

    public void setDeleted(boolean deleted) {
        this.deleted = deleted;
    }

    public boolean isDeleted() {
        return deleted;
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
                ", client=" + client +
                ", business=" + business +
                ", issuedDate=" + issuedDate +
                ", creationDate=" + creationDate +
                ", dueDate=" + dueDate +
                ", status='" + status + '\'' +
                ", totalGst=" + totalGst +
                ", invoiceTotal=" + invoiceTotal +
                ", invoiceItems=" + invoiceItems +
                '}';
    }

    public Business getBusiness() {
        return business;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }
}