package com.flight.passengerdetails.controller;

import java.util.List;
import java.util.Optional;

import com.flight.passengerdetails.exceptions.PassengerNotFoundException;
import com.flight.passengerdetails.model.Passenger;
import com.flight.passengerdetails.service.PassengerServiceImpl;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/passengers")
@CrossOrigin("http://localhost:4200")
public class PassengerController {



    @Autowired
    private PassengerServiceImpl passengerServiceImpl;

    Logger logger = LoggerFactory.getLogger(PassengerController.class);
    @GetMapping("/")
    @Operation(description = "Get Passengers")
    @ApiResponse(responseCode = "200" , description = "Passengers fetched successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when passenger isn't present!!")
    public ResponseEntity<List<Passenger>> getAllPassengers() {
        try {
            List<Passenger> passengersList = passengerServiceImpl.getAllPassengers();
            return ResponseEntity.of(Optional.of(passengersList));
        } catch (Exception e) {
            e.printStackTrace();

            logger.info("[passengerinfo] info message added");
            logger.warn("[passengerinfo] warn message added");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}")
    @Operation(description = "Get Passenger by Id")
    @ApiResponse(responseCode = "200" , description = "Passengers fetched successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when passenger isn't present!!")
    public ResponseEntity<Passenger> getPassengersById(@PathVariable("id") long id) {
        try {
            Passenger passenger = passengerServiceImpl.getPassengersById(id);
            return ResponseEntity.of(Optional.of(passenger));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/FirstName")
    @Operation(description = "Get Passengers by FirstName")
    @ApiResponse(responseCode = "200" , description = "Passengers fetched successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when Passenger isn't present!!")
    public ResponseEntity<List<Passenger>> getPassengerByFirstName(
            @RequestParam(value = "firstName") String firstName) {
        try {
            List<Passenger> passengerList = passengerServiceImpl.getPassengerByFirstName(firstName);
            return ResponseEntity.of(Optional.of(passengerList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/FirstName-and-LastName")
    @Operation(description = "Get Passengers by First-Name and Last-Name")
    @ApiResponse(responseCode = "200" , description = "Passengers fetched successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when passenger isn't present!!")
    public ResponseEntity<List<Passenger>> getPassengerByFirstNameAndLastName(
            @RequestParam(value = "firstName") String firstName, @RequestParam(value = "lastName") String lastName) {
        try {
            List<Passenger> passengerList = passengerServiceImpl.getPassengerByFirstNameAndLastName(firstName,
                    lastName);
            return ResponseEntity.of(Optional.of(passengerList));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping("/")
    @Operation(description = "Post Passengers")
    @ApiResponse(responseCode = "200" , description = "Passengers posted successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when passenger isn't present!!")
    public ResponseEntity<String> setPassengers(@RequestBody Passenger passenger) {
        try {
            passengerServiceImpl.setPassengers(passenger);
            return ResponseEntity.ok("Passenger Added Successfully!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update/{id}")
    @Operation(description = "Update Flight")
    @ApiResponse(responseCode = "200" , description = "Passengers updated successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when passenger isn't present!!")
    public ResponseEntity<String> updatePassengerById(@RequestBody Passenger passenger, @PathVariable("id") long id)
            throws PassengerNotFoundException {

        try {
            List<Passenger> passengersList = passengerServiceImpl.getAllPassengers();
            boolean flag = false;

            for (Passenger p : passengersList) {
                if (p.getPassengerId() == id) {
                    flag = true;
                    break;
                }
            }

            if (flag == false) {
                throw new PassengerNotFoundException();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Warning: Passenger does not exists");
        }

        Passenger passenger2 = passengerServiceImpl.updateById(passenger);

        return ResponseEntity.ok("Passenger Updated Successfully\nPassenger Updated Details: \n" + passenger2);
    }

    @DeleteMapping("/delete/{id}")
    @Operation(description = "Delete Passenger")
    @ApiResponse(responseCode = "200" , description = "Passenger Deleted successfully")
    @ApiResponse(responseCode = "400" , description = "Bad Request: Occurs when passenger isn't present!!")
    public ResponseEntity<String> deletePassengerById(@PathVariable("id") long id) throws PassengerNotFoundException {
        try {
            List<Passenger> passengersList = passengerServiceImpl.getAllPassengers();
            boolean flag = false;

            for (Passenger p : passengersList) {
                if (p.getPassengerId() == id) {
                    flag = true;
                    break;
                }
            }

            if (flag == false) {
                throw new PassengerNotFoundException();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Warning: Passenger does not exists");
        }
        passengerServiceImpl.deleteById(id);
        return ResponseEntity.ok("Passengers Details Deleted Successfully!");
    }
}