namespace AcquireFSD.Web.Test
{
    public class ClassTwo
    {
        IRapidLog Logger => new RapidLogWrapper();
    }
    //public interface IRapidLog
    //{
    //    void SayHello();
    //}

    //public class RapidLogWrapper : IRapidLog
    //{
    //    public RapidLogWrapper()
    //    {
    //        Debug.WriteLine("======    RapidLogWrapper. Ctor of RapidLogWrapper");
    //    }

    //    public void SayHello()
    //    {
    //        Debug.WriteLine("======    RapidLogWrapper. SayHello from ctor of RapidLogWrapper");
    //    }
    //}



}