namespace cardtransactions.Constants
{
    public class CommonConstants
    {
        public struct ResponseCodes
        {
            public static readonly string Success = "00";
            public static readonly string Error = "-1";
        }
        public struct ErrorCodes
        {
            public static readonly string InvalidPAN = "InvalidPAN";
        }

        public struct Common
        {
            public static readonly string CardMask = "******";
        }

        public struct CardTypes
        {
            public const string Visa = "Visa";
            public const string MasterCard = "MasterCard";
            public const string Undefined = "Undefined";
        }

        public struct CardTypeCodes
        {
            public const string Visa = "4";
            public const string MasterCard = "5";
        }
    }
}
