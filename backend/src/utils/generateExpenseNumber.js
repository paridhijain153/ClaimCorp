const generateExpenseNumber = () => {
  return `EXP-${Date.now()}`;
};

export default generateExpenseNumber;