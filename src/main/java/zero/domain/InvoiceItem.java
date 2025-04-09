package zero.domain;

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
    private BigDecimal unitPrice;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false, insertable = false, updatable = false)
    private Invoice invoice;


    public InvoiceItem() {
        // Default constructor
        this.discount = BigDecimal.ZERO;  // Ensuring discount defaults to 0 if not provided
    }

    public InvoiceItem(InvoiceItemPK id, Integer quantity,
                       BigDecimal discount, BigDecimal subtotal, String description, BigDecimal unitPrice) {
        this.id = id;
        this.quantity = quantity;
        this.discount = discount != null ? discount : BigDecimal.ZERO; // If discount is null, set to 0
        this.subtotal = calculateSubtotal(); // Assuming you want subtotal to be calculated here
        this.product.setProdcutDescription(description);
        this.unitPrice = unitPrice;
    }

    public InvoiceItemPK getId() {
        return id;
    }

    public void setId(InvoiceItemPK id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        this.subtotal = calculateSubtotal(); // Recalculate subtotal when quantity changes
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount != null ? discount : BigDecimal.ZERO; // Default to 0 if discount is null
        this.subtotal = calculateSubtotal(); // Recalculate subtotal when discount changes
    }

    public BigDecimal getSubtotal() {
        return subtotal != null ? subtotal : calculateSubtotal();
    }

    private BigDecimal calculateSubtotal() {
        return unitPrice.multiply(new BigDecimal(quantity)).subtract(discount);
    }

    public String getDescription() {
        return product.getProdcutDescription();
    }

    public void setDescription(String description) {
        this.product.setProdcutDescription(description);
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        this.subtotal = calculateSubtotal(); // Recalculate subtotal when unitPrice changes
    }

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
}
