export const calculateDaysToExpire = async ({ apiBase, day, month, year }) => {
  const response = await fetch(`${apiBase}/api/days-to-expire`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ day, month, year })
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data && data.error ? data.error : "Request failed";
    throw new Error(message);
  }

  return data;
};
