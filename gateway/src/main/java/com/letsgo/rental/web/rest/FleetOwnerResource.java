package com.letsgo.rental.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.letsgo.rental.domain.FleetOwner;
import com.letsgo.rental.service.FleetOwnerService;
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
 * REST controller for managing FleetOwner.
 */
@RestController
@RequestMapping("/api")
public class FleetOwnerResource {

    private final Logger log = LoggerFactory.getLogger(FleetOwnerResource.class);

    private static final String ENTITY_NAME = "fleetOwner";

    private final FleetOwnerService fleetOwnerService;

    public FleetOwnerResource(FleetOwnerService fleetOwnerService) {
        this.fleetOwnerService = fleetOwnerService;
    }

    /**
     * POST  /fleet-owners : Create a new fleetOwner.
     *
     * @param fleetOwner the fleetOwner to create
     * @return the ResponseEntity with status 201 (Created) and with body the new fleetOwner, or with status 400 (Bad Request) if the fleetOwner has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/fleet-owners")
    @Timed
    public ResponseEntity<FleetOwner> createFleetOwner(@Valid @RequestBody FleetOwner fleetOwner) throws URISyntaxException {
        log.debug("REST request to save FleetOwner : {}", fleetOwner);
        if (fleetOwner.getId() != null) {
            throw new BadRequestAlertException("A new fleetOwner cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FleetOwner result = fleetOwnerService.save(fleetOwner);
        return ResponseEntity.created(new URI("/api/fleet-owners/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /fleet-owners : Updates an existing fleetOwner.
     *
     * @param fleetOwner the fleetOwner to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated fleetOwner,
     * or with status 400 (Bad Request) if the fleetOwner is not valid,
     * or with status 500 (Internal Server Error) if the fleetOwner couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/fleet-owners")
    @Timed
    public ResponseEntity<FleetOwner> updateFleetOwner(@Valid @RequestBody FleetOwner fleetOwner) throws URISyntaxException {
        log.debug("REST request to update FleetOwner : {}", fleetOwner);
        if (fleetOwner.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FleetOwner result = fleetOwnerService.save(fleetOwner);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, fleetOwner.getId().toString()))
            .body(result);
    }

    /**
     * GET  /fleet-owners : get all the fleetOwners.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of fleetOwners in body
     */
    @GetMapping("/fleet-owners")
    @Timed
    public ResponseEntity<List<FleetOwner>> getAllFleetOwners(Pageable pageable) {
        log.debug("REST request to get a page of FleetOwners");
        Page<FleetOwner> page = fleetOwnerService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/fleet-owners");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /fleet-owners/:id : get the "id" fleetOwner.
     *
     * @param id the id of the fleetOwner to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the fleetOwner, or with status 404 (Not Found)
     */
    @GetMapping("/fleet-owners/{id}")
    @Timed
    public ResponseEntity<FleetOwner> getFleetOwner(@PathVariable Long id) {
        log.debug("REST request to get FleetOwner : {}", id);
        Optional<FleetOwner> fleetOwner = fleetOwnerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(fleetOwner);
    }

    /**
     * DELETE  /fleet-owners/:id : delete the "id" fleetOwner.
     *
     * @param id the id of the fleetOwner to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/fleet-owners/{id}")
    @Timed
    public ResponseEntity<Void> deleteFleetOwner(@PathVariable Long id) {
        log.debug("REST request to delete FleetOwner : {}", id);
        fleetOwnerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
