using System.Data.Common;

namespace OminHub.Api.Model
{
    public interface IMySqlMappable<T>
    {
        T FromReader(DbDataReader rd);
    }
}
