import { calculateDaysToExpire } from "../model/productModel.js";

export const handleCalculateDays = async ({
  day,
  month,
  year,
  apiBase,
  setResult,
  setError,
  setLoading
}) => {
  setLoading(true);
  setError("");
  setResult(null);

  try {
    const response = await calculateDaysToExpire({ apiBase, day, month, year });
    setResult(response);
  } catch (err) {
    setError(err.message || "Request failed");
  } finally {
    setLoading(false);
  }
};
