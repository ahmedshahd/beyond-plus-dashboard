import { gql } from 'apollo-angular';

/////********                                     *********//////////////
/////******************  FAQ QUERIES AND MUTITION *********//////////////
/////********                                     *********//////////////
const GET_FAQ = gql`
  query Faq($language: LanguageEnum!) {
    faq(language: $language) {
      id
      question
      answers
      language
    }
  }
`;

const CREATE_FAQ = gql`
  mutation CreateFaq(
    $createFaqInput: CreateFaqInput!
    $language: LanguageEnum
  ) {
    createFaq(createFaqInput: $createFaqInput, language: $language) {
      id
      question
      answers
      language
    }
  }
`;

const REMOVE_FAQ = gql`
  mutation RemoveFaq($removeFaqId: Int!) {
    removeFaq(id: $removeFaqId) {
      id
      question
      answers
      language
    }
  }
`;

/////********                                     *********//////////////
/////******************  LABEL QUERIES AND MUTITION *********//////////////
/////********                                     *********//////////////

const GET_LABEL = gql`
  query Label($language: LanguageEnum!) {
    label(language: $language) {
      id
      name
      content
      language
    }
  }
`;

const CREATE_LABEL = gql`
  mutation Mutation(
    $createLabelInput: CreateLabelInput!
    $language: LanguageEnum!
  ) {
    createLabel(createLabelInput: $createLabelInput, language: $language) {
      id
      name
      content
      language
    }
  }
`;

const REMOVE_LABEL = gql`
  mutation RemoveLabel($removeLabelId: Int!) {
    removeLabel(id: $removeLabelId) {
      id
      name
      content
      language
    }
  }
`;

/////********                                     *********//////////////
/////******************  TERMS QUERIES AND MUTITION *********//////////////
/////********                                     *********//////////////

const GET_TERMS_AND_CONDITIONS = gql`
  query TermsAndConditions($language: LanguageEnum!) {
    termsAndConditions(language: $language) {
      id
      text
      language
    }
  }
`;

const CREATE_TERMS_AND_CONDITIONS = gql`
  mutation Mutation(
    $createTermsAndConditionsInput: CreateTermsAndConditionsInput!
    $language: LanguageEnum!
  ) {
    createTermsAndConditions(
      createTermsAndConditionsInput: $createTermsAndConditionsInput
      language: $language
    ) {
      id
      text
      language
    }
  }
`;

const REMOVE_TERMS_AND_CONDITIONS = gql`
  mutation Mutation($removeTermsAndConditionsId: Int!) {
    removeTermsAndConditions(id: $removeTermsAndConditionsId) {
      id
      text
      language
    }
  }
`;

/////********                                     *********//////////////
/////******************  LEARN ICON QUERIES AND MUTITION *********//////////////
/////********                                     *********//////////////

const GET_LEARN_ICON = gql`
  query Query($language: LanguageEnum!) {
    learnIcon(language: $language) {
      id
      imageUrl
      name
      content
      language
    }
  }
`;

const CREATE_LEARN_ICON = gql`
  mutation CreateLearnIcon(
    $createLearnIconInput: CreateLearnIconInput!
    $language: LanguageEnum!
    $image: Upload
  ) {
    createLearnIcon(
      createLearnIconInput: $createLearnIconInput
      language: $language
      image: $image
    ) {
      id
      name
      imageUrl
      content
      language
    }
  }
`;

const REMOVE_LEARN_ICON = gql`
  mutation Mutation($removeLearnIconId: Int!) {
    removeLearnIcon(id: $removeLearnIconId) {
      id
      name
      imageUrl
      content
      language
    }
  }
`;

/////********                                     *********//////////////
/////******************  Welcome Screen QUERIES AND MUTITION *********//////////////
/////********                                     *********//////////////

const GET_WELCOME_SCREEN = gql`
  query WelcomeScreen($language: LanguageEnum!) {
    welcomeScreen(language: $language) {
      id
      text
      title
      imageUrls
      language
    }
  }
`;

const CREATE_WELCOME_SCREEN = gql`
  mutation CreateWelcomeScreen(
    $createWelcomeScreenInput: CreateWelcomeScreenInput!
    $language: LanguageEnum!
    $images: [Upload!]!
  ) {
    createWelcomeScreen(
      createWelcomeScreenInput: $createWelcomeScreenInput
      language: $language
      images: $images
    ) {
      id
      title
      text
      imageUrls
      language
    }
  }
`;

const REMOVE_WELCOME_SCREEN = gql`
  mutation RemoveLearnIcon($removeWelcomeScreenId: Int!) {
    removeWelcomeScreen(id: $removeWelcomeScreenId) {
      id
      text
      title
      imageUrls
      language
    }
  }
`;

/////********                                     *********//////////////
/////******************   Privacy Policy QUERIES AND MUTITION *********//////////////
/////********                                     *********//////////////

const GET_PRIVACY_POLICY = gql`
  query PrivacyPolicy($language: LanguageEnum!) {
    privacyPolicy(language: $language) {
      id
      text
      language
    }
  }
`;

const CREATE_PRIVACY_POLICY = gql`
  mutation CreatePrivacyPolicy(
    $createPrivacyPolicyInput: CreatePrivacyPolicyInput!
    $language: LanguageEnum!
  ) {
    createPrivacyPolicy(
      createPrivacyPolicyInput: $createPrivacyPolicyInput
      language: $language
    ) {
      id
      text
      language
    }
  }
`;

const REMOVE_PRIVACY_POLICY = gql`
  mutation RemovePrivacyPolicy($removePrivacyPolicyId: Int!) {
    removePrivacyPolicy(id: $removePrivacyPolicyId) {
      id
      text
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** lINE Of Business QUERIES AND MUTITION *********//////////////
/////********                                     *********//////////////

const GET_LINE_OF_BUSINESS = gql`
  query LineOfBusiness($language: LanguageEnum!) {
    lineOfBusiness(language: $language) {
      id
      name
      description
      details
      imageUrl
      language
    }
  }
`;

const CREATE_LINE_OF_BUSINESS = gql`
  mutation CreateLineOfBusiness(
    $createLineOfBusinessInput: CreateLineOfBusinessInput!
    $language: LanguageEnum!
    $image: Upload!
  ) {
    createLineOfBusiness(
      createLineOfBusinessInput: $createLineOfBusinessInput
      language: $language
      image: $image
    ) {
      id
      name
      description
      details
      imageUrl
      language
    }
  }
`;

const REMOVE_LINE_OF_BUSINESS = gql`
  mutation RemoveLineOfBusiness($removeLineOfBusinessId: Int!) {
    removeLineOfBusiness(id: $removeLineOfBusinessId) {
      id
      name
      description
      details
      imageUrl
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** CONTACT US QUERIES AND MUTITION *********//////////////
/////********                                     *********//////////////

const GET_CONTACT_US = gql`
  query ContactUs {
    contactUs {
      id
      phoneNumber
      email
      telegramChannel
      whatsappNumber
      websiteUrl
    }
  }
`;

const CREATE_CONTACT_US = gql`
  mutation Mutation($createContactUsInput: CreateContactUsInput!) {
    createContactUs(createContactUsInput: $createContactUsInput) {
      id
      phoneNumber
      email
      websiteUrl
      telegramChannel
      whatsappNumber
    }
  }
`;

const REMOVE_CONTACT_US = gql`
  mutation Mutation($removeContactUsId: Int!) {
    removeContactUs(id: $removeContactUsId) {
      id
      phoneNumber
      email
      websiteUrl
      telegramChannel
      whatsappNumber
    }
  }
`;

/////********                                     *********//////////////
/////****************** TPA QUERIES AND MUTITION *********//////////////
/////********                                     *******//////////////

const GET_TPA = gql`
  query ListAllTpas(
    $language: LanguageEnum!
    $page: Int
    $search: String
    $limit: Int
  ) {
    listAllTpas(
      language: $language
      page: $page
      search: $search
      limit: $limit
    ) {
      tpa {
        id
        name
        insuranceCompanies {
          id
          name
          language

          tpaId
        }
        language
      }
    }
  }
`;

const CREATE_TPA = gql`
  mutation Mutation(
    $createTpaInput: CreateTpaInput!
    $language: LanguageEnum!
  ) {
    createTpa(createTpaInput: $createTpaInput, language: $language) {
      id
      name
      insuranceCompanies {
        id
        name
        language

        tpaId
      }
      language
    }
  }
`;

const UPDATE_TPA = gql`
  mutation UpdateTpa($updateTpaInput: UpdateTpaInput!) {
    updateTpa(updateTpaInput: $updateTpaInput) {
      id
      name
      insuranceCompanies {
        id
        name
        language

        tpaId
      }
      language
    }
  }
`;

const REMOVE_TPA = gql`
  mutation RemoveTpa($removeTpaId: Int!) {
    removeTpa(id: $removeTpaId) {
      id
      name
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** INSURANCE COMPANY QUERIES AND MUTITION *********//////////////
/////********                                             *******//////////////

const GET_INSURANCE_COMPANY = gql`
  query ListAllInsuranceCompaniesByTpaId(
    $tpaId: Int!
    $page: Int
    $search: String
    $limit: Int
  ) {
    listAllInsuranceCompaniesByTpaId(
      tpaId: $tpaId
      page: $page
      search: $search
      limit: $limit
    ) {
      insuranceCompany {
        id
        name
        language
        tpaId
      }
    }
  }
`;

const CREATE_INSURANCE_COMPANY = gql`
  mutation Mutation(
    $createInsuranceCompanyInput: CreateInsuranceCompanyInput!
    $language: LanguageEnum!
  ) {
    createInsuranceCompany(
      createInsuranceCompanyInput: $createInsuranceCompanyInput
      language: $language
    ) {
      id
      name
      language
      tpaId
    }
  }
`;

const UPDATE_INSURANCE_COMPANY = gql`
  mutation UpdateInsuranceCompany(
    $updateInsuranceCompanyInput: UpdateInsuranceCompanyInput!
  ) {
    updateInsuranceCompany(
      updateInsuranceCompanyInput: $updateInsuranceCompanyInput
    ) {
      id
      name
      language

      tpaId
    }
  }
`;

const REMOVE_INSURANCE_COMPANY = gql`
  mutation RemoveInsuranceCompany($removeInsuranceCompanyId: Int!) {
    removeInsuranceCompany(id: $removeInsuranceCompanyId) {
      id
      name
      language

      tpaId
    }
  }
`;

/////********                                     *********//////////////
/////****************** CATEGORY QUERIES AND MUTITION *********//////////////
/////********                                          *******//////////////

const GET_CATEGORY = gql`
  query Query($insuranceCompanyId: Int!, $language: LanguageEnum!) {
    listAllCategoriesByInsuranceCompanyId(
      insuranceCompanyId: $insuranceCompanyId
      language: $language
    ) {
      category {
        id
        tier
        tierRank

        insuranceCompanyId
        language
        createdAt
        updatedAt
      }
    }
  }
`;

const CREATE_CATEGORY = gql`
  mutation CreateCategory(
    $createCategoryInput: CreateCategoryInput!
    $language: LanguageEnum!
  ) {
    createCategory(
      createCategoryInput: $createCategoryInput
      language: $language
    ) {
      id
      tier
      tierRank
      insuranceCompanyId
      language
    }
  }
`;

const UPDATE_CATEGORY = gql`
  mutation Mutation($updateCategoryInput: UpdateCategoryInput!) {
    updateCategory(updateCategoryInput: $updateCategoryInput) {
      id
      tier
      tierRank
      language
    }
  }
`;

const REMOVE_CATEGORY = gql`
  mutation RemoveCategory($removeCategoryId: Int!) {
    removeCategory(id: $removeCategoryId) {
      id
      tier
      tierRank
      insuranceCompany {
        id
        name
        language

        tpaId
      }
      insuranceCompanyId
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** CITY QUERIES AND MUTITION *********//////////////
/////********                                          *******//////////////

const GET_CITY = gql`
  query ListAllCitiesByInsuranceCompanyId(
    $insuranceCompanyId: Int!
    $language: LanguageEnum!
    $search: String
    $page: Int
    $limit: Int
  ) {
    listAllCitiesByInsuranceCompanyId(
      insuranceCompanyId: $insuranceCompanyId
      language: $language
      search: $search
      page: $page
      limit: $limit
    ) {
      city {
        id
        name
        insuranceCompanyId

        language
      }
    }
  }
`;

const CREATE_CITY = gql`
  mutation CreateCity(
    $createCityInput: CreateCityInput!
    $language: LanguageEnum!
  ) {
    createCity(createCityInput: $createCityInput, language: $language) {
      id
      name
      insuranceCompanyId

      language
    }
  }
`;

const UPDATE_CITY = gql`
  mutation UpdateCity($updateCityInput: UpdateCityInput!) {
    updateCity(updateCityInput: $updateCityInput) {
      id
      name
      insuranceCompanyId

      language
    }
  }
`;

const REMOVE_CITY = gql`
  mutation RemoveCity($removeCityId: Int!) {
    removeCity(id: $removeCityId) {
      id
      name
      insuranceCompanyId
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** AREA QUERIES AND MUTITION *********//////////////
/////********                                          *******//////////////

const GET_AREA = gql`
  query ListAllAreasByCityId(
    $cityId: [Int!]!
    $language: LanguageEnum!
    $search: String
    $page: Int
    $limit: Int
  ) {
    listAllAreasByCityId(
      cityId: $cityId
      language: $language
      search: $search
      page: $page
      limit: $limit
    ) {
      area {
        id
        name
        cityId

        city {
          id
          name
        }
        language
      }
    }
  }
`;

const CREATE_AREA = gql`
  mutation CreateArea(
    $createAreaInput: CreateAreaInput!
    $language: LanguageEnum!
  ) {
    createArea(createAreaInput: $createAreaInput, language: $language) {
      id
      name
      cityId
      city {
        id
        name
      }
      language
    }
  }
`;

const UPDATE_AREA = gql`
  mutation UpdateArea($updateAreaInput: UpdateAreaInput!) {
    updateArea(updateAreaInput: $updateAreaInput) {
      id
      name
      cityId
      city {
        id
        name
      }
      language
    }
  }
`;

const REMOVE_AREA = gql`
  mutation RemoveArea($removeAreaId: Int!) {
    removeArea(id: $removeAreaId) {
      id
      name
      cityId
      city {
        id
        name
      }
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** Provider Type QUERIES AND MUTITION *********//////////////
/////********                                          *******//////////////

const GET_PROVIDER_TYPE = gql`
  query ListAllProviderTypesByInsuranceCompanyId(
    $insuranceCompanyId: Int!
    $language: LanguageEnum!
    $search: String
    $page: Int
    $limit: Int
  ) {
    listAllProviderTypesByInsuranceCompanyId(
      insuranceCompanyId: $insuranceCompanyId
      language: $language
      search: $search
      page: $page
      limit: $limit
    ) {
      providerType {
        id
        name
        language
        insuranceCompanyId
      }
    }
  }
`;

const CREATE_PROVIDER_TYPE = gql`
  mutation CreateProviderType(
    $createProviderTypeInput: CreateProviderTypeInput!
    $language: LanguageEnum!
  ) {
    createProviderType(
      createProviderTypeInput: $createProviderTypeInput
      language: $language
    ) {
      id
      name
      language
      insuranceCompanyId
    }
  }
`;

const UPDATE_PROVIDER_TYPE = gql`
  mutation UpdateProviderType(
    $updateProviderTypeInput: UpdateProviderTypeInput!
  ) {
    updateProviderType(updateProviderTypeInput: $updateProviderTypeInput) {
      id
      name
      language
      insuranceCompanyId
    }
  }
`;

const REMOVE_PROVIDER_TYPE = gql`
  mutation RemoveProviderType($removeProviderTypeId: Int!) {
    removeProviderType(id: $removeProviderTypeId) {
      id
      name
      insuranceCompanyId
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** SPECIALITY QUERIES AND MUTITION *********//////////////
/////********                                          *******//////////////

const GET_SPECIALITY = gql`
  query ListAllSpecialityByProviderTypeId(
    $providerTypeId: [Int!]!
    $language: LanguageEnum!
    $search: String
    $page: Int
    $limit: Int
  ) {
    listAllSpecialityByProviderTypeId(
      providerTypeId: $providerTypeId
      language: $language
      search: $search
      page: $page
      limit: $limit
    ) {
      speciality {
        id
        name
        providerTypeId
        language
      }
    }
  }
`;

const CREATE_SPECIALITY = gql`
  mutation CreateSpeciality(
    $createSpecialityInput: CreateSpecialityInput!
    $language: LanguageEnum!
  ) {
    createSpeciality(
      createSpecialityInput: $createSpecialityInput
      language: $language
    ) {
      id
      name
      providerTypeId

      language
    }
  }
`;

const UPDATE_SPECIALITY = gql`
  mutation UpdateSpeciality($updateSpecialityInput: UpdateSpecialityInput!) {
    updateSpeciality(updateSpecialityInput: $updateSpecialityInput) {
      id
      name
      providerTypeId

      language
    }
  }
`;

const REMOVE_SPECIALITY = gql`
  mutation RemoveSpeciality($removeSpecialityId: Int!) {
    removeSpeciality(id: $removeSpecialityId) {
      id
      name
      providerTypeId
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** SUB_SPECIALITY QUERIES AND MUTITION *********//////////////
/////********                                          *******//////////////

const GET_SUB_SPECIALITY = gql`
  query ListAllSubSpecialityBySpecialityId(
    $specialityId: [Int!]!
    $language: LanguageEnum!
    $search: String
    $page: Int
    $limit: Int
  ) {
    listAllSubSpecialityBySpecialityId(
      specialityId: $specialityId
      language: $language
      search: $search
      page: $page
      limit: $limit
    ) {
      subSpeciality {
        id
        name
        language
        specialityId
      }
    }
  }
`;

const CREATE_SUB_SPECIALITY = gql`
  mutation CreateSubSpeciality(
    $createSubSpecialityInput: CreateSubSpecialityInput!
    $language: LanguageEnum!
  ) {
    createSubSpeciality(
      createSubSpecialityInput: $createSubSpecialityInput
      language: $language
    ) {
      id
      name
      language
      specialityId
    }
  }
`;

const UPDATE_SUB_SPECIALITY = gql`
  mutation UpdateSubSpeciality(
    $updateSubSpecialityInput: UpdateSubSpecialityInput!
  ) {
    updateSubSpeciality(updateSubSpecialityInput: $updateSubSpecialityInput) {
      id
      name
      language
      specialityId
    }
  }
`;

const REMOVE_SUB_SPECIALITY = gql`
  mutation RemoveSubSpeciality($removeSubSpecialityId: Int!) {
    removeSubSpeciality(id: $removeSubSpecialityId) {
      id
      name
      language
      specialityId
    }
  }
`;

/////********                                     *********//////////////
/////****************** PROVIDER QUERIES AND MUTITION *********//////////////
/////********                                          *******//////////////

const GET_PROVIDER = gql`
  query ListAllProviders(
    $insuranceCompanyId: Int!
    $tierRank: Int!
    $areaId: [Int!]!
    $specialityId: [Int]
    $providerTypeId: [Int]
    $subSpecialityId: [Int]
    $search: String
    $page: Int
    $limit: Int
  ) {
    listAllProviders(
      insuranceCompanyId: $insuranceCompanyId
      tierRank: $tierRank
      areaId: $areaId
      specialityId: $specialityId
      providerTypeId: $providerTypeId
      subSpecialityId: $subSpecialityId
      search: $search
      page: $page
      limit: $limit
    ) {
      provider {
        id
        name
        address
        longitude
        latitude
        phoneNumber
        email
        isOnline
        hasChronicMedication
        websiteUrl
        areaId
        specialityId
        subSpecialityId
        tierRank
        providerTypeId
        insuranceCompanyId
        language
      }
    }
  }
`;

const CREATE_PROVIDER = gql`
  mutation Mutation(
    $createProviderInput: CreateProviderInput!
    $language: LanguageEnum!
  ) {
    createProvider(
      createProviderInput: $createProviderInput
      language: $language
    ) {
      id
      name
      address
      longitude
      latitude
      phoneNumber
      email
      isOnline
      hasChronicMedication
      websiteUrl
      areaId
      specialityId
      subSpecialityId
      tierRank
      providerTypeId
      insuranceCompanyId
      language
    }
  }
`;

const UPDATE_PROVIDER = gql`
  mutation UpdateProvider($updateProviderInput: UpdateProviderInput!) {
    updateProvider(updateProviderInput: $updateProviderInput) {
      id
      name
      address
      longitude
      latitude
      phoneNumber
      email
      isOnline
      hasChronicMedication
      websiteUrl
      areaId
      specialityId
      subSpecialityId
      tierRank
      providerTypeId
      insuranceCompanyId
      language
    }
  }
`;

const REMOVE_PROVIDER = gql`
  mutation UpdateProvider($removeProviderId: Int!) {
    removeProvider(id: $removeProviderId) {
      id
      name
      address
      longitude
      latitude
      phoneNumber
      email
      isOnline
      hasChronicMedication
      websiteUrl
      areaId
      specialityId
      subSpecialityId
      tierRank
      providerTypeId
      insuranceCompanyId
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** CLIENT CITY QUERIES AND MUTITION *********//////////////
/////********                                          *******//////////////

const GET_CLIENT_CITY = gql`
  query ListAllClientCities($language: LanguageEnum!) {
    listAllClientCities(language: $language) {
      clientCity {
        id
        language
        name
      }
    }
  }
`;

const CREATE_CLIENT_CITY = gql`
  mutation Mutation(
    $createClientCityInput: CreateClientCityInput!
    $language: LanguageEnum!
  ) {
    createClientCity(
      createClientCityInput: $createClientCityInput
      language: $language
    ) {
      id
      name

      language
    }
  }
`;

const UPDATE_CLIENT_CITY = gql`
  mutation UpdateClientCity($updateClientCityInput: UpdateClientCityInput!) {
    updateClientCity(updateClientCityInput: $updateClientCityInput) {
      id
      name

      language
    }
  }
`;

const REMOVE_CLIENT_CITY = gql`
  mutation RemoveClientCity($removeClientCityId: Int!) {
    removeClientCity(id: $removeClientCityId) {
      id
      name
      language
    }
  }
`;

/////********                                     *********//////////////
/////****************** CLIENT AREA QUERIES AND MUTITION *********//////////////
/////********                                          *******//////////////

const GET_CLIENT_AREA = gql`
  query ListAllClientAreasByClientCityId($clientCityId: [Int!]!) {
    listAllClientAreasByClientCityId(clientCityId: $clientCityId) {
      clientArea {
        id
        name
        clientCityId

        language
      }
    }
  }
`;

const CREATE_CLIENT_AREA = gql`
  mutation Mutation(
    $createClientAreaInput: CreateClientAreaInput!
    $language: LanguageEnum!
  ) {
    createClientArea(
      createClientAreaInput: $createClientAreaInput
      language: $language
    ) {
      id
      name
      clientCityId

      language
    }
  }
`;

const UPDATE_CLIENT_AREA = gql`
  mutation UpdateClientArea($updateClientAreaInput: UpdateClientAreaInput!) {
    updateClientArea(updateClientAreaInput: $updateClientAreaInput) {
      id
      name
      clientCityId
      language
    }
  }
`;

const REMOVE_CLIENT_AREA = gql`
  mutation RemoveClientArea($removeClientAreaId: Int!) {
    removeClientArea(id: $removeClientAreaId) {
      id
      name
    }
  }
`;

/////********                                     *********//////////////
/////****************** User Profile Queries And Mutations*********//////////////
/////********                                          *******//////////////

const GET_USERS_PROFILES = gql`
  query UsersProfiles($phoneNumber: String) {
    usersProfiles(phoneNumber: $phoneNumber) {
      uuid
      name
      phoneNumber
      gender
      email
      dateOfbirth
      profileImgUrl
    }
  }
`;

const GET_USER_PROFILE = gql`
  query UserProfile($uuid: String!) {
    userProfile(uuid: $uuid) {
      uuid
      name
      email
      phoneNumber
      dateOfbirth
      profileImgUrl
      gender
    }
  }
`;

/////********                                     *********//////////////
/////****************** Wellness tip Queries And Mutations*********//////////////
/////********                                          *******//////////////

const GET_WELLNESS_TIPS_OF_USER = gql`
  query Query($userProfileUuid: String) {
    wellnessTipsOfUser(userProfileUuid: $userProfileUuid) {
      id
      name
      description
      details
      images
      pdfs
      thumbnails
      userProfileUuid
      createdAt
      updatedAt
    }
  }
`;

const CREATE_WELLNESS_TIP = gql`
  mutation CreateWellnessTip(
    $createWellnessTipInput: CreateWellnessTipInput!
    $attachments: [Upload]
  ) {
    createWellnessTip(
      createWellnessTipInput: $createWellnessTipInput
      attachments: $attachments
    ) {
      id
      name
    }
  }
`;

const UPDATE_WELLNESS_TIP = gql`
  mutation UpdateWellnessTip($updateWellnessTipInput: UpdateWellnessTipInput!) {
    updateWellnessTip(updateWellnessTipInput: $updateWellnessTipInput) {
      id
      name
    }
  }
`;

const REMOVE_WELLNESS_TIP = gql`
  mutation RemoveWellnessTip($removeWellnessTipId: Int!) {
    removeWellnessTip(id: $removeWellnessTipId) {
      id
      name
    }
  }
`;

/////********                                     *********//////////////
/////****************** Health Care Queries And Mutations*********//////////////
/////********                                          *******//////////////

const GET_HEALTH_CARE_OF_USER = gql`
  query HealthCareOfUser($userProfileUuid: String) {
    healthCareOfUser(userProfileUuid: $userProfileUuid) {
      id
      name
      description
      details
      images
      pdfs
      thumbnails
      userProfileUuid
      createdAt
      updatedAt
    }
  }
`;

const CREATE_HEALTH_CARE = gql`
  mutation Mutation(
    $createHealthCareInput: CreateHealthCareInput!
    $attachments: [Upload]
  ) {
    createHealthCare(
      createHealthCareInput: $createHealthCareInput
      attachments: $attachments
    ) {
      id
      name
    }
  }
`;

const UPDATE_HEALTH_CARE = gql`
  mutation UpdateHealthCare(
    $updateHealthCareInput: UpdateHealthCareInput!
    $attachments: [Upload]
  ) {
    updateHealthCare(
      updateHealthCareInput: $updateHealthCareInput
      attachments: $attachments
    ) {
      id
      name
    }
  }
`;

const REMOVE_HEALTH_CARE = gql`
  mutation RemoveHealthCare($removeHealthCareId: Int!) {
    removeHealthCare(id: $removeHealthCareId) {
      id
      name
    }
  }
`;

export {
  GET_FAQ,
  CREATE_FAQ,
  REMOVE_FAQ,
  REMOVE_LABEL,
  CREATE_LABEL,
  GET_LABEL,
  GET_TERMS_AND_CONDITIONS,
  CREATE_TERMS_AND_CONDITIONS,
  REMOVE_TERMS_AND_CONDITIONS,
  GET_LEARN_ICON,
  CREATE_LEARN_ICON,
  REMOVE_LEARN_ICON,
  GET_WELCOME_SCREEN,
  CREATE_WELCOME_SCREEN,
  REMOVE_WELCOME_SCREEN,
  GET_PRIVACY_POLICY,
  CREATE_PRIVACY_POLICY,
  REMOVE_PRIVACY_POLICY,
  GET_LINE_OF_BUSINESS,
  CREATE_LINE_OF_BUSINESS,
  REMOVE_LINE_OF_BUSINESS,
  GET_CONTACT_US,
  CREATE_CONTACT_US,
  REMOVE_CONTACT_US,
  GET_TPA,
  CREATE_TPA,
  UPDATE_TPA,
  REMOVE_TPA,
  GET_INSURANCE_COMPANY,
  CREATE_INSURANCE_COMPANY,
  UPDATE_INSURANCE_COMPANY,
  REMOVE_INSURANCE_COMPANY,
  GET_CATEGORY,
  CREATE_CATEGORY,
  UPDATE_CATEGORY,
  REMOVE_CATEGORY,
  GET_CITY,
  CREATE_CITY,
  UPDATE_CITY,
  REMOVE_CITY,
  GET_AREA,
  CREATE_AREA,
  UPDATE_AREA,
  REMOVE_AREA,
  GET_PROVIDER_TYPE,
  CREATE_PROVIDER_TYPE,
  UPDATE_PROVIDER_TYPE,
  REMOVE_PROVIDER_TYPE,
  GET_SPECIALITY,
  CREATE_SPECIALITY,
  UPDATE_SPECIALITY,
  REMOVE_SPECIALITY,
  GET_SUB_SPECIALITY,
  CREATE_SUB_SPECIALITY,
  UPDATE_SUB_SPECIALITY,
  REMOVE_SUB_SPECIALITY,
  GET_PROVIDER,
  CREATE_PROVIDER,
  UPDATE_PROVIDER,
  REMOVE_PROVIDER,
  GET_CLIENT_CITY,
  CREATE_CLIENT_CITY,
  UPDATE_CLIENT_CITY,
  REMOVE_CLIENT_CITY,
  GET_CLIENT_AREA,
  CREATE_CLIENT_AREA,
  UPDATE_CLIENT_AREA,
  REMOVE_CLIENT_AREA,
  GET_USER_PROFILE,
  GET_USERS_PROFILES,
  GET_WELLNESS_TIPS_OF_USER,
  CREATE_WELLNESS_TIP,
  UPDATE_WELLNESS_TIP,
  REMOVE_WELLNESS_TIP,
  GET_HEALTH_CARE_OF_USER,
  CREATE_HEALTH_CARE,
  UPDATE_HEALTH_CARE,
  REMOVE_HEALTH_CARE,
};
