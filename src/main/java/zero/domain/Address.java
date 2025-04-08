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
@Table(name = "address")
public class Address {

        //address ID created by DB
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "address_id")
    private Integer addressId;

    @NotNull(message = "Street Address must be provided")
    @NotBlank(message = "Street address must be provided")
    @Range(min = 2, max = 50, message = "Street address must be greater than two and less than 50")
    @Column(name = "street_address1", nullable = false, length = 50)
    private String streetAddress1;

    @Range(min = 2, max = 50, message = "Street address must be greater than two and less than 50")
    @Column(name = "street_address2", length = 50)
    private String streetAddress2;

    @NotNull(message = "city must be provided")
    @NotBlank(message = "city must be provided")
    @Range(min = 2, max = 50, message = "City must be greater than two and less than 50")
    @Column(name = "city", nullable = false, length = 50)
    private String city;

    @Range(min = 2, max = 50, message = "Region must be greater than two and less than 50")
    @Column(name = "region", length = 50)
    private String region;

    @NotNull(message = "Post Code must be provided")
    @NotBlank(message = "Post Code must be provided")
    @Length(max = 10, message = "Post Code must be less than 10")
    @Column(name = "post_code", nullable = false, length = 10)
    private String postCode;  // Changed from Integer to String to match schema


    @Range(min = 2, max = 50, message = "Post Code must be greater than two and less than 50")
    @Column(name = "country", nullable = false, length = 50)
    private String country;

    public Address() {

    }

    public Address(Integer addressId, String streetAddress1, String streetAddress2, String city, String region, String postCode, String country) {
        this.streetAddress1 = streetAddress1;
        this.city = city;
        this.postCode = postCode;
    }

    public Integer getAddressId() {
        return addressId;
    }


    public String getStreetAddress1() {
        return streetAddress1;
    }

    public void setStreetAddress1(String streetAddress1) {
        this.streetAddress1 = streetAddress1;
    }

    public String getStreetAddress2() {
        return streetAddress2;
    }

    public void getStreetAddress2(String streetAddress2) {
        this.streetAddress2 = streetAddress2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getPostCode() {
        return postCode;
    }

    public void setPostCode(String postCode) {
        this.postCode = postCode;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Address address = (Address) o;
        return Objects.equals(addressId, address.addressId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(addressId);
    }

    @Override
    public String toString() {
        return "Address{"
                + "addressId=" + addressId
                + ", streetAddress1='" + streetAddress1 + '\''
                + ", streetAddress2='" + streetAddress2 + '\''
                + ", city='" + city + '\''
                + ", region='" + region + '\''
                + ", postCode='" + postCode + '\''
                + ", country='" + country + '\''
                + '}';
    }

}
