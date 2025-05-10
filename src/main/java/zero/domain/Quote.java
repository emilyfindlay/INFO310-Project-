package zero.domain;

import jakarta.persistence.*;
import net.sf.oval.constraint.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.Objects;

@Entity
@Table(name = "quote")
public class Quote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "quote_id")
    private Long quoteId;

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

    @NotNull(message = "expiry date must be provided")
    @Future(message = "expiry date must be in the future")
    @Column(name = "expiry_date", nullable = false)
    private LocalDate expiryDate;

    @NotNull(message = "status must be provided")
    @NotBlank(message = "status must be provided")
    @Range(min = 2, max = 20, message = "status must be greater than 2 characters and less than 50 characters")
    @Column(name = "status", nullable = false, length = 20)
    private String status;

    @NotNull(message = "total gst must be provided")
    @Column(name = "total_gst", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalGst;

    @NotNull(message = "quote total must be provided")
    @Column(name = "quote_total", nullable = false, precision = 10, scale = 2)
    private BigDecimal quoteTotal;

    @OneToMany(mappedBy = "quote", cascade = CascadeType.ALL)
    private Collection<QuoteItem> quoteItems;

    @Column(name = "deleted", nullable = false)
    private boolean deleted;

    public Quote(Client client, Business business, Collection<QuoteItem> quoteItems,
                 LocalDate issuedDate, LocalDate expiryDate, String status,
                 BigDecimal totalGst, BigDecimal quoteTotal) {
        this.client = client;
        this.business = business;
        this.quoteItems = quoteItems;
        this.issuedDate = issuedDate;
        this.expiryDate = expiryDate;
        this.status = status;
        this.totalGst = totalGst;
        this.quoteTotal = quoteTotal;
        this.creationDate = LocalDate.now();
    }

    public Quote() {
        this.creationDate = LocalDate.now();
    }

    public BigDecimal getTotalGst() {
        BigDecimal gstRate = new BigDecimal("0.15");
        return quoteItems.stream()
                .map(item -> item.getSubtotal().multiply(gstRate))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public BigDecimal getQuoteTotal() {
        BigDecimal total = quoteItems.stream()
                .map(QuoteItem::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        return total.add(getTotalGst());
    }

    public void addItem(QuoteItem item) {
        this.quoteItems.add(item);
        item.setQuote(this);
    }

    public Long getQuoteId() {
        return quoteId;
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

    public LocalDate getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(LocalDate expiryDate) {
        this.expiryDate = expiryDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Collection<QuoteItem> getQuoteItems() {
        return quoteItems;
    }

    public void setQuoteItems(Collection<QuoteItem> quoteItems) {
        this.quoteItems = quoteItems;
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
        if (!(o instanceof Quote)) return false;
        Quote quote = (Quote) o;
        return Objects.equals(quoteId, quote.quoteId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(quoteId);
    }

    @Override
    public String toString() {
        return "Quote{" +
                "quoteId=" + quoteId +
                ", client=" + client +
                ", business=" + business +
                ", issuedDate=" + issuedDate +
                ", creationDate=" + creationDate +
                ", expiryDate=" + expiryDate +
                ", status='" + status + '\'' +
                ", totalGst=" + totalGst +
                ", quoteTotal=" + quoteTotal +
                ", quoteItems=" + quoteItems +
                '}';
    }

    public Business getBusiness() {
        return business;
    }

    public Client getClient() {
        return client;
    }
}
