import analyticsRepository from "./analytics.repository.js";

const analyticsService = {
  async getCategoryAnalytics(user) {
    return analyticsRepository.getCategoryAnalytics(user);
  },
  async getMonthlyAnalytics(user) {
  return analyticsRepository.getMonthlyAnalytics(
    user
  );
},
async getEmployeeAnalytics(user) {
  return analyticsRepository.getEmployeeAnalytics(
    user
  );
},
async getDashboard(user) {
  return analyticsRepository.getDashboard(user);
},
};

export default analyticsService;