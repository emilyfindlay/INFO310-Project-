package zero.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;
import net.sf.oval.constraint.NotNull;

@Entity
@Table(name = "invoice_item")
public class InvoiceItem {

    @EmbeddedId
    private InvoiceItemPK id;

    @NotNull(message = "Quantity is required.")
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull(message = "Discount is required")
    @Column(name = "discount", precision = 5, scale = 2)
    private BigDecimal discount;

    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @ManyToOne
@JoinColumn(name = "product_id", nullable = false, insertable = false, updatable = false)
private Product product;

    @NotNull(message = "Unit price is required")
    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;

    @ManyToOne
@JoinColumn(name = "invoice_id", nullable = false, insertable = false, updatable = false)
    @JsonBackReference
private Invoice invoice;


    // Default constructor
    public InvoiceItem() {
        this.discount = BigDecimal.ZERO;  // Default discount to 0 if not provided
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getId() {
        return id.hashCode();
    }

    public void setId(InvoiceItemPK id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        this.subtotal = calculateSubtotal();  // Recalculate subtotal when quantity changes
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = (discount != null) ? discount : BigDecimal.ZERO;  // Default discount to 0 if null
        this.subtotal = calculateSubtotal();  // Recalculate subtotal when discount changes
    }

    public BigDecimal getSubtotal() {
        return calculateSubtotal();  // Always calculate subtotal dynamically
    }

    // Calculate subtotal dynamically (only when needed)
    private BigDecimal calculateSubtotal() {
        if (unitPrice == null || quantity == null || discount == null) {
            return BigDecimal.ZERO;  // Return 0 if any value is missing
        }
        return unitPrice.multiply(new BigDecimal(quantity)).subtract(discount);
    }


    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        this.subtotal = calculateSubtotal();  // Recalculate subtotal when unitPrice changes
    }

    // Equals and hashCode based on the embedded primary key
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InvoiceItem that = (InvoiceItem) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }
    
    @Override
    public String toString() {
        return "InvoiceItem{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", discount=" + discount +
                ", subtotal=" + subtotal +
                ", product=" + product +
                ", unitPrice=" + unitPrice +
                ", invoice=" + invoice +
                ", prod desc=" + product.getProductDescription() + "}";
    }
}
