

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegates
{
	public class TaskOnDelegatesDisplay
	{
		public void DisplayData()
		{
			List<string> list = new List<string>();

			TaskOnDelegates tod = new TaskOnDelegates();

			tod.myevent2 += delegate (string name)
			{

				if (name.Equals("Jack") || name.Equals("Steven") || name.Equals("Mathew"))
				{
					Console.WriteLine($"{name} are banned from the organization!!!!");
				}
				else
				{
					list.Add(name);
					Console.WriteLine($"Hi {name}, the organization welcomes you");
				}


				list.Add(name);
			};

			tod.getdata();
		}



	}
}
