const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });
  
  export const formatCurrency = (amount:number) => {
    return currencyFormatter.format(amount);
  };