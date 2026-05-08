import pandas as pd
import joblib
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

df = pd.read_csv("data/housing.csv")

x = df.drop("median_house_value", axis=1)
y = df["median_house_value"]


X_train, X_test, y_train, y_test = train_test_split(
    x, y, test_size=0.2, random_state=42
)

model = joblib.load("models/model.pkl")

y_train_pred = model.predict(X_train)
y_test_pred = model.predict(X_test)

def evaluate(y_true, y_pred, name=""):
    mae = mean_absolute_error(y_true, y_pred)
    rmse = np.sqrt(mean_squared_error(y_true, y_pred))
    r2 = r2_score(y_true, y_pred)

    print(f"\n{name}")
    print("MAE :", mae)
    print("RMSE:", rmse)
    print("R2  :", r2)

    return mae, rmse, r2


# Evaluate
evaluate(y_train, y_train_pred, "TRAIN")
evaluate(y_test, y_test_pred, "TEST")