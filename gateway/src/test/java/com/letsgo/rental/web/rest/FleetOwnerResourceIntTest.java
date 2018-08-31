package com.letsgo.rental.web.rest;

import com.letsgo.rental.GatewayApp;

import com.letsgo.rental.domain.FleetOwner;
import com.letsgo.rental.repository.FleetOwnerRepository;
import com.letsgo.rental.service.FleetOwnerService;
import com.letsgo.rental.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.letsgo.rental.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.letsgo.rental.domain.enumeration.Gender;
/**
 * Test class for the FleetOwnerResource REST controller.
 *
 * @see FleetOwnerResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GatewayApp.class)
public class FleetOwnerResourceIntTest {

    private static final String DEFAULT_COMPANY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_COMPANY_NAME = "BBBBBBBBBB";

    private static final Gender DEFAULT_GENDER = Gender.MALE;
    private static final Gender UPDATED_GENDER = Gender.FEMALE;

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_1 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_1 = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS_LINE_2 = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS_LINE_2 = "BBBBBBBBBB";

    private static final String DEFAULT_CITY = "AAAAAAAAAA";
    private static final String UPDATED_CITY = "BBBBBBBBBB";

    private static final String DEFAULT_COUNTRY = "AAAAAAAAAA";
    private static final String UPDATED_COUNTRY = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    private static final Instant DEFAULT_CREATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_AT = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_AT = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private FleetOwnerRepository fleetOwnerRepository;

    

    @Autowired
    private FleetOwnerService fleetOwnerService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restFleetOwnerMockMvc;

    private FleetOwner fleetOwner;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final FleetOwnerResource fleetOwnerResource = new FleetOwnerResource(fleetOwnerService);
        this.restFleetOwnerMockMvc = MockMvcBuilders.standaloneSetup(fleetOwnerResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FleetOwner createEntity(EntityManager em) {
        FleetOwner fleetOwner = new FleetOwner()
            .companyName(DEFAULT_COMPANY_NAME)
            .gender(DEFAULT_GENDER)
            .phone(DEFAULT_PHONE)
            .addressLine1(DEFAULT_ADDRESS_LINE_1)
            .addressLine2(DEFAULT_ADDRESS_LINE_2)
            .city(DEFAULT_CITY)
            .country(DEFAULT_COUNTRY)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return fleetOwner;
    }

    @Before
    public void initTest() {
        fleetOwner = createEntity(em);
    }

    @Test
    @Transactional
    public void createFleetOwner() throws Exception {
        int databaseSizeBeforeCreate = fleetOwnerRepository.findAll().size();

        // Create the FleetOwner
        restFleetOwnerMockMvc.perform(post("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fleetOwner)))
            .andExpect(status().isCreated());

        // Validate the FleetOwner in the database
        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeCreate + 1);
        FleetOwner testFleetOwner = fleetOwnerList.get(fleetOwnerList.size() - 1);
        assertThat(testFleetOwner.getCompanyName()).isEqualTo(DEFAULT_COMPANY_NAME);
        assertThat(testFleetOwner.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testFleetOwner.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testFleetOwner.getAddressLine1()).isEqualTo(DEFAULT_ADDRESS_LINE_1);
        assertThat(testFleetOwner.getAddressLine2()).isEqualTo(DEFAULT_ADDRESS_LINE_2);
        assertThat(testFleetOwner.getCity()).isEqualTo(DEFAULT_CITY);
        assertThat(testFleetOwner.getCountry()).isEqualTo(DEFAULT_COUNTRY);
        assertThat(testFleetOwner.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testFleetOwner.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
        assertThat(testFleetOwner.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testFleetOwner.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createFleetOwnerWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fleetOwnerRepository.findAll().size();

        // Create the FleetOwner with an existing ID
        fleetOwner.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFleetOwnerMockMvc.perform(post("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fleetOwner)))
            .andExpect(status().isBadRequest());

        // Validate the FleetOwner in the database
        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCompanyNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetOwnerRepository.findAll().size();
        // set the field null
        fleetOwner.setCompanyName(null);

        // Create the FleetOwner, which fails.

        restFleetOwnerMockMvc.perform(post("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fleetOwner)))
            .andExpect(status().isBadRequest());

        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkGenderIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetOwnerRepository.findAll().size();
        // set the field null
        fleetOwner.setGender(null);

        // Create the FleetOwner, which fails.

        restFleetOwnerMockMvc.perform(post("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fleetOwner)))
            .andExpect(status().isBadRequest());

        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetOwnerRepository.findAll().size();
        // set the field null
        fleetOwner.setPhone(null);

        // Create the FleetOwner, which fails.

        restFleetOwnerMockMvc.perform(post("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fleetOwner)))
            .andExpect(status().isBadRequest());

        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAddressLine1IsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetOwnerRepository.findAll().size();
        // set the field null
        fleetOwner.setAddressLine1(null);

        // Create the FleetOwner, which fails.

        restFleetOwnerMockMvc.perform(post("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fleetOwner)))
            .andExpect(status().isBadRequest());

        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCityIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetOwnerRepository.findAll().size();
        // set the field null
        fleetOwner.setCity(null);

        // Create the FleetOwner, which fails.

        restFleetOwnerMockMvc.perform(post("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fleetOwner)))
            .andExpect(status().isBadRequest());

        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCountryIsRequired() throws Exception {
        int databaseSizeBeforeTest = fleetOwnerRepository.findAll().size();
        // set the field null
        fleetOwner.setCountry(null);

        // Create the FleetOwner, which fails.

        restFleetOwnerMockMvc.perform(post("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fleetOwner)))
            .andExpect(status().isBadRequest());

        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllFleetOwners() throws Exception {
        // Initialize the database
        fleetOwnerRepository.saveAndFlush(fleetOwner);

        // Get all the fleetOwnerList
        restFleetOwnerMockMvc.perform(get("/api/fleet-owners?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fleetOwner.getId().intValue())))
            .andExpect(jsonPath("$.[*].companyName").value(hasItem(DEFAULT_COMPANY_NAME.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].addressLine1").value(hasItem(DEFAULT_ADDRESS_LINE_1.toString())))
            .andExpect(jsonPath("$.[*].addressLine2").value(hasItem(DEFAULT_ADDRESS_LINE_2.toString())))
            .andExpect(jsonPath("$.[*].city").value(hasItem(DEFAULT_CITY.toString())))
            .andExpect(jsonPath("$.[*].country").value(hasItem(DEFAULT_COUNTRY.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    

    @Test
    @Transactional
    public void getFleetOwner() throws Exception {
        // Initialize the database
        fleetOwnerRepository.saveAndFlush(fleetOwner);

        // Get the fleetOwner
        restFleetOwnerMockMvc.perform(get("/api/fleet-owners/{id}", fleetOwner.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(fleetOwner.getId().intValue()))
            .andExpect(jsonPath("$.companyName").value(DEFAULT_COMPANY_NAME.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.addressLine1").value(DEFAULT_ADDRESS_LINE_1.toString()))
            .andExpect(jsonPath("$.addressLine2").value(DEFAULT_ADDRESS_LINE_2.toString()))
            .andExpect(jsonPath("$.city").value(DEFAULT_CITY.toString()))
            .andExpect(jsonPath("$.country").value(DEFAULT_COUNTRY.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingFleetOwner() throws Exception {
        // Get the fleetOwner
        restFleetOwnerMockMvc.perform(get("/api/fleet-owners/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFleetOwner() throws Exception {
        // Initialize the database
        fleetOwnerService.save(fleetOwner);

        int databaseSizeBeforeUpdate = fleetOwnerRepository.findAll().size();

        // Update the fleetOwner
        FleetOwner updatedFleetOwner = fleetOwnerRepository.findById(fleetOwner.getId()).get();
        // Disconnect from session so that the updates on updatedFleetOwner are not directly saved in db
        em.detach(updatedFleetOwner);
        updatedFleetOwner
            .companyName(UPDATED_COMPANY_NAME)
            .gender(UPDATED_GENDER)
            .phone(UPDATED_PHONE)
            .addressLine1(UPDATED_ADDRESS_LINE_1)
            .addressLine2(UPDATED_ADDRESS_LINE_2)
            .city(UPDATED_CITY)
            .country(UPDATED_COUNTRY)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);

        restFleetOwnerMockMvc.perform(put("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedFleetOwner)))
            .andExpect(status().isOk());

        // Validate the FleetOwner in the database
        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeUpdate);
        FleetOwner testFleetOwner = fleetOwnerList.get(fleetOwnerList.size() - 1);
        assertThat(testFleetOwner.getCompanyName()).isEqualTo(UPDATED_COMPANY_NAME);
        assertThat(testFleetOwner.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testFleetOwner.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testFleetOwner.getAddressLine1()).isEqualTo(UPDATED_ADDRESS_LINE_1);
        assertThat(testFleetOwner.getAddressLine2()).isEqualTo(UPDATED_ADDRESS_LINE_2);
        assertThat(testFleetOwner.getCity()).isEqualTo(UPDATED_CITY);
        assertThat(testFleetOwner.getCountry()).isEqualTo(UPDATED_COUNTRY);
        assertThat(testFleetOwner.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testFleetOwner.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
        assertThat(testFleetOwner.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testFleetOwner.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingFleetOwner() throws Exception {
        int databaseSizeBeforeUpdate = fleetOwnerRepository.findAll().size();

        // Create the FleetOwner

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restFleetOwnerMockMvc.perform(put("/api/fleet-owners")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(fleetOwner)))
            .andExpect(status().isBadRequest());

        // Validate the FleetOwner in the database
        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFleetOwner() throws Exception {
        // Initialize the database
        fleetOwnerService.save(fleetOwner);

        int databaseSizeBeforeDelete = fleetOwnerRepository.findAll().size();

        // Get the fleetOwner
        restFleetOwnerMockMvc.perform(delete("/api/fleet-owners/{id}", fleetOwner.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<FleetOwner> fleetOwnerList = fleetOwnerRepository.findAll();
        assertThat(fleetOwnerList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FleetOwner.class);
        FleetOwner fleetOwner1 = new FleetOwner();
        fleetOwner1.setId(1L);
        FleetOwner fleetOwner2 = new FleetOwner();
        fleetOwner2.setId(fleetOwner1.getId());
        assertThat(fleetOwner1).isEqualTo(fleetOwner2);
        fleetOwner2.setId(2L);
        assertThat(fleetOwner1).isNotEqualTo(fleetOwner2);
        fleetOwner1.setId(null);
        assertThat(fleetOwner1).isNotEqualTo(fleetOwner2);
    }
}
