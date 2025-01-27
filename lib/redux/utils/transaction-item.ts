export function formatTransactionDate(date: string) {
  return new Date(date)
    .toLocaleString("id-ID", {
      timeZone: "UTC",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace("pukul", "")
    .trim();
}

export function formatTransactionAmount(
  amount: number,
  transactionType: string
) {
  const result = amount.toLocaleString("id-ID");
  const prefix = transactionType.toLowerCase() === "topup" ? "+" : "-";
  return `${prefix} Rp.${result}`;
}

export function formatTransactionDescription(description: string) {
  const dict: Record<string, string> = {
    "Top Up Balance": "Top Up Saldo",
    Listrik: "Listrik Pascabayar",
  };

  return dict[description] || description;
}
