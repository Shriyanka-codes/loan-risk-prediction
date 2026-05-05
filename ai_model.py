import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "loan_history.csv")

data = pd.read_csv(CSV_PATH)

# Normalize bank names
data['bank'] = data['bank'].str.strip().str.lower()

# Encode bank safely
data['bank_encoded'] = data['bank'].astype('category').cat.codes
bank_categories = dict(
    zip(
        data['bank'].astype('category').cat.categories,
        range(len(data['bank'].astype('category').cat.categories))
    )
)

# Train model
X = data[['income', 'gpa', 'family_size', 'bank_encoded']]
y = data['approved']

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X, y)

def predict_loan(income, gpa, family_size, bank_name):
    bank_name = bank_name.strip().lower()

    if bank_name not in bank_categories:
        return {
            "success_rate": 0,
            "suggestions": "Selected bank data not available"
        }

    bank_code = bank_categories[bank_name]

    input_df = pd.DataFrame([{
        "income": income,
        "gpa": gpa,
        "family_size": family_size,
        "bank_encoded": bank_code
    }])

    prob = model.predict_proba(input_df)[0][1]

    bank_data = data[data['bank'] == bank_name]
    suggestions = []

    if not bank_data.empty:
        if income < bank_data['income'].mean():
            suggestions.append("Increase income")
        if gpa < bank_data['gpa'].mean():
            suggestions.append("Increase GPA")

    return {
        "success_rate": round(prob * 100, 2),
        "suggestions": suggestions or "Good profile for this bank"
    }
