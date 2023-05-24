const {
  getCategoriesFromTextRazor,
  getCategoriesFromInterfaceAPI,
  getCategoriesFromClassifierAPI,
} = require("./apiServices");

class CategoryFilterService {
  async getCategories(content) {
    throw new Error("Not implemented");
  }
}

class TextRazorService extends CategoryFilterService {
  async getCategories(content) {
    return await getCategoriesFromTextRazor(content);
  }
}

class InterfaceAPIService extends CategoryFilterService {
  async getCategories(content) {
    return await getCategoriesFromInterfaceAPI(content);
  }
}

class ClassifierAPIService extends CategoryFilterService {
  async getCategories(content) {
    return await getCategoriesFromClassifierAPI(content);
  }
}

function createCategoryFilterService(servicePreference) {
  switch (servicePreference) {
    case "TextRazor":
      return new TextRazorService();
    case "InterfaceAPI":
      return new InterfaceAPIService();
    case "ClassifierAPI":
      return new ClassifierAPIService();
    default:
      throw new Error("Invalid service preference");
  }
}

module.exports = createCategoryFilterService;
