package com.flight.passengerdetails.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Passenger")
public class Passenger {

    @Id
    private long passengerId;
    private String firstName;
    private String lastName;
    private String gender;

    public Passenger() {
        super();
    }

    public Passenger(long passengerId, String firstName, String lastName, String gender) {
        this.passengerId = passengerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
    }

    public long getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(long passengerId) {
        this.passengerId = passengerId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + (int) (passengerId ^ (passengerId >>> 32));
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Passenger other = (Passenger) obj;
        if (passengerId != other.passengerId)
            return false;
        return true;
    }

    @Override
    public String toString() {
        return "Passenger [firstName=" + firstName + ", gender=" + gender + ", lastName=" + lastName + ", passengerId="
                + passengerId + "]";
    }

}