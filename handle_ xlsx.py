import pandas as pd

xls = pd.ExcelFile('../../Test_Formatting-2.xlsx')
df1 = pd.read_excel(xls, 'Sheet1')

names = xls.sheet_names
indices = [i for i, s in enumerate(names) if 'Overview' in s]

data = {
    'quota': [],
    'actual': []
}


for i in indices:
    df = pd.read_excel(xls, names[i])

    for i in range(5):

        data['quota'].append(df.iat[19+i, 2])
        data['actual'].append(df.iat[19+i, 3])
        #print(f'{df.iat[18+i,2]} | {df.iat[18+i,3]}')
print(data)

# Now you can list all sheets in the file
print(xls.sheet_names)
print(indices)
