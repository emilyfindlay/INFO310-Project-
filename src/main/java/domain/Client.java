/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package domain;

import jakarta.persistence.*;
import java.util.Objects;
import net.sf.oval.constraint.Email;
import net.sf.oval.constraint.Length;
import net.sf.oval.constraint.NotBlank;
import net.sf.oval.constraint.NotNull;
import net.sf.oval.constraint.Range;

/**
 *
 * @author kevin
 * 
 * 
 * TODO: Add address fields 
 */
@Entity
@Table(name = "client")
public class Client {
    
    @NotNull(message = "client ID must be provided")
    @Length(min = 2, message = "client ID must have more than 2 characters")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "client_id")
    private Integer clientId;

    @Length(min = 2, message = "address ID must have more than 2 characters")
    @ManyToOne
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @NotNull(message = "name must be provided") 
    @NotBlank(message = "name must be provided") 
    @Range(min = 2, max = 50, message = "name must be greater than 2 characters and less than 50 characters")
    @Column(name = "name", nullable = false, length = 50)
    private String name;

    @NotNull(message = "email must be provided") 
    @NotBlank(message = "email must be provided") 
    @Range(min = 2, max = 50, message = "email must be greater than 2 characters and less than 50 characters")
    @Column(name = "email", nullable = false, length = 50, unique = true)
    private String email;

    @Range(min = 2, max = 10, message = "phone number must be more than 2 characters and less than 10 characters")
    @Column(name = "phone", length = 10)
    private String phone;

    public Client() {}

    public Client(Integer clientId, Address address, String name, String email, String phone) {
        this.clientId = clientId;
        this.address = address;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }

    public Integer getClientId() {
        return clientId;
    }

    public void setClientId(Integer clientId) {
        this.clientId = clientId;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Client client = (Client) o;
        return Objects.equals(clientId, client.clientId) && 
               Objects.equals(email, client.email);
    }

    @Override
    public int hashCode() {
        return Objects.hash(clientId, email);
    }

    @Override
    public String toString() {
        return "Client{" +
               "clientId=" + clientId +
               ", name='" + name + '\'' +
               ", email='" + email + '\'' +
               '}';
    }
    
}
