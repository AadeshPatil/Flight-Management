package com.flight.passengerdetails.repository;

import java.util.List;

import com.flight.passengerdetails.model.Passenger;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PassengerRepo extends MongoRepository<Passenger, Long> {

    public Passenger findById(long id);

    public List<Passenger> findByFirstNameAndLastName(String firstName, String lastName);

    public List<Passenger> findByFirstName(String firstName);

    public void deleteByFirstName(String firstName);

}