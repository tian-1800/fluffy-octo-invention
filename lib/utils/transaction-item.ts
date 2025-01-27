export function formatTransactionDate(date: string) {
  return new Date(date)
    .toLocaleString("id-ID", {
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

export function getMonthNames(locale: string = "id-ID"): string[] {
  const currentDate = new Date();
  const monthNames: string[] = [];

  for (let i = -3; i <= 1; i++) {
    const date = new Date(currentDate);
    date.setMonth(currentDate.getMonth() + i);

    const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(
      date
    );
    monthNames.push(monthName);
  }

  return monthNames;
}
