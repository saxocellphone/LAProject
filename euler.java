import java.math.BigInteger;

public class start {
	public static void main(String[] args) {
//		System.out.println(findN(719102, findD(719102)));
//		System.out.println(findD(719102));
//		System.out.println(asFraction(findN(719102, findD(719102)), findD(719102)));
		System.out.println(simpD(findN(68, findD(68)), findD(68)));

		for(int i = 1; i < 99999999; i++){
			BigInteger b = new BigInteger(simpD(findN(i, findD(i)), findD(i)));
			BigInteger temp = b.mod(new BigInteger("3"));
			if(!temp.equals(new BigInteger("0"))){
				System.out.println(i);
			}
		}
	}
	public static BigInteger gcm(BigInteger a, BigInteger b) {
	    return b.equals(new BigInteger(String.valueOf('0'))) ? a : gcm(b, a.mod(b)); // Not bad for one line of code :)
	}

	public static String asFraction(BigInteger a, BigInteger b) {
		BigInteger gcm = gcm(a, b);
	    return (a.divide(gcm)) + "/" + (b.divide(gcm));
	}

	public static String simpD(BigInteger a, BigInteger b) {
		BigInteger gcm = gcm(a, b);
	    return String.valueOf((b.divide(gcm)));
	}

	public static BigInteger findD(long a) {
		BigInteger denom = new BigInteger(String.valueOf(a));
	    for(long i = a-1; i > 0; i--){
	    	denom = denom.multiply(new BigInteger(String.valueOf(i)));
	    }
		return denom;
	}

	public static BigInteger findN(long a, BigInteger b) {
		BigInteger num = new BigInteger(String.valueOf('0'));
		for(long i = 1; i <= a; i++){
			num = num.add(b.divide(new BigInteger(String.valueOf(i))));
		}
		return num;
	}
}
