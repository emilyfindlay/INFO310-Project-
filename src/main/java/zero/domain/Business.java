/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package zero.domain;

import jakarta.persistence.*;
import java.util.Objects;
import net.sf.oval.constraint.Length;
import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.constraint.Range;

@Entity
@Table(name = "business")
public class Business {

        //business ID created by DB
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "business_id")
    private Integer businessId;

    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    @NotNull(message = "Address ID must be provided")
    @Length(min = 2, message = "ID must contain at least two characters.")
    private Address address;

    @Column(name = "business_name", nullable = false, length = 50)
    @NotNull(message = "business name must be provided")
    @NotBlank(message = "business name must be provided") 
    @Range(min = 2, max = 50, message = "business name must be more than 2 characters but less than 50 characters")
    private String businessName;

    @NotNull(message = "bank account name must be provided")
    @NotBlank(message = "bank account name must be provided")
    @Range(min = 2, max = 50, message = "bank account name must be greater than 2 and less than 50")
    @Column(name = "bank_account_number", nullable = false, length = 50)
    private String bankAccountNumber;

    @Range(min = 2, max = 15, message = "GST number has to be greater than 2 and less than 15")
    @Column(name = "gst_number", length = 15)
    private String gstNumber;

    @NotNull(message = "email must be provided")
    @NotBlank(message = "email must be provided")
    @Range(min = 2, max = 50, message = "email must be larger than 2 characters but less than 50 characters")
    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @NotNull(message = "phone must be provided") 
    @NotBlank(message = "phone must be provided") 
    @Range(min = 2, max = 10, message = "phone must be more than 2 characters and less than 10 characters")
    @Column(name = "phone", nullable = false, length = 10)
    private String phone;

    @Length(min = 2, message = "website link must be greater than 2 character")
    @Column(name = "website_link", length = 255)
    private String websiteLink;

    @Column(name = "invoice_footer", length = 255)
    private String invoiceFooter;

    @Column(name = "quote_footer", length = 255)
    private String quoteFooter;
//
//    @Lob
//    @Column(name = "logo")
//    private byte[] logo;


    public Business() {
    }

    public Business(Address address, String businessName,
                    String bankAccountName,
                    String gstNumber, String email, String phone,
                    String websiteLink, String invoiceFooter, String quoteFooter) {
        this.address = address;
        this.businessName = businessName;
        this.bankAccountNumber = bankAccountName;
        this.email = email;
        this.invoiceFooter = invoiceFooter;
        this.quoteFooter = quoteFooter;
    }


    public Integer getBusinessId() {
        return businessId;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getBusinessName() {
        return businessName;
    }

    public void setBusinessName(String businessName) {
        this.businessName = businessName;
    }

    public String getBankAccountNumber() {
        return bankAccountNumber;
    }

    public void setBankAccountNumber(String bankAccountNumber) {
        this.bankAccountNumber = bankAccountNumber;
    }


    public String getGstNumber() {
        return gstNumber;
    }

    public void setGstNumber(String gstNumber) {
        this.gstNumber = gstNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getWebsiteLink() {
        return websiteLink;
    }

    public void setWebsiteLink(String websiteLink) {
        this.websiteLink = websiteLink;
    }

    public String getInvoiceFooter() {
        return invoiceFooter;
    }

    public void setInvoiceFooter(String invoiceFooter) {
        this.invoiceFooter = invoiceFooter;
    }

    public String getQuoteFooter() {
        return quoteFooter;
    }

    public void setQuoteFooter(String quoteFooter) {
        this.quoteFooter = quoteFooter;
    }

    //TODO add logo things
//    public byte[] getLogo() {
//        return logo;
//    }
//
//    public void setLogo(byte[] logo) {
//        this.logo = logo;
//    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Business business = (Business) o;
        return Objects.equals(businessId, business.businessId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(businessId);
    }

    @Override
    public String toString() {
        return "Business{"
                + "businessId=" + businessId
                + ", businessName='" + businessName + '\''
                + ", email='" + email + '\''
                + '}';
    }
}
