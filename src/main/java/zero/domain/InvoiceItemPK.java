package zero.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import net.sf.oval.constraint.NotNull;

@Embeddable
public class InvoiceItemPK implements Serializable {

    @Column(name = "invoice_id")
    private Long invoiceId;

    @Column(name = "product_id")
    private Long productId;

    public InvoiceItemPK() {}

    @JsonCreator
    public InvoiceItemPK(@JsonProperty("invoiceId") Long invoiceId,
                         @JsonProperty("productId") Long productId) {
        this.invoiceId = invoiceId;
        this.productId = productId;
    }

    public Long getInvoiceId() {
        return invoiceId;
    }

    public void setInvoiceId(Long invoiceId) {
        this.invoiceId = invoiceId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof InvoiceItemPK)) return false;
        InvoiceItemPK that = (InvoiceItemPK) o;
        return Objects.equals(invoiceId, that.invoiceId) &&
                Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(invoiceId, productId);
    }
}
