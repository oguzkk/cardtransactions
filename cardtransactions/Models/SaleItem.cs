using cardtransactions.Data;
using cardtransactions.Helpers;

namespace cardtransactions.Models
{
    public partial class SaleItem
    {
        public SaleItem()
        {
            TransactionId = "sadf";
        }
        public SaleItem(Sale sale)
        {
            if (sale != null)
            {
                this.TransactionId = sale.TransactionId;
                this.Timestamp = sale.Timestamp;
                this.Pan = CardHelper.MaskCard(sale.Pan);
                this.ResponseCode = sale.ResponseCode;
                this.Amount = sale.Amount;
                this.Currency = sale.Currency;
                this.CardType = sale.CardType;
                this.ErrorMessage = sale.ErrorMessage;
            }
        }
        public string TransactionId { get; set; }

        public DateTime Timestamp { get; set; }

        public string? Pan { get; set; }

        public string? ResponseCode { get; set; }

        public decimal Amount { get; set; }

        public string Currency { get; set; }

        public string? CardType { get; set; }

        public string? ErrorMessage { get; set; }
        
    }
}
