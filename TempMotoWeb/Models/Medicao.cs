namespace TempMotoWeb.Models
{
    public class Medicao
    {
        public int Id { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public float Altitude { get; set; }
        public float Temperatura { get; set; }
        public float Umidade { get; set; }
        public int Num_Satelites { get; set; }
        public float Velocidade { get; set; }
        public DateTime? Data_Medicao { get; set; } = DateTime.Now.AddHours(-3);
    }
}
