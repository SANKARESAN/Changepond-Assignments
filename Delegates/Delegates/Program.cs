using System.Security.Cryptography.X509Certificates;

namespace Delegates
{
	//public delegate void mydeletegatetype(int a, int b);

	public delegate int mydeletegatetype(int a, int b);

	public delegate void checkname(string name);
	public class Program
	{
		//public delegate void Calc(int a, int b);

		private static void Main(string[] args)
		{

			/*
             
            Calc d;

            Calculator calculator = new Calculator();

            d = calculator.Add;

            d(20, 10);

            d = calculator.Sub;

            d(20, 10);

            */

			/*
             
            Subscriber sc=new Subscriber();
            sc.doWork();

            */

			/*
             
            OuterClass.InnerClass oc=new OuterClass.InnerClass();

            oc.doIncrement();

            */

			TaskOnDelegatesDisplay todd = new TaskOnDelegatesDisplay();

			todd.DisplayData();

		}
	}
}
