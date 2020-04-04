import pandas as pd

xls = pd.ExcelFile('../../Test_Formatting.xlsx')
df1 = pd.read_excel(xls, 'Sheet1')

sheet2 = xls.parse(1)
# Now you can list all sheets in the file
print(xls.sheet_names)
print(df1.iat[3, 1])
