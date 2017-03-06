using System.Diagnostics;

namespace AcquireFSD.Web.Test
{
    public class ClassOne
    {
        IRapidLog Logger => new RapidLogWrapper();

        public void Greetings()
        {
            Debug.WriteLine("======   ClassOne.Greetings: Say you, say me!");
        }

        public void CallLogger()
        {
            Logger.SayHello();
            Debug.WriteLine("======   ClassOne.CallLogger: Say you, say me!");
        }

    }
    public interface IRapidLog
    {
        void SayHello();
    }

    public class RapidLogWrapper : IRapidLog
    {
        public RapidLogWrapper()
        {
            Debug.WriteLine("======    RapidLogWrapper. Ctor of RapidLogWrapper");
        }

        public void SayHello()
        {
            Debug.WriteLine("======    RapidLogWrapper. SayHello from ctor of RapidLogWrapper");
        }
    }



}