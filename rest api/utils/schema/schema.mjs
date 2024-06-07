export const valid_schema = {
    imageUrl: {
      notEmpty: {
        errorMessage: "fill in the imageUrl",
      },
      isLength: {
          options : {min :10,max: 30},
          errorMessage: "Url should not be greater than 10 and less than 30 "
      }
    },
    title: {
      notEmpty: {
        errorMessage: "title should not be empty",
      },
    },
    price: {
      notEmpty: {
        errorMessage: "imageUrl should not be empty",
      }
    },
    date: {
      notEmpty: {
        errorMessage: "date should not be empty",
      },
      isDate: {
          errorMessage: "Date should be a date"
      }
    },
    location: {
      notEmpty: {
        errorMessage: "location should not be empty",
      },
    },
    company: {
      notEmpty: {
        errorMessage: "company name should not be empty",
      },
    },
  };
  