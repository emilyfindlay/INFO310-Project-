package zero.dto;

import java.time.LocalDate;
import java.util.List;

public class QuoteDTO {
    public Long clientId;
    public Long businessId;
    public LocalDate issuedDate;
    public LocalDate expiryDate;
    public String status;
    public List<QuoteItemDTO> quoteItems;
}
