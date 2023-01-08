namespace cardtransactions.Models
{
    public class SaleInquiryRequest
    {
        public decimal MinimumAmount { get; set; }
        public decimal MaximumAmount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }
}
