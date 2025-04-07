package domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;
import net.sf.oval.constraint.NotNull;

@Entity
@Table(name = "invoice_item")
public class InvoiceItem {
    @EmbeddedId
    @NotNull(message = "Invoice item ID must be provided.")
    private InvoiceItemPK id;

    @NotNull(message = "Quantity is required.")
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull(message = "discount is required")
    @Column(name = "discount", precision = 5, scale = 2)
    private BigDecimal discount;

    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    private String description;

    @NotNull(message = "unitPrice is required")
    private BigDecimal unitPrice;

    public InvoiceItem() {}

    public InvoiceItem(InvoiceItemPK id, Integer quantity,
                       BigDecimal discount, BigDecimal subtotal, String description, BigDecimal unitPrice) {
        this.id = id;
        this.quantity = quantity;
        this.description = description;
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
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = discount;
    }

    public BigDecimal getSubtotal() {
        return unitPrice.multiply(new BigDecimal(quantity)).subtract(discount);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
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