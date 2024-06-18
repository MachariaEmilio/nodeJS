export const key_schema = {
  imageurl: {
    notEmpty: {
      errorMessage: "fill in the imageUrl",
    },
    isLength: {
      options: { max: 200 },
      errorMessage: "Url should not be greater than 10 and less than 300 ",
    },


  },
  title: {
    notEmpty: {
      errorMessage: "title should not be notEmpty",
    },
  },
  price: {
    notEmpty: {
      errorMessage: "price] should not be Empty",
    },
    
  },
  date: {
    notEmpty: {
      errorMessage: "date should not be Empty",
    },
    },
  location: {
    notEmpty: {
      errorMessage: "location should not be Empty",
    },

  },
  company: {
    notEmpty: {
      errorMessage: "company name should not be Empty",
    },
  },
};
