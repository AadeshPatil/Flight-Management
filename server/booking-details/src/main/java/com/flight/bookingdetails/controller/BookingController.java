package com.flight.bookingdetails.controller;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import com.flight.bookingdetails.exceptions.RecordAlreadyPresentException;
import com.flight.bookingdetails.exceptions.RecordNotFoundException;
import com.flight.bookingdetails.model.Booking;
import com.flight.bookingdetails.service.BookingService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/booking")
public class BookingController {

	Logger logger = LoggerFactory.getLogger(BookingController.class);

	@Autowired(required= true)
	BookingService bookingService;

	@PostMapping("/createBooking")
	@Operation(description = "Add Booking")
	@ApiResponse(responseCode = "200" , description = "Booking Added successfully")
	@ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when booking isn't present!!")
	@ExceptionHandler(RecordAlreadyPresentException.class)
	public String addBooking(@RequestBody Booking newBooking) {

		bookingService.createBooking(newBooking);

		logger.info("[bookingtinfo] info message added");
		logger.warn("[bookinginfo] warn message added");
		return "Record has been Added!";
	}

	
	@SuppressWarnings("null")
	@GetMapping("/readAllBooking/{userId}")
	@Operation(description = "Get Bookings")
	@ApiResponse(responseCode = "200" , description = "Bookings fetched successfully")
	@ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when booking isn't present!!")
	public List<Booking> readAllBookings(@PathVariable("userId") String userId) {

		Iterable<Booking> list =  bookingService.displayAllBooking();
		List<Booking> userBookingList = new ArrayList<Booking>();;
		
		list.forEach(item ->{
			if (item.getUserId().equals(userId)){
				System.out.println(item.getUserId());
				userBookingList.add(item);
			}
		});
		return userBookingList;
		
	}

	@PutMapping("/updateBooking")
	@Operation(description = "Update Booking")
	@ApiResponse(responseCode = "200" , description = "Booking updated successfully")
	@ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when booking isn't present!!")
	@ExceptionHandler(RecordNotFoundException.class)
	public void modifyBooking(@RequestBody Booking updateBooking) {

		bookingService.updateBooking(updateBooking);
	}

	@GetMapping("/searchBooking/{id}")
	@Operation(description = "Get booking by booking id")
	@ApiResponse(responseCode = "200" , description = "Booking fetched successfully")
	@ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when booking isn't present!!")
	@ExceptionHandler(RecordNotFoundException.class)
	public ResponseEntity<?> searchBookingByID(@PathVariable("id") BigInteger bookingId) {

		return bookingService.findBookingById(bookingId);
	}

	@DeleteMapping("/deleteBooking/{id}")
	@Operation(description = "Delete Booking")
	@ApiResponse(responseCode = "200" , description = "Booking deleted successfully")
	@ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when booking isn't present!!")
	@ExceptionHandler(RecordNotFoundException.class)
	public void deleteBookingByID(@PathVariable("id") BigInteger bookingId) {

		bookingService.deleteBooking(bookingId);
	}
}