import PyPDF2
import os

directory = "../pdf"


def get_info(path):
    with open(path, 'rb') as f:
        pdf = PyPDF2.PdfFileReader(f)
        info = pdf.getDocumentInfo()
        number_of_pages = pdf.getNumPages()

    print(info)
    author = info.author
    creator = info.creator
    producer = info.producer
    subject = info.subject
    title = info.title


if __name__ == '__main__':
    for file in os.listdir(directory):
        if file.endswith(".pdf"):
            print(file)
