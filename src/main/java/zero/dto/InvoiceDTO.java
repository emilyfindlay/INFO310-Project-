package zero.dto;

import java.time.LocalDate;

public class InvoiceDTO {
    public Long clientId;
    public Long businessId;
    public LocalDate issuedDate;
    public LocalDate dueDate;
    public String status;
}
