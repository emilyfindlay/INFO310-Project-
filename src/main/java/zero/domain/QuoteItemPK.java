package zero.domain;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class QuoteItemPK implements Serializable {

    @Column(name = "quote_id")
    private Long quoteId;

    @Column(name = "product_id")
    private Long productId;

    public QuoteItemPK() {}

    @JsonCreator
    public QuoteItemPK(@JsonProperty("quoteId") Long quoteId,
                       @JsonProperty("productId") Long productId) {
        this.quoteId = quoteId;
        this.productId = productId;
    }

    public Long getQuoteId() {
        return quoteId;
    }

    public void setQuoteId(Long quoteId) {
        this.quoteId = quoteId;
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
        if (!(o instanceof QuoteItemPK)) return false;
        QuoteItemPK that = (QuoteItemPK) o;
        return Objects.equals(quoteId, that.quoteId) &&
                Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(quoteId, productId);
    }
}
