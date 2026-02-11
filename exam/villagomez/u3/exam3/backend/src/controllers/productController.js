const MS_PER_DAY = 24 * 60 * 60 * 1000;

const daysToExpire = (req, res) => {
  const { day, month, year } = req.body || {};
  const dateParts = [day, month, year].map((value) => Number(value));

  if (dateParts.some((value) => !Number.isInteger(value))) {
    return res.status(400).json({ error: "day, month, and year must be integers" });
  }

  const [d, m, y] = dateParts;
  if (y < 1900 || m < 1 || m > 12 || d < 1 || d > 31) {
    return res.status(400).json({ error: "invalid date values" });
  }

  const expiresAt = new Date(y, m - 1, d);
  if (Number.isNaN(expiresAt.getTime())) {
    return res.status(400).json({ error: "invalid date" });
  }

  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const end = new Date(expiresAt.getFullYear(), expiresAt.getMonth(), expiresAt.getDate());
  const diffMs = end - start;
  const daysLeft = Math.ceil(diffMs / MS_PER_DAY);

  if (daysLeft < 0) {
    return res.status(400).json({ error: "expiration date cannot be in the past" });
  }

  const product = {
    expiresAt: end.toISOString().slice(0, 10),
    daysLeft
  };

  return res.json({ daysLeft, product });
};

module.exports = { daysToExpire };
