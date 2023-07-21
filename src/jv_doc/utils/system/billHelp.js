export function handleBillContent(data) {
  return {
    ...data,
    BillGui: undefined,
    BillId: undefined,
  };
}
