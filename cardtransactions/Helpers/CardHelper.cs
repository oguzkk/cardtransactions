using cardtransactions.Constants;
using Microsoft.IdentityModel.Tokens;

namespace cardtransactions.Helpers
{
    public class CardHelper
    {
        public static bool IsCardValid(string pan)
        {
            if (pan.IsNullOrEmpty() || pan.Length != 16)
            {
                return false;
            }

            int sum = 0;

            for (int index = 0; index < pan.Length; index++)
            {
                int calculatedDigit = 0;
                if (index % 2 == 0)
                {
                    calculatedDigit = Convert.ToInt32(pan[index].ToString()) * 2;
                    if (calculatedDigit > 9)
                    {
                        calculatedDigit = calculatedDigit - 9;
                    }
                }
                else
                {
                    calculatedDigit = Convert.ToInt32(pan[index].ToString());
                }

                sum += calculatedDigit;
            }

            return sum % 10 == 0;
        }

        public static string MaskCard(string pan)
        {
            if (pan.IsNullOrEmpty() || pan.Length != 16)
            {
                return CommonConstants.ErrorCodes.InvalidPAN;
            }

            return pan.Substring(0, 6) + CommonConstants.Common.CardMask + pan.Substring(12, 4);
        }

        public static string GetCardType(string pan)
        {
            if (pan.IsNullOrEmpty())
            {
                return CommonConstants.CardTypes.Undefined;
            }
            switch (pan[0].ToString())
            {
                case CommonConstants.CardTypeCodes.Visa:
                    return CommonConstants.CardTypes.Visa;
                case CommonConstants.CardTypeCodes.MasterCard:
                    return CommonConstants.CardTypes.MasterCard;
                default:
                    return CommonConstants.CardTypes.Undefined;
            }
        }
    }
}
