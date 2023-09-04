using System.Text;

namespace LinkShortener.Models
{
    public static class IdConverter
    {
        public const string ALPHA = "abcdefghijklmnopqrstuvwxyz";
        public static string Encode(int num)
        {
            StringBuilder sb = new StringBuilder();
            if (num <= 0)
                return ALPHA[0].ToString();
            while (num > 0)
            {
                sb.Insert(0, ALPHA[num % ALPHA.Length]);
                num /= ALPHA.Length;
            }
            return sb.ToString();
        }
        public static int Decode(string id)
        {
            int num = 0;
            for (int i = 0; i < id.Length; i++)
            {
                num += ALPHA.IndexOf(id[i]) * (int)Math.Pow(ALPHA.Length, id.Length - 1 - i);
            }
            return num;
        }
    }
}
