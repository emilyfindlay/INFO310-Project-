package zero.domain;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import net.sf.oval.constraint.NotNull;

import java.math.BigDecimal;
import java.util.Objects;

@Entity
@Table(name = "quote_item")
public class QuoteItem {

    @EmbeddedId
    private QuoteItemPK id;

    @NotNull(message = "Quantity is required.")
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @NotNull(message = "Discount is required")
    @Column(name = "discount", precision = 5, scale = 2)
    private BigDecimal discount;

    @Column(name = "subtotal", nullable = false, precision = 10, scale = 2)
    private BigDecimal subtotal;

    @ManyToOne
    @MapsId("productId") // maps to field in QuoteItemPK
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotNull(message = "Unit price is required")
    @Column(name = "unit_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitPrice;
    
    @ManyToOne
    @MapsId("quoteId")
    @JoinColumn(name = "quote_id", nullable = false)
    @JsonBackReference
    private Quote quote;

    public QuoteItem() {
        this.discount = BigDecimal.ZERO;
    }

    public QuoteItemPK getId() {
        return id;
    }

    public void setId(QuoteItemPK id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
        this.subtotal = calculateSubtotal();
    }

    public BigDecimal getDiscount() {
        return discount;
    }

    public void setDiscount(BigDecimal discount) {
        this.discount = (discount != null) ? discount : BigDecimal.ZERO;
        this.subtotal = calculateSubtotal();
    }

    public BigDecimal getSubtotal() {
        return calculateSubtotal();
    }

    private BigDecimal calculateSubtotal() {
        if (unitPrice == null || quantity == null || discount == null) {
            return BigDecimal.ZERO;
        }
        return unitPrice.multiply(new BigDecimal(quantity)).subtract(discount);
    }

    public BigDecimal getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
        this.subtotal = calculateSubtotal();
    }

    public Quote getQuote() {
        return quote;
    }

    public void setQuote(Quote quote) {
        this.quote = quote;
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof QuoteItem)) return false;
        QuoteItem that = (QuoteItem) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "QuoteItem{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", discount=" + discount +
                ", subtotal=" + subtotal +
                ", product=" + product +
                ", unitPrice=" + unitPrice +
                ", quoteId=" + quote +
                ", productDesc=" + (product != null ? product.getProductDescription() : "null") +
                '}';
    }
}
