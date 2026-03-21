using System;
using System.Reflection;
using System.Linq;

namespace Inspect
{
    class Program
    {
        static void Main(string[] args)
        {
            var asms = AppDomain.CurrentDomain.GetAssemblies();
            var aiAssembly = asms.FirstOrDefault(a => a.GetName().Name == "Microsoft.Extensions.AI.OpenAI");
            if (aiAssembly == null)
            {
                try {
                    aiAssembly = Assembly.Load("Microsoft.Extensions.AI.OpenAI");
                } catch(Exception ex) {
                    Console.WriteLine("Failed to load: " + ex.Message);
                    return;
                }
            }

            foreach (var type in aiAssembly.GetTypes())
            {
                var methods = type.GetMethods(BindingFlags.Static | BindingFlags.Public)
                                  .Where(m => m.Name.Contains("AsChatClient") || m.Name.Contains("ChatClient") || m.Name.Contains("OpenAI"));
                foreach (var m in methods)
                {
                    var parameters = string.Join(", ", m.GetParameters().Select(p => p.ParameterType.Name));
                    Console.WriteLine($"{type.FullName}.{m.Name}({parameters})");
                }
            }
        }
    }
}
