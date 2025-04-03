/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "business")
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "business_id")
    private Integer businessId;

    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @Column(name = "business_name", nullable = false, length = 50)
    private String businessName;

    @Column(name = "bank_account_name", nullable = false, length = 50)
    private String bankAccountName;

    @Column(name = "business_description")
    private String businessDescription;

    @Column(name = "gst_number", length = 15)
    private String gstNumber;

    @Column(name = "email", nullable = false, length = 50)
    private String email;

    @Column(name = "phone", nullable = false, length = 10)
    private String phone;

    @Column(name = "website_link", length = 255)
    private String websiteLink;

    @Lob
    @Column(name = "logo")
    private byte[] logo;

    public Business() {}

    public Business(Integer businessId, Address address, String businessName,
                   String bankAccountName, String businessDescription,
                   String gstNumber, String email, String phone,
                   String websiteLink, byte[] logo) {
        this.businessId = businessId;
        this.address = address;
        this.businessName = businessName;
        this.bankAccountName = bankAccountName;
        this.businessDescription = businessDescription;
        this.gstNumber = gstNumber;
        this.email = email;
        this.phone = phone;
        this.websiteLink = websiteLink;
        this.logo = logo;
    }

    public Integer getBusinessId() {
        return businessId;
    }

    public void setBusinessId(Integer businessId) {
        this.businessId = businessId;
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

    public String getBankAccountName() {
        return bankAccountName;
    }

    public void setBankAccountName(String bankAccountName) {
        this.bankAccountName = bankAccountName;
    }

    public String getBusinessDescription() {
        return businessDescription;
    }

    public void setBusinessDescription(String businessDescription) {
        this.businessDescription = businessDescription;
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

    public byte[] getLogo() {
        return logo;
    }

    public void setLogo(byte[] logo) {
        this.logo = logo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Business business = (Business) o;
        return Objects.equals(businessId, business.businessId);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(businessId);
    }

    @Override
    public String toString() {
        return "Business{" +
               "businessId=" + businessId +
               ", businessName='" + businessName + '\'' +
               ", email='" + email + '\'' +
               '}';
    }
}