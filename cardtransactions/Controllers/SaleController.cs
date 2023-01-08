using cardtransactions.Constants;
using cardtransactions.Data;
using cardtransactions.Helpers;
using cardtransactions.Models;
using Microsoft.AspNetCore.Mvc;

namespace cardtransactions.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SaleController : ControllerBase
    {
        private readonly CardtransactionsContext _dbcontext;
        public SaleController(CardtransactionsContext _context)
        {
            _dbcontext = _context;
        }

        [HttpGet]
        public async Task<List<Sale>> Get()
        {
            return _dbcontext.Sales.ToList();
        }
        [HttpPost]
        public async Task<List<SaleItem>> Post(SaleInquiryRequest request)
        {
            // set end dates time to 23:59:59
            request.EndDate = request.EndDate.AddHours(23);
            request.EndDate = request.EndDate.AddMinutes(59);
            request.EndDate = request.EndDate.AddSeconds(59);
            return _dbcontext.Sales.Where(entity =>
            entity.Amount >= request.MinimumAmount &&
            entity.Amount <= request.MaximumAmount &&
            entity.Timestamp >= request.StartDate &&
            entity.Timestamp <= request.EndDate)
                .Select(entity => new SaleItem()
                {
                    TransactionId = entity.TransactionId,
                    Timestamp = entity.Timestamp,
                    Amount = entity.Amount,
                    Currency = entity.Currency
                }).ToList();
        }
        [HttpGet("{id}")]
        public async Task<SaleItem> Get(string id)
        {
            var sale = _dbcontext.Sales.FirstOrDefault(entity => entity.TransactionId == id);
            var saleItem = new SaleItem(sale);
            return saleItem;
        }

        [HttpPost("AddSale")]
        public async Task<SaleItem> AddSale(Sale sale)
        {
            sale.TransactionId = IDHelper.NewId();
            if (CardHelper.IsCardValid(sale.Pan))
            {
                sale.ResponseCode = CommonConstants.ResponseCodes.Success;
                sale.CardType = CardHelper.GetCardType(sale.Pan);
            }
            else
            {
                sale.CardType = CommonConstants.CardTypes.Undefined;
                sale.ErrorMessage = CommonConstants.ErrorCodes.InvalidPAN;
                sale.ResponseCode = CommonConstants.ResponseCodes.Error;
            }
            sale.Timestamp = DateTime.Now;
            _dbcontext.Sales.Add(sale);
            _dbcontext.SaveChanges();
            sale.Pan = CardHelper.MaskCard(sale.Pan);
            return new SaleItem(sale);
        }
    }
}
