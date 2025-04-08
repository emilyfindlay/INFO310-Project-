/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package zero.domain;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.Objects;

import net.sf.oval.constraint.Length;
import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotNull;

@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "product_id")
    private Integer productId;

    @NotNull(message = "product type must be provided")
    @Column(name = "product_type", nullable = false)
    private Boolean productType;

    @NotNull(message = "product name must be provided")
    @NotBlank(message = "product name must be provided")
    @Length(min = 2, max = 50, message = "product name must be between 2 and 50 characters")
    @Column(name = "user_defined_product_name", nullable = false, length = 50)
    private String productName;

    @NotNull(message = "product price is not provided")
    @Column(name = "product_price", nullable = false, precision = 10, scale = 2)
    private BigDecimal productPrice;

    @NotNull(message = "product description is not provided")
    @Column(name = "product_description", nullable = false, length = 255)
    private String productDescription;

    public Product() {}

    public Product(Boolean productType, String productName, BigDecimal productPrice) {
        this.productType = productType;
        this.productName = productName;
        this.productPrice = productPrice;
    }

    public Integer getProductId() {
        return productId;
    }

    public Boolean getProductType() {
        return productType;
    }

    public void setProductType(Boolean productType) {
        this.productType = productType;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(BigDecimal productPrice) {
        this.productPrice = productPrice;
    }

    public String getProdcutDescription() {
        return productDescription;
    }

    public void setProdcutDescription(String prodcutDescription) {
        this.productDescription = prodcutDescription;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Product product = (Product) o;
        return Objects.equals(productId, product.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(productId);
    }

    @Override
    public String toString() {
        return "Product{" +
               "productId=" + productId +
               ", productType=" + productType +
               ", productName='" + productName + '\'' +
               ", productPrice=" + productPrice +
               '}';
    }
}