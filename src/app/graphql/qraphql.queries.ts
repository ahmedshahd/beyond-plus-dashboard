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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
    }
  }
`;

const REMOVE_TERMS_AND_CONDITIONS = gql`
  mutation Mutation($removeTermsAndConditionsId: Int!) {
    removeTermsAndConditions(id: $removeTermsAndConditionsId) {
      id
      text
      language
      createdAt
      updatedAt
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
      name
      content
      language
      createdAt
      updatedAt
    }
  }
`;

const CREATE_LEARN_ICON = gql`
  mutation CreateLearnIcon(
    $createLearnIconInput: CreateLearnIconInput!
    $language: LanguageEnum!
  ) {
    createLearnIcon(
      createLearnIconInput: $createLearnIconInput
      language: $language
    ) {
      id
      name
      content
      language
      createdAt
      updatedAt
    }
  }
`;

const REMOVE_LEARN_ICON = gql`
  mutation Mutation($removeLearnIconId: Int!) {
    removeLearnIcon(id: $removeLearnIconId) {
      id
      name
      content
      language
      createdAt
      updatedAt
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
      imageUrl
      language
      createdAt
      updatedAt
    }
  }
`;

const CREATE_WELCOME_SCREEN = gql`
  mutation CreateWelcomeScreen(
    $createWelcomeScreenInput: CreateWelcomeScreenInput!
    $language: LanguageEnum!
  ) {
    createWelcomeScreen(
      createWelcomeScreenInput: $createWelcomeScreenInput
      language: $language
    ) {
      id
      text
      title
      imageUrl
      language
      createdAt
      updatedAt
    }
  }
`;

const REMOVE_WELCOME_SCREEN = gql`
  mutation RemoveLearnIcon($removeWelcomeScreenId: Int!) {
    removeWelcomeScreen(id: $removeWelcomeScreenId) {
      id
      text
      title
      imageUrl
      language
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
    }
  }
`;

const REMOVE_PRIVACY_POLICY = gql`
  mutation RemovePrivacyPolicy($removePrivacyPolicyId: Int!) {
    removePrivacyPolicy(id: $removePrivacyPolicyId) {
      id
      text
      language
      createdAt
      updatedAt
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
      createdAt
      updatedAt
    }
  }
`;

const CREATE_LINE_OF_BUSINESS = gql`
  mutation CreateLineOfBusiness(
    $createLineOfBusinessInput: CreateLineOfBusinessInput!
    $language: LanguageEnum!
  ) {
    createLineOfBusiness(
      createLineOfBusinessInput: $createLineOfBusinessInput
      language: $language
    ) {
      id
      name
      description
      details
      imageUrl
      language
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      websiteUrl
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
      createdAt
      updatedAt
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
  REMOVE_CONTACT_US,
  GET_CONTACT_US,
  CREATE_CONTACT_US,
};
