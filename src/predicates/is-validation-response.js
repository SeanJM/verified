export function isValidationResponse(res) {
  return (
    typeof res === "object" &&
    res.hasOwnProperty("value") &&
    res.hasOwnProperty("isValid") &&
    res.hasOwnProperty("invalid") &&
    res.hasOwnProperty("data")
  );
}