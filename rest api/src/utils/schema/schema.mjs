export const key_schema = {
    imageUrl: {
      isEmpty: {
        errorMessage: "fill in the imageUrl",
      },
      isLength: {
          options : {max: 200},
          errorMessage: "Url should not be greater than 10 and less than 300 "
      }
    },
    title: {
      isEmpty: {
        errorMessage: "title should not be isEmpty",
      },
    },
    price: {
      isEmpty: {
        errorMessage: "imageUrl should not be isEmpty",
      }
    },
    date: {
      isEmpty: {
        errorMessage: "date should not be isEmpty",
      },
      isDate: {
          errorMessage: "Date should be a date"
      }
    },
    location: {
      isEmpty: {
        errorMessage: "location should not be isEmpty",
      },
    },
    company: {
    isEmpty: {
        errorMessage: "company name should not be isEmpty",
      },
    },
  };
  