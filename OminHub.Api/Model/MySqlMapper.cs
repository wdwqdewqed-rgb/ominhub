using MySql.Data.MySqlClient;
namespace OminHub.Api.Model
{
    public static class MySqlMapper
    {
        public static T Map<T>(MySqlDataReader rd)
            where T : IMySqlMappable<T>, new()
        {
            return new T().FromReader(rd);
        }
    }
}
