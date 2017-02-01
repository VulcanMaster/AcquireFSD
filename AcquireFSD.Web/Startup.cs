using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AcquireFSD.Web.Startup))]
namespace AcquireFSD.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
