export const signUpFormControls = [
  {
    name: "userName",
    label: "Full Name",
    placeholder: "Enter your full name",
    type: "text",
    componentType: "input",
  },
  {
    name: "userEmail",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const signInFormControls = [
  {
    name: "userEmail",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    componentType: "input",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    componentType: "input",
  },
];

export const initialSignInFormData = {
  userEmail: "",
  password: "",
};

export const initialSignUpFormData = {
  userName: "",
  userEmail: "",
  password: "",
};

// export const languageOptions = [
//   { id: "english", label: "English" },
//   { id: "spanish", label: "Spanish" },
//   { id: "french", label: "French" },
//   { id: "german", label: "German" },
//   { id: "chinese", label: "Chinese" },
//   { id: "japanese", label: "Japanese" },
//   { id: "korean", label: "Korean" },
//   { id: "portuguese", label: "Portuguese" },
//   { id: "arabic", label: "Arabic" },
//   { id: "russian", label: "Russian" },
// ];

export const courseLevelOptions = [
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

export const courseCategories = [
  { id: "devops", label: "DevOps" },
  { id: "cloud-computing", label: "Cloud Computing" },
];

export const courseLandingPageFormControls = [
  {
    name: "title",
    label: "Title",
    componentType: "input",
    type: "text",
    placeholder: "Enter course title",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseCategories,
  },
  {
    name: "level",
    label: "Level",
    componentType: "select",
    type: "text",
    placeholder: "",
    options: courseLevelOptions,
  },
  // {
  //   name: "primaryLanguage",
  //   label: "Primary Language",
  //   componentType: "select",
  //   type: "text",
  //   placeholder: "",
  //   options: languageOptions,
  // },
  {
    name: "subtitle",
    label: "Subtitle",
    componentType: "input",
    type: "text",
    placeholder: "Enter course subtitle",
  },
  {
    name: "description",
    label: "Description",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course description",
  },
  {
    name: "pricing",
    label: "Pricing",
    componentType: "input",
    type: "number",
    placeholder: "Enter course pricing",
  },
  {
    name: "objectives",
    label: "Objectives",
    componentType: "textarea",
    type: "text",
    placeholder: "Enter course objectives",
  },
  {
    name: "welcomeMessage",
    label: "Welcome Message",
    componentType: "textarea",
    placeholder: "Welcome message for students",
  },
];

export const courseLandingInitialFormData = {
  title: "",
  category: "",
  level: "",
  // primaryLanguage: "",
  subtitle: "",
  description: "",
  pricing: "",
  objectives: "",
  welcomeMessage: "",
  image: "",
};

export const courseCurriculumInitialFormData = [
  {
    title: "",
    videoUrl: "",
    freePreview: false,
    public_id: "",
    type: "",
    link_desc: ""
  },
];

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const courseTerms = [
      { id: "summer", label: "Summer" },
      { id: "fall", label: "Fall" },
      { id: "spring", label: "Spring" },
      { id: "bootcamp", label: "Bootcamp" }
    ]

export const filterOptions = {
  category: courseCategories,
  level: courseLevelOptions,
  // primaryLanguage: languageOptions,
  term: courseTerms
};
