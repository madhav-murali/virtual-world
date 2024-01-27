from Crypto.Util.number import *
#print(strxor.strxor(b"C", b"H"))
#print(long_to_bytes(11515195063862318899931685488813747395775516287289682636499965282714637259206269))
#string = long_to_bytes(11515195063862318899931685488813747395775516287289682636499965282714637259206269)

from pwn import *
from binascii import unhexlify
# print(xor('label',13))

def xor_two_str(s1,s2):
    if len(str1) != len(str2):
        raise "XOR EXCEPTION: Strings are not of equal length!"

    return ''.join(format(int(a, 16) ^ int(b, 16), 'x') for a,b in zip(s1,s2))


key = "73626960647f6b206821204f21254f7d694f7624662065622127234f726927756d"
print(unhexlify(key))