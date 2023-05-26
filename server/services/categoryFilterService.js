const {
  getCategoriesFromTextRazor,
  getCategoriesFromInterfaceAPI,
  getCategoriesFromClassifierAPI,
} = require("./apiServices");

class CategoryFilterService {
  async getCategories(content, timeout) {
    throw new Error("Not implemented");
  }
}

class TextRazorService extends CategoryFilterService {
  async getCategories(content, timeout) {
    return await getCategoriesFromTextRazor(content, timeout);
  }
}

class InterfaceAPIService extends CategoryFilterService {
  async getCategories(content, timeout) {
    return await getCategoriesFromInterfaceAPI(content, timeout);
  }
}

class ClassifierAPIService extends CategoryFilterService {
  async getCategories(content, timeout) {
    return await getCategoriesFromClassifierAPI(content, timeout);
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
