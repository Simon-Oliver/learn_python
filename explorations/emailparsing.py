import email
import re
import mailparser
from email import policy
from email.parser import BytesParser


msg = email.message_from_file(open('./CheapTickets.eml'))

mail = mailparser.parse_from_file(msg)
#mail = mailparser.parse_from_file(f)


# print(line[5:line.find('.')])
# for line in message.get_payload():
#     print(line)


# print(open('./CheapTickets.eml'))
