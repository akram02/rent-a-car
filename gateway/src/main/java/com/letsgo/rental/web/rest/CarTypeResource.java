package com.letsgo.rental.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.letsgo.rental.domain.CarType;
import com.letsgo.rental.service.CarTypeService;
import com.letsgo.rental.web.rest.errors.BadRequestAlertException;
import com.letsgo.rental.web.rest.util.HeaderUtil;
import com.letsgo.rental.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CarType.
 */
@RestController
@RequestMapping("/api")
public class CarTypeResource {

    private final Logger log = LoggerFactory.getLogger(CarTypeResource.class);

    private static final String ENTITY_NAME = "carType";

    private final CarTypeService carTypeService;

    public CarTypeResource(CarTypeService carTypeService) {
        this.carTypeService = carTypeService;
    }

    /**
     * POST  /car-types : Create a new carType.
     *
     * @param carType the carType to create
     * @return the ResponseEntity with status 201 (Created) and with body the new carType, or with status 400 (Bad Request) if the carType has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/car-types")
    @Timed
    public ResponseEntity<CarType> createCarType(@Valid @RequestBody CarType carType) throws URISyntaxException {
        log.debug("REST request to save CarType : {}", carType);
        if (carType.getId() != null) {
            throw new BadRequestAlertException("A new carType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CarType result = carTypeService.save(carType);
        return ResponseEntity.created(new URI("/api/car-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /car-types : Updates an existing carType.
     *
     * @param carType the carType to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated carType,
     * or with status 400 (Bad Request) if the carType is not valid,
     * or with status 500 (Internal Server Error) if the carType couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/car-types")
    @Timed
    public ResponseEntity<CarType> updateCarType(@Valid @RequestBody CarType carType) throws URISyntaxException {
        log.debug("REST request to update CarType : {}", carType);
        if (carType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CarType result = carTypeService.save(carType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, carType.getId().toString()))
            .body(result);
    }

    /**
     * GET  /car-types : get all the carTypes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of carTypes in body
     */
    @GetMapping("/car-types")
    @Timed
    public ResponseEntity<List<CarType>> getAllCarTypes(Pageable pageable) {
        log.debug("REST request to get a page of CarTypes");
        Page<CarType> page = carTypeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/car-types");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /car-types/:id : get the "id" carType.
     *
     * @param id the id of the carType to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the carType, or with status 404 (Not Found)
     */
    @GetMapping("/car-types/{id}")
    @Timed
    public ResponseEntity<CarType> getCarType(@PathVariable Long id) {
        log.debug("REST request to get CarType : {}", id);
        Optional<CarType> carType = carTypeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(carType);
    }

    /**
     * DELETE  /car-types/:id : delete the "id" carType.
     *
     * @param id the id of the carType to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/car-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteCarType(@PathVariable Long id) {
        log.debug("REST request to delete CarType : {}", id);
        carTypeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
