package com.flight.bookingdetails.dao;

import java.math.BigInteger;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.flight.bookingdetails.model.Booking;

@Repository
public interface BookingDao extends CrudRepository<Booking, BigInteger> {

}