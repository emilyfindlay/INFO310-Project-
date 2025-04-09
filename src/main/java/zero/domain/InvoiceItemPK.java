package zero.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Objects;
import net.sf.oval.constraint.NotNull;

@Embeddable
public class InvoiceItemPK implements Serializable {
    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    @NotNull(message = "invoice must be provided")
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @NotNull(message = "product must be provided")
    private Product product;

    public Invoice getInvoice() {
        return invoice;
    }

    public void setInvoice(Invoice invoice) {
        this.invoice = invoice;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public InvoiceItemPK() {}

    public InvoiceItemPK(Invoice invoice, Product product) {
        this.invoice = invoice;
        this.product = product;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        InvoiceItemPK that = (InvoiceItemPK) o;
        return Objects.equals(invoice, that.invoice) && 
               Objects.equals(product, that.product);
    }

    @Override
    public int hashCode() {
        return Objects.hash(invoice, product);
    }
}