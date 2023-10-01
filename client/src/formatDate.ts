export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based, so add 1
  const year = date.getFullYear();
  return `${month}/${year}`;
};
