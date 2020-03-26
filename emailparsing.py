import email
import re

message = email.message_from_file(
    open(''))

s = message.find('Encoding: base64')
# print(line[5:line.find('.')])

print(message.find('Encoding: base64'))
