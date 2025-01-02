using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Delegates
{
	public class TaskOnDelegates
	{


		public event checkname myevent2;
		public void getdata()
		{
			Console.Write("Enter Your Name:");
			string Name = Console.ReadLine();
			string name = char.ToUpper(Name[0]) + Name.Substring(1).ToLower();

			myevent2(name);
		}


	}


}