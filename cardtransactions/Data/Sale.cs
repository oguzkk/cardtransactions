using System;
using System.Collections.Generic;

namespace cardtransactions.Data;

public partial class Sale
{
    public long Id { get; set; }

    public string TransactionId { get; set; } = null!;

    public DateTime Timestamp { get; set; }

    public string Cardholder { get; set; } = null!;

    public string Pan { get; set; } = null!;

    public string ExpireDate { get; set; } = null!;

    public decimal Amount { get; set; }

    public string Currency { get; set; } = null!;

    public string ResponseCode { get; set; } = null!;

    public string? ErrorMessage { get; set; }

    public string? CardType { get; set; }
}
