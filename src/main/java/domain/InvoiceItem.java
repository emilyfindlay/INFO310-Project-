package domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "invoice_item")
public class InvoiceItem {
    @EmbeddedId
    private InvoiceItemPK id;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @Column(name = "discount", precision = 5, scale = 2)
    private BigDecimal discount;

    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    public InvoiceItem() {}

    public InvoiceItem(InvoiceItemPK id, Integer quantity, 
                      BigDecimal discount, BigDecimal subtotal) {
        this.id = id;
        this.quantity = quantity;
        this.discount = discount;
        this.subtotal = subtotal;
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
        return subtotal;
    }

    public void setSubtotal(BigDecimal subtotal) {
        this.subtotal = subtotal;
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